// @ts-check

import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { dirname, resolve, sep } from 'node:path';
import {
  AVAILABLE_TEST_SUITES,
  DEFAULT_FETCH_MAX_CHARS,
  DEFAULT_FETCH_TIMEOUT_MS,
  DEFAULT_TREND_WINDOW_DAYS,
  INTERNAL_SCRIPT_PATHS,
  MAX_FETCH_MAX_CHARS,
  MAX_TREND_PACKAGES,
  PACKAGE_VERSION,
  REPOSITORY_ROOT,
  STATE_DIRECTORY,
  TEST_SUITE_ARGS,
} from './constants.mjs';

function buildCommandOutput(commandLabel, commandArguments, exitCode, stdoutContent, stderrContent) {
  const outputSections = [
    `Command: node ${commandArguments.join(' ')}`,
    `Exit code: ${exitCode}`,
  ];

  if (stdoutContent.trim().length > 0) {
    outputSections.push(`STDOUT:\n${stdoutContent.trimEnd()}`);
  }

  if (stderrContent.trim().length > 0) {
    outputSections.push(`STDERR:\n${stderrContent.trimEnd()}`);
  }

  return [
    `[${commandLabel}]`,
    outputSections.join('\n\n'),
  ].join('\n\n');
}

function buildJsonResult(payload, isError = false) {
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(payload, null, 2),
      },
    ],
    isError,
  };
}

function normalizePlainText(rawText) {
  return rawText
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractQuerySnippets(textContent, queryText) {
  const normalizedQuery = String(queryText || '').trim().toLowerCase();
  if (!normalizedQuery) {
    return [];
  }

  const normalizedContent = String(textContent || '');
  const normalizedLowerContent = normalizedContent.toLowerCase();
  const snippets = [];
  let searchStartIndex = 0;

  while (snippets.length < 5) {
    const matchedIndex = normalizedLowerContent.indexOf(normalizedQuery, searchStartIndex);
    if (matchedIndex === -1) {
      break;
    }

    const contextRadius = 180;
    const snippetStart = Math.max(0, matchedIndex - contextRadius);
    const snippetEnd = Math.min(normalizedContent.length, matchedIndex + normalizedQuery.length + contextRadius);
    const prefix = snippetStart > 0 ? '...' : '';
    const suffix = snippetEnd < normalizedContent.length ? '...' : '';
    snippets.push(`${prefix}${normalizedContent.slice(snippetStart, snippetEnd).trim()}${suffix}`);
    searchStartIndex = matchedIndex + normalizedQuery.length;
  }

  return snippets;
}

async function fetchWithTimeout(targetUrl, timeoutMs) {
  const fetchController = new AbortController();
  const timeoutHandle = setTimeout(() => fetchController.abort(), timeoutMs);

  try {
    return await fetch(targetUrl, {
      signal: fetchController.signal,
      headers: {
        'User-Agent': `agentic-senior-core/${PACKAGE_VERSION}`,
      },
    });
  } finally {
    clearTimeout(timeoutHandle);
  }
}

async function runResearchFetchTool(toolArguments = {}) {
  const targetUrl = String(toolArguments.url || '').trim();
  const queryText = typeof toolArguments.query === 'string' ? toolArguments.query.trim() : '';
  const maxCharsInput = Number(toolArguments.maxChars);
  const maxChars = Number.isFinite(maxCharsInput)
    ? Math.max(200, Math.min(MAX_FETCH_MAX_CHARS, Math.floor(maxCharsInput)))
    : DEFAULT_FETCH_MAX_CHARS;

  if (!/^https?:\/\//i.test(targetUrl)) {
    return buildJsonResult({
      error: 'Invalid url. Provide absolute HTTP/HTTPS URL.',
      input: targetUrl,
    }, true);
  }

  try {
    const startedAt = new Date().toISOString();
    const fetchResponse = await fetchWithTimeout(targetUrl, DEFAULT_FETCH_TIMEOUT_MS);
    const rawBody = await fetchResponse.text();
    const plainTextBody = normalizePlainText(rawBody);
    const querySnippets = queryText ? extractQuerySnippets(plainTextBody, queryText) : [];
    const selectedContent = querySnippets.length > 0
      ? querySnippets.join('\n\n')
      : plainTextBody.slice(0, maxChars);

    return buildJsonResult({
      source: {
        url: targetUrl,
        status: fetchResponse.status,
        ok: fetchResponse.ok,
        fetchedAt: new Date().toISOString(),
        requestedAt: startedAt,
        contentType: fetchResponse.headers.get('content-type') || null,
      },
      query: queryText || null,
      excerptCount: querySnippets.length,
      truncated: !queryText && plainTextBody.length > selectedContent.length,
      content: selectedContent,
    }, !fetchResponse.ok);
  } catch (error) {
    return buildJsonResult({
      error: error instanceof Error ? error.message : String(error),
      source: targetUrl,
    }, true);
  }
}

async function runTrendSnapshotTool(toolArguments = {}) {
  const packageInputs = Array.isArray(toolArguments.packages)
    ? toolArguments.packages.filter((packageName) => typeof packageName === 'string' && packageName.trim().length > 0)
    : [];
  const packageNames = Array.from(new Set(packageInputs.map((packageName) => packageName.trim()))).slice(0, MAX_TREND_PACKAGES);
  const windowDaysInput = Number(toolArguments.windowDays);
  const windowDays = Number.isFinite(windowDaysInput)
    ? Math.max(1, Math.min(3650, Math.floor(windowDaysInput)))
    : DEFAULT_TREND_WINDOW_DAYS;

  if (packageNames.length === 0) {
    return buildJsonResult({
      error: 'packages[] must include at least one package name.',
    }, true);
  }

  const nowTimestamp = Date.now();
  const windowStartTimestamp = nowTimestamp - (windowDays * 24 * 60 * 60 * 1000);
  const packageReports = [];

  for (const packageName of packageNames) {
    const registryUrl = `https://registry.npmjs.org/${encodeURIComponent(packageName)}`;

    try {
      const response = await fetchWithTimeout(registryUrl, DEFAULT_FETCH_TIMEOUT_MS);
      if (!response.ok) {
        packageReports.push({
          package: packageName,
          source: registryUrl,
          status: response.status,
          error: `Registry request failed with HTTP ${response.status}`,
        });
        continue;
      }

      const registryPayload = await response.json();
      const latestVersion = registryPayload?.['dist-tags']?.latest || null;
      const releaseTimes = Object.entries(registryPayload?.time || {})
        .filter(([versionName, publishedAt]) => {
          if (versionName === 'created' || versionName === 'modified') {
            return false;
          }

          return typeof publishedAt === 'string' && Number.isFinite(Date.parse(publishedAt));
        })
        .map(([versionName, publishedAt]) => ({
          version: versionName,
          publishedAt,
          publishedAtMs: Date.parse(publishedAt),
        }))
        .sort((leftEntry, rightEntry) => rightEntry.publishedAtMs - leftEntry.publishedAtMs);

      const releasesInWindow = releaseTimes.filter((releaseEntry) => releaseEntry.publishedAtMs >= windowStartTimestamp);
      const latestPublishedAt = latestVersion && typeof registryPayload?.time?.[latestVersion] === 'string'
        ? registryPayload.time[latestVersion]
        : registryPayload?.time?.modified || null;

      packageReports.push({
        package: packageName,
        source: registryUrl,
        latestVersion,
        latestPublishedAt,
        releasesInWindow: releasesInWindow.length,
        recentReleases: releasesInWindow.slice(0, 5).map((releaseEntry) => ({
          version: releaseEntry.version,
          publishedAt: releaseEntry.publishedAt,
        })),
      });
    } catch (error) {
      packageReports.push({
        package: packageName,
        source: registryUrl,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  const errorCount = packageReports.filter((packageReport) => typeof packageReport.error === 'string').length;

  return buildJsonResult({
    generatedAt: new Date().toISOString(),
    windowDays,
    packageCount: packageNames.length,
    errorCount,
    packages: packageReports,
    citation: {
      source: 'npm registry public API',
      fetchedAt: new Date().toISOString(),
    },
  }, errorCount > 0);
}

function resolveStatePath(relativeStatePath) {
  const normalizedRelativePath = String(relativeStatePath || '').replace(/\\/g, '/').replace(/^\/+/, '').trim();
  if (!normalizedRelativePath) {
    throw new Error('path is required and must be relative to .agent-context/state');
  }

  const resolvedStatePath = resolve(STATE_DIRECTORY, normalizedRelativePath);
  const stateRootPrefix = `${STATE_DIRECTORY}${sep}`;
  if (resolvedStatePath !== STATE_DIRECTORY && !resolvedStatePath.startsWith(stateRootPrefix)) {
    throw new Error('path traversal is not allowed outside .agent-context/state');
  }

  return {
    normalizedRelativePath,
    resolvedStatePath,
  };
}

async function runStateReadTool(toolArguments = {}) {
  try {
    const { normalizedRelativePath, resolvedStatePath } = resolveStatePath(toolArguments.path);
    const fileContent = await readFile(resolvedStatePath, 'utf8');

    return buildJsonResult({
      path: normalizedRelativePath,
      readAt: new Date().toISOString(),
      bytes: Buffer.byteLength(fileContent, 'utf8'),
      content: fileContent,
    });
  } catch (error) {
    return buildJsonResult({
      error: error instanceof Error ? error.message : String(error),
      path: toolArguments.path || null,
    }, true);
  }
}

async function runStateWriteTool(toolArguments = {}) {
  const writeMode = toolArguments.mode === 'append' ? 'append' : 'overwrite';
  const contentToWrite = typeof toolArguments.content === 'string' ? toolArguments.content : '';

  if (typeof toolArguments.content !== 'string') {
    return buildJsonResult({
      error: 'content must be a string.',
    }, true);
  }

  try {
    const { normalizedRelativePath, resolvedStatePath } = resolveStatePath(toolArguments.path);
    await mkdir(dirname(resolvedStatePath), { recursive: true });

    if (writeMode === 'append') {
      await writeFile(resolvedStatePath, contentToWrite, { encoding: 'utf8', flag: 'a' });
    } else {
      await writeFile(resolvedStatePath, contentToWrite, 'utf8');
    }

    return buildJsonResult({
      path: normalizedRelativePath,
      wroteAt: new Date().toISOString(),
      mode: writeMode,
      bytesWritten: Buffer.byteLength(contentToWrite, 'utf8'),
    });
  } catch (error) {
    return buildJsonResult({
      error: error instanceof Error ? error.message : String(error),
      path: toolArguments.path || null,
      mode: writeMode,
    }, true);
  }
}

function runNodeCommand(commandLabel, commandArguments) {
  return new Promise((resolveResult) => {
    const childProcess = spawn(process.execPath, commandArguments, {
      cwd: REPOSITORY_ROOT,
      env: process.env,
    });

    let stdoutContent = '';
    let stderrContent = '';

    childProcess.stdout.on('data', (chunk) => {
      stdoutContent += chunk.toString('utf8');
    });

    childProcess.stderr.on('data', (chunk) => {
      stderrContent += chunk.toString('utf8');
    });

    childProcess.on('error', (error) => {
      resolveResult({
        content: [
          {
            type: 'text',
            text: `[${commandLabel}] Failed to start command: ${error.message}`,
          },
        ],
        isError: true,
      });
    });

    childProcess.on('close', (exitCode) => {
      const normalizedExitCode = typeof exitCode === 'number' ? exitCode : 1;
      resolveResult({
        content: [
          {
            type: 'text',
            text: buildCommandOutput(
              commandLabel,
              commandArguments,
              normalizedExitCode,
              stdoutContent,
              stderrContent
            ),
          },
        ],
        isError: normalizedExitCode !== 0,
      });
    });
  });
}

export async function executeToolCall(toolName, toolArguments = {}) {
  if (toolName === 'validate') {
    if (!existsSync(INTERNAL_SCRIPT_PATHS.validate)) {
      return buildJsonResult({
        error: 'validate tool is unavailable because scripts/validate.mjs is missing in this workspace.',
      }, true);
    }

    return runNodeCommand('validate', ['./scripts/validate.mjs']);
  }

  if (toolName === 'test') {
    if (AVAILABLE_TEST_SUITES.length === 0) {
      return buildJsonResult({
        error: 'test tool is unavailable because the managed test suites are not present in this workspace.',
      }, true);
    }

    const defaultSuite = AVAILABLE_TEST_SUITES[0];
    const requestedSuite = typeof toolArguments.suite === 'string'
      ? toolArguments.suite
      : defaultSuite;
    const selectedSuite = AVAILABLE_TEST_SUITES.includes(requestedSuite)
      ? requestedSuite
      : defaultSuite;
    return runNodeCommand(`test:${selectedSuite}`, TEST_SUITE_ARGS[selectedSuite]);
  }

  if (toolName === 'release_gate') {
    if (!existsSync(INTERNAL_SCRIPT_PATHS.release_gate)) {
      return buildJsonResult({
        error: 'release_gate tool is unavailable because scripts/release-gate.mjs is missing in this workspace.',
      }, true);
    }

    return runNodeCommand('release_gate', ['./scripts/release-gate.mjs']);
  }

  if (toolName === 'forbidden_content_check') {
    if (!existsSync(INTERNAL_SCRIPT_PATHS.forbidden_content_check)) {
      return buildJsonResult({
        error: 'forbidden_content_check tool is unavailable because scripts/forbidden-content-check.mjs is missing in this workspace.',
      }, true);
    }

    return runNodeCommand('forbidden_content_check', ['./scripts/forbidden-content-check.mjs']);
  }

  if (toolName === 'research_fetch') {
    return runResearchFetchTool(toolArguments);
  }

  if (toolName === 'trend_snapshot') {
    return runTrendSnapshotTool(toolArguments);
  }

  if (toolName === 'state_read') {
    return runStateReadTool(toolArguments);
  }

  if (toolName === 'state_write') {
    return runStateWriteTool(toolArguments);
  }

  return {
    content: [
      {
        type: 'text',
        text: `Unknown tool: ${toolName}`,
      },
    ],
    isError: true,
  };
}
