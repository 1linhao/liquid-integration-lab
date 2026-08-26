import { expect, test } from '@playwright/test'

for (const mode of ['light', 'dark']) {
  test(`${mode} anchored overlays share dismissal and keyboard contracts`, async ({ page }) => {
    await page.goto(`/?mode=${mode}&palette=blue`)

    const popoverTrigger = page.getByRole('button', { name: 'Component notes' })
    await popoverTrigger.click()
    const popover = page.getByRole('dialog', { name: 'Component notes' })
    await expect(popover).toBeVisible()
    await expect(popover.locator('[data-liquid-layer]')).toHaveCount(4)
    await expect(page).toHaveScreenshot(`${mode}-blue-popover-open.png`)
    await page.keyboard.press('Escape')
    await expect(popover).toBeHidden()
    await expect(popoverTrigger).toBeFocused()

    const dropdown = page.getByRole('button', { name: 'More actions' })
    await dropdown.press('ArrowDown')
    const menu = page.getByRole('menu')
    await expect(menu).toBeVisible()
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    await expect(menu).toBeHidden()
    await expect(page.getByRole('status')).toHaveText('Dropdown selected archive.')

    const tooltipTrigger = page.getByRole('button', { name: 'Material help' })
    await tooltipTrigger.focus()
    const tooltip = page.getByRole('tooltip')
    await expect(tooltip).toBeVisible()
    await expect(tooltip).toContainText('same quality budget')
    await tooltipTrigger.blur()
    await expect(tooltip).toBeHidden()
  })
}
