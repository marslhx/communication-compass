// @vitest-environment jsdom
import { act } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { mountApp } from './main'

describe('application bootstrap', () => {
  afterEach(() => {
    document.body.replaceChildren()
    window.history.replaceState(null, '', '/')
    window.localStorage.clear()
  })

  it('mounts the home route inside a router context', async () => {
    const host = document.createElement('div')
    document.body.append(host)
    let root!: ReturnType<typeof mountApp>

    await act(async () => {
      root = mountApp(host)
    })

    expect(host.textContent).toContain('从一个问题，找到传播学的位置')
    expect(host.querySelectorAll('.compass-sector[role="button"]')).toHaveLength(8)
    expect(host.querySelectorAll('.mobile-nav a')).toHaveLength(3)
    const toggle=host.querySelector<HTMLButtonElement>('.theme-toggle')!
    const initialTheme=document.documentElement.dataset.theme
    expect(toggle.getAttribute('aria-label')).toMatch(/切换到(浅色|深色)背景/)
    await act(async()=>toggle.click())
    expect(document.documentElement.dataset.theme).not.toBe(initialTheme)
    expect(window.localStorage.getItem('commpass-theme')).toBe(document.documentElement.dataset.theme)
    expect(document.title).toBe('首页 · COMMPASS｜传播学指南针 Beta')

    await act(async () => root.unmount())
  })

  it('shows every knowledge point in the selected scope and keeps cross-domain points separate', async () => {
    window.history.replaceState(null, '', '/map?area=effects&density=8')
    const host = document.createElement('div')
    document.body.append(host)
    let root!: ReturnType<typeof mountApp>

    await act(async () => { root = mountApp(host) })

    expect(host.querySelectorAll('.atlas-areas button')).toHaveLength(8)
    expect(host.querySelectorAll('.atlas-node')).toHaveLength(27)
    expect(host.querySelector('select')).toBeNull()
    expect(host.querySelector('.view-controls')).toBeNull()
    expect(host.textContent).toContain('问题域主要知识点')
    expect(host.textContent).toContain('相关跨域知识点')
    expect(host.textContent).not.toContain('显示数量')
    expect(host.textContent).not.toContain('先看 8 个')
    expect(host.textContent).not.toContain('核心入口')
    expect(host.textContent).not.toContain('文献关系')

    const crossButton=[...host.querySelectorAll<HTMLButtonElement>('.choice-group button')].find(button=>button.textContent?.includes('相关跨域知识点'))!
    await act(async()=>crossButton.click())
    expect(host.querySelectorAll('.atlas-node')).toHaveLength(21)
    expect(host.querySelector('.atlas-orbit')?.textContent).not.toContain('议程设置')

    await act(async()=>host.querySelector<HTMLButtonElement>('.atlas-node')!.click())
    expect(host.querySelectorAll('.focus-relations a')).toHaveLength(2)

    await act(async () => root.unmount())
  })

  it('keeps production status out of search and makes relation nodes navigable', async () => {
    await import('./relationship-page')
    window.history.replaceState(null, '', '/search')
    const host = document.createElement('div')
    document.body.append(host)
    let root!: ReturnType<typeof mountApp>
    await act(async () => { root = mountApp(host) })
    expect(host.textContent).not.toContain('骨架条目')
    expect(host.textContent).not.toContain('完整样本')
    expect(host.querySelectorAll('.search-filters .choice-group')).toHaveLength(2)
    await act(async () => root.unmount())

    window.history.replaceState(null, '', '/nodes/agenda-setting/relations?layer=evidence')
    const relationHost = document.createElement('div')
    document.body.append(relationHost)
    await act(async () => { root = mountApp(relationHost) })
    expect(relationHost.textContent).toContain('有出处的关联')
    expect(relationHost.querySelectorAll<HTMLAnchorElement>('.orbit-relation').length).toBeGreaterThan(0)
    expect(relationHost.querySelector<HTMLAnchorElement>('.orbit-relation')?.getAttribute('href')).toMatch(/^\/nodes\//)
    await act(async () => root.unmount())
  })

  it('distinguishes the controlled core-person roster from topic extensions', async () => {
    window.history.replaceState(null, '', '/search?type=person')
    const host = document.createElement('div')
    document.body.append(host)
    let root!: ReturnType<typeof mountApp>

    await act(async () => { root = mountApp(host) })

    expect(host.textContent).toContain('哈罗德·伊尼斯')
    expect(host.textContent).toContain('西奥多·阿多诺')
    expect(host.querySelectorAll('.person-tier.core')).toHaveLength(41)
    expect(host.querySelectorAll('.person-tier.extended')).toHaveLength(2)
    expect(host.textContent).toContain('专题扩展')

    await act(async () => root.unmount())
  })

  it('uses compact whole-card topic links and tabbed node content', async () => {
    window.history.replaceState(null, '', '/guides')
    const host = document.createElement('div')
    document.body.append(host)
    let root!: ReturnType<typeof mountApp>

    await act(async () => { root = mountApp(host) })
    expect(host.querySelectorAll('.guide-area-grid > a')).toHaveLength(8)
    expect(host.querySelector('.guide-area-grid')?.textContent).not.toContain('个完整样本')
    expect(host.querySelector('select')).toBeNull()
    await act(async () => root.unmount())

    window.history.replaceState(null, '', '/nodes/agenda-setting')
    const nodeHost = document.createElement('div')
    document.body.append(nodeHost)
    await act(async () => { root = mountApp(nodeHost) })
    const tabs = nodeHost.querySelectorAll<HTMLButtonElement>('.node-tabs button')
    expect(tabs).toHaveLength(5)
    expect(tabs[1].textContent).toContain('起源与人物')
    expect(nodeHost.querySelectorAll('.theme-chips a')).toHaveLength(0)
    await act(async () => tabs[1].click())
    expect(nodeHost.textContent).toContain('马克斯韦尔·麦库姆斯')
    expect(nodeHost.textContent).toContain('唐纳德·肖')

    await act(async () => root.unmount())
  })

  it('shows the dated evidence boundary for an evolving node', async () => {
    window.history.replaceState(null, '', '/nodes/attention-economy')
    const host = document.createElement('div')
    document.body.append(host)
    let root!: ReturnType<typeof mountApp>

    await act(async () => { root = mountApp(host) })

    const boundary=host.querySelector('.current-evidence-state')
    expect(boundary?.textContent).toContain('当前证据边界')
    expect(boundary?.textContent).toContain('截至2026年9月')
    expect(host.querySelector('.temporal-status')?.textContent).toContain('2026-09-15')

    await act(async () => root.unmount())
  })

  it('does not render an empty research-topic module under core propositions', async () => {
    window.history.replaceState(null, '', '/nodes/organizational-communication')
    const host = document.createElement('div')
    document.body.append(host)
    let root!: ReturnType<typeof mountApp>

    await act(async () => { root = mountApp(host) })
    const keyTab=[...host.querySelectorAll<HTMLButtonElement>('.node-tabs button')].find(button=>button.textContent?.includes('核心命题'))!
    await act(async () => keyTab.click())

    expect(host.querySelector('.claims-grid')?.textContent).toContain('NCA组织传播分会')
    expect(host.querySelector('.type-module')).toBeNull()
    expect(host.textContent).not.toContain('这个研究主题怎样理解')

    await act(async () => root.unmount())
  })
})
