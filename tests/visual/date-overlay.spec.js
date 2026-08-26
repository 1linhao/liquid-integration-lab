import { expect, test } from '@playwright/test'

for (const mode of ['light', 'dark']) {
  test(`${mode} date overlay keeps calendar material and keyboard lifecycle`, async ({ page }) => {
    await page.goto(`/?mode=${mode}&palette=emerald`)
    const trigger = page.getByRole('button', { name: 'Start date' })
    await trigger.press('ArrowDown')
    const dialog = page.getByRole('dialog', { name: 'Date picker' })
    await expect(dialog).toBeVisible()
    await expect(dialog).toHaveAttribute('data-placement', /top|bottom/)
    await expect(dialog.locator('[data-liquid-layer]')).toHaveCount(4)
    await expect(dialog.getByRole('gridcell')).toHaveCount(42)
    await expect(page).toHaveScreenshot(`${mode}-emerald-date-open.png`)
    await page.keyboard.press('PageDown')
    await expect(dialog.getByText(/March 2028/)).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
    await expect(trigger).toBeFocused()
  })
}
