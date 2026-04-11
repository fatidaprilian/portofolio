import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const DEFAULT_USERNAME = 'fatidaprilian'
const OUTPUT_PATH = path.resolve(process.cwd(), 'public', 'avatar-github.jpg')
const META_PATH = path.resolve(process.cwd(), 'public', 'avatar-meta.json')

const username = process.argv[2] || process.env.GITHUB_USERNAME || DEFAULT_USERNAME

const run = async () => {
  const apiUrl = `https://api.github.com/users/${username}`

  const profileResponse = await fetch(apiUrl, {
    headers: {
      'User-Agent': 'portfolio-avatar-sync-script',
      'Accept': 'application/vnd.github+json'
    }
  })

  if (!profileResponse.ok) {
    throw new Error(`Failed to fetch GitHub profile for ${username} (${profileResponse.status})`)
  }

  const profileData = await profileResponse.json()
  const avatarUrl = profileData.avatar_url

  if (!avatarUrl) {
    throw new Error(`avatar_url is missing for ${username}`)
  }

  const avatarResponse = await fetch(avatarUrl, {
    headers: {
      'User-Agent': 'portfolio-avatar-sync-script'
    }
  })

  if (!avatarResponse.ok) {
    throw new Error(`Failed to fetch avatar image (${avatarResponse.status})`)
  }

  const avatarArrayBuffer = await avatarResponse.arrayBuffer()
  const avatarBuffer = Buffer.from(avatarArrayBuffer)

  await mkdir(path.dirname(OUTPUT_PATH), { recursive: true })
  await writeFile(OUTPUT_PATH, avatarBuffer)

  const metadata = {
    username,
    source: avatarUrl,
    syncedAt: new Date().toISOString()
  }
  await writeFile(META_PATH, `${JSON.stringify(metadata, null, 2)}\n`, 'utf8')

  console.log(`Avatar synced to ${OUTPUT_PATH}`)
}

run().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
