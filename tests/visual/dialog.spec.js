import { expect, test } from '@playwright/test'

for (const mode of ['light', 'dark']) {
  test(`${mode} dialog traps and restores focus with overlay material`, async ({ page }) => {
    await page.goto(`/?mode=${mode}&palette=amber`)
    const open = page.getByRole('button', { name: 'Open dialog' })
    await open.click()
    const dialog = page.getByRole('dialog', { name: 'Reusable dialog' })
    await expect(dialog).toBeVisible()
    await expect(dialog.locator('[data-liquid-layer]')).toHaveCount(4)
    await expect(page.getByLabel('Dialog name')).toBeFocused()
    await expect(page.locator('html')).toHaveCSS('overflow', 'hidden')
    await expect(page).toHaveScreenshot(`${mode}-amber-dialog-open.png`)
    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
    await expect(open).toBeFocused()
    await expect(page.locator('html')).not.toHaveCSS('overflow', 'hidden')
  })
}
