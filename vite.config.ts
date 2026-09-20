import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const { VITE_BASE_PATH = '/' } = loadEnv(mode, '.', 'VITE_')
  // Only root or an absolute directory path; a relative base breaks deep links.
  if (!/^\/(?:[A-Za-z0-9_-][A-Za-z0-9._-]*\/)*$/.test(VITE_BASE_PATH)) {
    throw new Error('VITE_BASE_PATH must be / or an absolute directory such as /commpass/.')
  }
  return {
    base: VITE_BASE_PATH,
    plugins: [react(), {
      name: 'pages-spa-fallback',
      apply: 'build',
      generateBundle: {
        order: 'post',
        handler(_options, bundle) {
          const entry = bundle['index.html']
          if (!entry || entry.type !== 'asset') throw new Error('Missing built index.html')
          // Pages serves this document at the original URL, preserving query/hash.
          this.emitFile({ type: 'asset', fileName: '404.html', source: entry.source })
          this.emitFile({ type: 'asset', fileName: '.nojekyll', source: '' })
        },
      },
    }],
  }
})
