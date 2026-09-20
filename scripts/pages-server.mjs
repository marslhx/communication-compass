import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, resolve, sep } from 'node:path'

export async function readPagesBuild(directory = 'dist') {
  const root = resolve(directory)
  const html = await readFile(resolve(root, 'index.html'), 'utf8')
  const entry = html.match(/<script\b[^>]*\bsrc="([^"]+)"/i)?.[1]
  const assetIndex = entry?.lastIndexOf('/assets/') ?? -1
  if (assetIndex < 0) throw new Error('Build first: expected an absolute /assets/ script URL.')
  return { root, html, entry, base: entry.slice(0, assetIndex + 1) }
}

const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.json': 'application/json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.woff2': 'font/woff2' }

/** Local-only approximation of Pages: real files are 200, custom fallback is 404. */
export function createPagesServer({ root, base }) {
  return createServer(async (request, response) => {
    const headers = { 'Cache-Control': 'no-store' }
    try {
      const url = new URL(request.url ?? '/', 'http://localhost')
      if (base !== '/' && url.pathname === base.slice(0, -1)) {
        response.writeHead(301, { ...headers, Location: `${base}${url.search}` })
        return response.end()
      }
      if (!url.pathname.startsWith(base) || !['GET', 'HEAD'].includes(request.method)) {
        response.writeHead(404, headers)
        return response.end('Outside preview mount')
      }
      const relative = decodeURIComponent(url.pathname.slice(base.length))
      let file = resolve(root, relative || 'index.html')
      if (file !== root && !file.startsWith(`${root}${sep}`)) {
        response.writeHead(404, headers)
        return response.end('Not found')
      }
      if (await stat(file).then(info => info.isDirectory()).catch(() => false)) file = resolve(file, 'index.html')
      let body, status = 200
      try { body = await readFile(file) } catch {
        status = 404
        file = resolve(root, '404.html')
        body = await readFile(file)
      }
      response.writeHead(status, { ...headers, 'Content-Type': mime[extname(file)] ?? 'application/octet-stream' })
      response.end(request.method === 'HEAD' ? undefined : body)
    } catch {
      response.writeHead(400, headers)
      response.end('Invalid preview request')
    }
  })
}
