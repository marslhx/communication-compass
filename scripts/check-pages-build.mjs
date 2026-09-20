import assert from 'node:assert/strict'
import { once } from 'node:events'
import { readFile, stat } from 'node:fs/promises'
import { resolve } from 'node:path'
import { createPagesServer, readPagesBuild } from './pages-server.mjs'

const build = await readPagesBuild(process.argv[2] ?? 'dist')
assert.equal(await readFile(resolve(build.root, '404.html'), 'utf8'), build.html, '404 must load the same SPA')
assert.ok(await stat(resolve(build.root, '.nojekyll')))
if (process.env.VITE_BASE_PATH) assert.equal(build.base, process.env.VITE_BASE_PATH)
const assets = [...build.html.matchAll(/(?:src|href)="([^"#]+)"/g)].map(match => match[1])
for (const path of assets) {
  assert.ok(path.startsWith(build.base), `Asset outside base: ${path}`)
  assert.ok((await stat(resolve(build.root, path.slice(build.base.length)))).isFile())
}

const server = createPagesServer(build)
server.listen(0, '127.0.0.1')
await once(server, 'listening')
const origin = `http://127.0.0.1:${server.address().port}`
try {
  for (const path of [build.base, ...assets]) {
    const response = await fetch(`${origin}${path}`)
    assert.equal(response.status, 200, `Root/asset unavailable: ${path}`)
  }
  for (const route of ['nodes/agenda-setting', 'nodes/agenda-setting/relations?layer=evidence', 'search?q=%E8%AE%AE%E9%A2%98%E8%AE%BE%E7%BD%AE', 'does-not-exist']) {
    const response = await fetch(`${origin}${build.base}${route}`)
    assert.equal(response.status, 404, 'Do not confuse Vite 200 fallback with Pages 404')
    assert.equal(await response.text(), build.html, `Deep link did not get the app: ${route}`)
    assert.equal(new URL(response.url).pathname, `${build.base}${route.split('?')[0]}`, 'No redirect should lose the route')
  }
  if (build.base !== '/') {
    const response = await fetch(`${origin}/`, { redirect: 'manual' })
    assert.equal(response.status, 404, 'Project preview must not occupy the host root')
  }
  console.log(`PASS: ${build.base} assets, 404 SPA fallback and deep route URL preservation`)
} finally {
  server.closeAllConnections()
  await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()))
}
