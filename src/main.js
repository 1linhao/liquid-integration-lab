import Vue from 'vue'
import { createLiquidUI, LiquidButton, LiquidGlassSurface } from '@liqui/liquid-ui'
import { createLiquidAppShell, LiquidAppShell } from '@liqui/liquid-app-shell'
import '@liqui/liquid-ui/styles.css'
import '@liqui/liquid-app-shell/styles.css'
import './showcase.css'

const liquidUI = createLiquidUI({ paletteStorage: window.localStorage, initialMode: 'system' })
Vue.use(liquidUI)
Vue.use(createLiquidAppShell())

const NAVIGATION = [
  { key: 'overview', label: 'Overview', mobileLabel: 'Home', icon: 'home' },
  { key: 'surfaces', label: 'Material surfaces', mobileLabel: 'Glass', icon: 'surface' },
  { key: 'controls', label: 'Controls', mobileLabel: 'Controls', icon: 'control' },
  { key: 'data', label: 'Data density', mobileLabel: 'Data', icon: 'data' },
  { key: 'profile', label: 'Profile', mobileLabel: 'Me', icon: 'profile' },
  { key: 'about', label: 'About', mobileLabel: 'About', icon: 'about' }
]

new Vue({
  el: '#lab',
  data: () => ({
    activeKey: 'overview',
    mode: liquidUI.theme.getState().mode,
    resolvedMode: liquidUI.theme.getState().resolvedMode,
    palette: liquidUI.theme.getState().palette,
    quality: liquidUI.material.getQuality(),
    notice: ''
  }),
  computed: {
    shellModel() {
      const active = NAVIGATION.find((item) => item.key === this.activeKey)
      return {
        brand: { name: 'Northstar', mark: 'N', subtitle: 'LIQUID LAB' },
        title: active?.label ?? 'Overview',
        activeKey: this.activeKey,
        navGroups: [
          { key: 'workspace', label: 'Workspace', items: NAVIGATION.slice(0, 4) },
          { key: 'account', label: 'Account', items: NAVIGATION.slice(4) }
        ],
        mobileKeys: NAVIGATION.map((item) => item.key),
        user: { name: 'Ada Lovelace', initials: 'AL' }
      }
    }
  },
  methods: {
    setMode(mode) {
      const state = liquidUI.theme.setMode(mode)
      this.mode = state.mode
      this.resolvedMode = state.resolvedMode
    },
    setPalette(palette) {
      this.palette = liquidUI.theme.setPalette(palette).palette
    },
    setQuality(quality) {
      this.quality = liquidUI.material.setQuality(quality)
      this.notice = `Material quality set to ${quality}.`
    }
  },
  render(h) {
    const button = (label, active, onClick) => h(LiquidButton, {
      props: { size: 'small', tone: active ? 'accent' : 'neutral' },
      on: { click: onClick }
    }, label)
    const card = (surface, title, copy) => h(LiquidGlassSurface, {
      class: 'lab-card', props: { surface, elevated: surface === 'overlay' }
    }, [h('p', { class: 'lab-eyebrow' }, surface), h('h2', title), h('p', copy)])

    return h(LiquidAppShell, {
      props: { model: this.shellModel },
      on: {
        navigate: (key) => { this.activeKey = key; this.notice = `Navigated to ${key}` },
        logout: () => { this.notice = 'The host adapter received logout.' }
      },
      scopedSlots: {
        'navigation-item': ({ item }) => [
          h('span', { class: 'lab-nav-glyph', attrs: { 'aria-hidden': 'true' } }, item.label.slice(0, 1)),
          h('span', item.label)
        ]
      }
    }, [
      h('div', { slot: 'header-actions', class: 'lab-toolbar' }, [
        button(this.resolvedMode === 'dark' ? 'Light' : 'Dark', false, () => this.setMode(this.resolvedMode === 'dark' ? 'light' : 'dark')),
        button(this.quality === 'reduced' ? 'Auto glass' : 'Reduce glass', false, () => this.setQuality(this.quality === 'reduced' ? 'auto' : 'reduced'))
      ]),
      h('div', { class: 'lab-page' }, [
        h('section', { class: 'lab-intro' }, [
          h('p', { class: 'lab-eyebrow' }, 'SECOND CONSUMER'),
          h('h2', 'One model, two responsive shells'),
          h('p', 'This application proves that material, theme, navigation, and account events work without Trojan Panel internals.'),
          h('div', { class: 'lab-palettes', attrs: { 'aria-label': 'Palette' } },
            ['blue', 'violet', 'emerald', 'amber'].map((palette) => button(palette, this.palette === palette, () => this.setPalette(palette)))
          )
        ]),
        h('section', { class: 'lab-grid' }, [
          card('panel', 'Panel', 'Large, calm surfaces use a conservative optical budget.'),
          card('overlay', 'Overlay', 'Raised surfaces increase frost and specular separation.'),
          card('control', 'Control', 'Compact controls use a narrower refracting bezel.'),
          card('navigation', 'Navigation', 'Sidebar and mobile navigation share this material intent.')
        ]),
        this.notice ? h('p', { class: 'lab-notice', attrs: { role: 'status' } }, this.notice) : null
      ])
    ])
  }
})
