import { expect, test } from '@playwright/test'

for (const mode of ['light', 'dark']) {
  test(`${mode} select overlay keeps glass, focus, and top-layer placement`, async ({ page }) => {
    await page.goto(`/?mode=${mode}&palette=violet`)
    const trigger = page.getByRole('combobox', { name: 'Region' })
    await trigger.press('ArrowDown')
    const listbox = page.getByRole('listbox')
    await expect(listbox).toBeVisible()
    await expect(listbox).toHaveAttribute('data-placement', /top|bottom/)
    await expect(listbox.locator('[data-liquid-layer]')).toHaveCount(4)
    await expect(page).toHaveScreenshot(`${mode}-violet-select-open.png`)
    await page.keyboard.press('Escape')
    await expect(listbox).toBeHidden()
    await expect(trigger).toBeFocused()
  })
}
