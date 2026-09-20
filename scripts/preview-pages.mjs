import { createPagesServer, readPagesBuild } from './pages-server.mjs'

const build = await readPagesBuild(process.argv[2] ?? 'dist')
const port = Number(process.env.PORT ?? 4174)
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid PORT')
const server = createPagesServer(build)
server.listen(port, '127.0.0.1', () => {
  console.log(`Pages-like preview: http://127.0.0.1:${port}${build.base}`)
  console.log('Local only. Direct SPA routes intentionally return HTTP 404 with the app document.')
})
