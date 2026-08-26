import { expect, test } from '@playwright/test'

for (const mode of ['light', 'dark']) {
  test(`${mode} feedback host renders transient and decision feedback accessibly`, async ({ page }) => {
    await page.goto(`/?mode=${mode}&palette=blue`)
    await page.getByRole('button', { name: 'Show notification' }).click()
    const notification = page.getByRole('status').filter({ hasText: 'Deployment ready' })
    await expect(notification).toContainText('The reusable host rendered this notification.')
    await expect(page.locator('.liquid-feedback-stack')).toHaveScreenshot(`${mode}-blue-notification.png`)
    await page.getByRole('button', { name: 'Dismiss' }).click()
    await expect(notification).toHaveCount(0)

    const trigger = page.getByRole('button', { name: 'Ask name' })
    await trigger.click()
    const dialog = page.getByRole('dialog', { name: 'Name the release' })
    await expect(dialog).toBeVisible()
    const input = dialog.getByRole('textbox')
    await expect(input).toBeFocused()
    await input.fill('Solstice')
    await input.press('Enter')
    await expect(dialog).toHaveCount(0)
    await expect(page.getByRole('status').filter({ hasText: 'Release named Solstice.' })).toBeVisible()
    await expect(trigger).toBeFocused()
  })
}
