import { expect, test } from '@playwright/test'

for (const mode of ['light', 'dark']) {
  test(`${mode} drawer and page loading own top-layer behavior`, async ({ page }) => {
    await page.goto(`/?mode=${mode}&palette=amber`)
    const drawerTrigger = page.getByRole('button', { name: 'Open drawer' })
    await drawerTrigger.click()
    const drawer = page.getByRole('dialog', { name: 'Reusable drawer' })
    await expect(drawer).toBeVisible()
    await expect(drawer.getByRole('button', { name: 'Finish' })).toBeFocused()
    await expect(drawer).toHaveScreenshot(`${mode}-amber-drawer.png`)
    await page.keyboard.press('Escape')
    await expect(drawer).toBeHidden()
    await expect(drawerTrigger).toBeFocused()
    await page.getByRole('button', { name: 'Show loading' }).click()
    const loading = page.getByRole('status', { name: 'Preparing reusable assets' })
    await expect(loading).toBeVisible()
    await expect(page.locator('body > .liquid-loading')).toHaveCount(1)
    await expect(loading).toBeHidden({ timeout: 2000 })
  })
}
