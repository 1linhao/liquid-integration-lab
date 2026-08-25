import { expect, test } from '@playwright/test'

const modes = ['light', 'dark']
const palettes = ['blue', 'violet', 'emerald', 'amber']

for (const mode of modes) {
  for (const palette of palettes) {
    test(`${mode} ${palette} material baseline`, async ({ page }) => {
      await page.goto(`/?mode=${mode}&palette=${palette}`)
      await expect(page.locator('.lab-card')).toHaveCount(4)
      await page.waitForFunction(() =>
        document.querySelectorAll('.liquid-glass__refract--fade, .liquid-glass__specular--fade').length === 0
      )
      await expect(page).toHaveScreenshot(`${mode}-${palette}.png`)
      await expect(page.locator('.lab-controls')).toHaveScreenshot(`${mode}-${palette}-controls.png`)
    })
  }
}
