#!/usr/bin/env node

import { buildToolDefinitions } from './mcp-server/tool-registry.mjs';
import { DEFAULT_PROTOCOL_VERSION, PACKAGE_VERSION } from './mcp-server/constants.mjs';
import { executeToolCall } from './mcp-server/tools.mjs';

const TOOL_DEFINITIONS = buildToolDefinitions();
let incomingBuffer = Buffer.alloc(0);

function writeMessage(payload) {
  const serializedPayload = JSON.stringify(payload);
  process.stdout.write(serializedPayload + '\n');
}

function sendResponse(id, result) {
  writeMessage({
    jsonrpc: '2.0',
    id,
    result,
  });
}

function sendError(id, code, message, data) {
  writeMessage({
    jsonrpc: '2.0',
    id,
    error: {
      code,
      message,
      data,
    },
  });
}

function normalizeToolName(rawToolName) {
  return typeof rawToolName === 'string' ? rawToolName.trim() : '';
}

async function handleRequest(requestMessage) {
  const requestId = requestMessage.id;
  const requestMethod = requestMessage.method;
  const requestParams = requestMessage.params || {};

  if (typeof requestMethod !== 'string') {
    if (typeof requestId !== 'undefined') {
      sendError(requestId, -32600, 'Invalid Request');
    }
    return;
  }

  if (requestMethod === 'initialize') {
    const negotiatedProtocolVersion = typeof requestParams.protocolVersion === 'string'
      ? requestParams.protocolVersion
      : DEFAULT_PROTOCOL_VERSION;

    sendResponse(requestId, {
      protocolVersion: negotiatedProtocolVersion,
      capabilities: {
        tools: {
          listChanged: false,
        },
      },
      serverInfo: {
        name: 'agentic-senior-core',
        version: PACKAGE_VERSION,
      },
    });
    return;
  }

  if (requestMethod === 'notifications/initialized') {
    return;
  }

  if (requestMethod === 'ping') {
    if (typeof requestId !== 'undefined') {
      sendResponse(requestId, {});
    }
    return;
  }

  if (requestMethod === 'tools/list') {
    sendResponse(requestId, {
      tools: TOOL_DEFINITIONS,
    });
    return;
  }

  if (requestMethod === 'tools/call') {
    const requestedToolName = normalizeToolName(requestParams.name);

    if (!requestedToolName) {
      sendError(requestId, -32602, 'Invalid params: tool name is required');
      return;
    }

    const toolResult = await executeToolCall(requestedToolName, requestParams.arguments || {});
    sendResponse(requestId, toolResult);
    return;
  }

  if (typeof requestId !== 'undefined') {
    sendError(requestId, -32601, `Method not found: ${requestMethod}`);
  }
}

function processIncomingBuffer() {
  const fullContent = incomingBuffer.toString('utf8');
  let parseMode = 'line-delimited';

  if (fullContent.includes('Content-Length:')) {
    parseMode = 'content-length';
  }

  if (parseMode === 'content-length') {
    const headerTerminatorIndex = Math.max(
      fullContent.indexOf('\r\n\r\n'),
      fullContent.indexOf('\n\n')
    );

    if (headerTerminatorIndex === -1) {
      return;
    }

    const headerText = fullContent.slice(0, headerTerminatorIndex);
    const contentLengthMatch = headerText.match(/Content-Length:\s*(\d+)/i);

    if (!contentLengthMatch) {
      incomingBuffer = Buffer.alloc(0);
      return;
    }

    const contentLength = parseInt(contentLengthMatch[1], 10);
    const headerEndLength = fullContent[headerTerminatorIndex] === '\r' ? 4 : 2;
    const bodyStartIndex = headerTerminatorIndex + headerEndLength;
    const bodyEndIndex = bodyStartIndex + contentLength;

    if (fullContent.length < bodyEndIndex) {
      return;
    }

    const messageBody = fullContent.slice(bodyStartIndex, bodyEndIndex);
    incomingBuffer = Buffer.from(fullContent.slice(bodyEndIndex), 'utf8');

    try {
      const parsedRequest = JSON.parse(messageBody);
      Promise.resolve(handleRequest(parsedRequest)).catch((error) => {
        if (typeof parsedRequest?.id !== 'undefined') {
          sendError(parsedRequest.id, -32603, 'Internal error', String(error?.message || error));
        }
      });
    } catch {
      // Ignore parse errors.
    }

    if (incomingBuffer.length > 0) {
      processIncomingBuffer();
    }
  } else {
    const lines = fullContent.split('\n');

    if (fullContent.endsWith('\n')) {
      incomingBuffer = Buffer.alloc(0);
    } else {
      const lastLine = lines.pop() || '';
      incomingBuffer = Buffer.from(lastLine, 'utf8');
    }

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) {
        continue;
      }

      let parsedRequest;
      try {
        parsedRequest = JSON.parse(trimmed);
      } catch {
        continue;
      }

      Promise.resolve(handleRequest(parsedRequest)).catch((error) => {
        if (typeof parsedRequest?.id !== 'undefined') {
          sendError(parsedRequest.id, -32603, 'Internal error', String(error?.message || error));
        }
      });
    }
  }
}

process.stdin.on('data', (chunk) => {
  incomingBuffer = Buffer.concat([incomingBuffer, chunk]);
  processIncomingBuffer();
});

process.stdin.on('end', () => {
  process.exit(0);
});

process.on('SIGINT', () => {
  process.exit(0);
});
