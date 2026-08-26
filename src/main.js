import Vue from 'vue'
import {
  createLiquidUI,
  LiquidButton,
  LiquidDatePicker,
  LiquidForm,
  LiquidFormItem,
  LiquidGlassSurface,
  LiquidInput,
  LiquidNumberInput,
  LiquidSelect,
  LiquidSwitch,
  LiquidTag
} from '@liqui/liquid-ui/vue2'
import { createLiquidAppShell, LiquidAppShell } from '@liqui/liquid-app-shell'
import '@liqui/liquid-ui/styles.css'
import '@liqui/liquid-app-shell/styles.css'
import './showcase.css'

const parameters = new URLSearchParams(window.location.search)
const requestedMode = parameters.get('mode')
const requestedPalette = parameters.get('palette')
if (['blue', 'violet', 'emerald', 'amber'].includes(requestedPalette)) {
  window.localStorage.setItem('liquid-ui.palette', requestedPalette)
}
const liquidUI = createLiquidUI({
  paletteStorage: window.localStorage,
  initialMode: ['light', 'dark', 'system'].includes(requestedMode) ? requestedMode : 'system',
  initialPalette: ['blue', 'violet', 'emerald', 'amber'].includes(requestedPalette) ? requestedPalette : 'blue'
})
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

const FORM_RULES = Object.freeze({
  displayName: Object.freeze([{ required: true, message: 'Display name is required' }, { min: 3, message: 'Use at least 3 characters' }]),
  seatCount: Object.freeze({ min: 1, max: 12 }),
  region: Object.freeze({ required: true, message: 'Choose a region' }),
  startDate: Object.freeze({ required: true, message: 'Choose a start date' })
})

new Vue({
  el: '#lab',
  data: () => ({
    activeKey: 'overview',
    mode: liquidUI.theme.getState().mode,
    resolvedMode: liquidUI.theme.getState().resolvedMode,
    palette: liquidUI.theme.getState().palette,
    quality: liquidUI.material.getQuality(),
    notice: '',
    displayName: 'Ada Lovelace',
    seatCount: 3,
    region: 'eu-west',
    startDate: '2028-02-14',
    alertsEnabled: true,
    tags: ['stable', 'vue2', 'accessible']
  }),
  computed: {
    editorModel() {
      return { displayName: this.displayName, seatCount: this.seatCount, region: this.region, startDate: this.startDate }
    },
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
    },
    removeTag(tag) {
      this.tags = this.tags.filter((candidate) => candidate !== tag)
      this.notice = `Removed ${tag}.`
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
        h(LiquidGlassSurface, { class: 'lab-controls', props: { surface: 'panel' } }, [
          h('div', { class: 'lab-controls__header' }, [
            h('div', [h('p', { class: 'lab-eyebrow' }, 'PRIMITIVES'), h('h2', 'Controlled component contracts')]),
            h(LiquidSwitch, {
              props: { value: this.alertsEnabled, label: 'Enable alerts' },
              on: { input: (value) => { this.alertsEnabled = value } }
            }, 'Alerts')
          ]),
          h(LiquidForm, {
            ref: 'editorForm',
            props: {
              model: this.editorModel,
              rules: FORM_RULES
            },
            on: {
              submit: () => { this.notice = 'Reusable form validation passed.' },
              invalid: ({ errors }) => { this.notice = `Form needs attention: ${Object.keys(errors).filter((key) => errors[key].length).join(', ')}` }
            }
          }, [h('div', { class: 'lab-controls__grid' }, [
            h(LiquidFormItem, { props: { field: 'displayName', label: 'Display name', required: true } }, [
              h(LiquidInput, {
                props: { value: this.displayName, clearable: true },
                attrs: { placeholder: 'Your name', 'aria-label': 'Display name' },
                on: { input: (value) => { this.displayName = value } }
              })
            ]),
            h(LiquidFormItem, { props: { field: 'seatCount', label: 'Seats' } }, [
              h(LiquidNumberInput, {
                props: { value: this.seatCount, min: 1, max: 12, step: 1 },
                attrs: { 'aria-label': 'Seats' },
                on: { input: (value) => { this.seatCount = value } }
              })
            ]),
            h(LiquidFormItem, { props: { field: 'region', label: 'Region', required: true } }, [
              h(LiquidSelect, {
                props: {
                  value: this.region,
                  filterable: true,
                  clearable: true,
                  options: [
                    { value: 'us-east', label: 'US East' },
                    { value: 'eu-west', label: 'Europe West' },
                    { value: 'ap-south', label: 'Asia Pacific' },
                    { value: 'legacy', label: 'Legacy region', disabled: true }
                  ]
                },
                attrs: { 'aria-label': 'Region' },
                on: { input: (value) => { this.region = value } }
              })
            ]),
            h(LiquidFormItem, { props: { field: 'startDate', label: 'Start date', required: true } }, [
              h(LiquidDatePicker, {
                props: { value: this.startDate, min: '2028-02-01', max: '2028-03-31' },
                attrs: { 'aria-label': 'Start date' },
                on: { input: (value) => { this.startDate = value } }
              })
            ]),
            h('div', { class: 'lab-form-actions' }, [h(LiquidButton, { attrs: { type: 'submit' }, props: { tone: 'accent', size: 'small' } }, 'Validate form')])
          ])]),
          h('div', { class: 'lab-tags', attrs: { 'aria-label': 'Tags' } }, this.tags.map((tag, index) =>
            h(LiquidTag, {
              key: tag,
              props: { tone: ['success', 'info', 'accent'][index % 3], closable: true },
              on: { close: () => this.removeTag(tag) }
            }, tag)
          ))
        ]),
        this.notice ? h('p', { class: 'lab-notice', attrs: { role: 'status' } }, this.notice) : null
      ])
    ])
  }
})
