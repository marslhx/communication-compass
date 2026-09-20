// @vitest-environment jsdom
import { act } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { assetUrl } from './assets'
import { mountApp } from './main'

beforeEach(() => vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true))
afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
  window.history.replaceState(null, '', '/')
  document.body.replaceChildren()
})

describe('GitHub Pages project paths', () => {
  it('renders a direct node route and keeps internal links under the repository', async () => {
    await import('./node-page')
    vi.stubEnv('BASE_URL', '/commpass-preview/')
    window.history.replaceState(null, '', '/commpass-preview/nodes/agenda-setting?fromArea=effects#key-points')
    const host = document.createElement('div')
    document.body.append(host)
    let root!: ReturnType<typeof mountApp>
    await act(async () => { root = mountApp(host, '/commpass-preview/'); await new Promise(resolve=>setTimeout(resolve,0)) })
    await act(async () => { await new Promise(resolve=>setTimeout(resolve,20)) })
    expect(host.querySelector('h1')?.textContent).toBe('议程设置')
    const internalLinks = [...host.querySelectorAll<HTMLAnchorElement>('a[href^="/"]')]
    expect(internalLinks.length).toBeGreaterThan(0)
    expect(internalLinks.every(link => link.getAttribute('href')?.startsWith('/commpass-preview/'))).toBe(true)
    expect(window.location.search).toBe('?fromArea=effects')
    expect(window.location.hash).toBe('#key-points')
    await act(async () => root.unmount())
  })

  it('preserves query-based search when loaded directly under a project path', async () => {
    vi.stubEnv('BASE_URL', '/commpass-preview/')
    window.history.replaceState(null, '', '/commpass-preview/search?q=%E8%AE%AE%E9%A2%98%E8%AE%BE%E7%BD%AE')
    const host = document.createElement('div')
    document.body.append(host)
    let root!: ReturnType<typeof mountApp>
    await act(async () => { root = mountApp(host, '/commpass-preview/') })
    expect(host.querySelector('a[href="/commpass-preview/nodes/agenda-setting"]')).not.toBeNull()
    await act(async () => root.unmount())
  })

  it('opens a prefilled local-only feedback form for a knowledge point', async () => {
    await import('./info-pages')
    window.history.replaceState(null, '', '/feedback?topic=%E8%AE%AE%E9%A2%98%E8%AE%BE%E7%BD%AE&from=%2Fnodes%2Fagenda-setting')
    const host=document.createElement('div')
    document.body.append(host)
    let root!:ReturnType<typeof mountApp>
    await act(async()=>{root=mountApp(host,'/');await new Promise(resolve=>setTimeout(resolve,20))})
    expect(host.querySelector('h1')?.textContent).toBe('反馈与纠错')
    expect(host.querySelector<HTMLInputElement>('input[value="议题设置"]')).not.toBeNull()
    expect(host.textContent).toContain('GitHub Discussions')
    expect(host.querySelector<HTMLAnchorElement>('a[href="https://github.com/marslhx/communication-compass/discussions"]')).not.toBeNull()
    await act(async()=>root.unmount())
  })

  it('prefixes local runtime images but preserves external image URLs', () => {
    vi.stubEnv('BASE_URL', '/commpass-preview/')
    expect(assetUrl('/portraits/mccombs.jpg')).toBe('/commpass-preview/portraits/mccombs.jpg')
    expect(assetUrl('https://example.org/photo.jpg')).toBe('https://example.org/photo.jpg')
    expect(assetUrl('//example.org/photo.jpg')).toBe('//example.org/photo.jpg')
    vi.stubEnv('BASE_URL', '/')
    expect(assetUrl('/portraits/mccombs.jpg')).toBe('/portraits/mccombs.jpg')
  })
})
