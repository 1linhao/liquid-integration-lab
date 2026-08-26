import { expect, test } from '@playwright/test'

for (const mode of ['light', 'dark']) {
  test(`${mode} extended catalog keeps controlled and responsive contracts`, async ({ page }) => {
    await page.goto(`/?mode=${mode}&palette=emerald`)
    const catalog = page.locator('.lab-catalog')
    await expect(catalog.getByRole('radiogroup', { name: 'Catalog view' })).toBeVisible()
    await catalog.getByRole('radio', { name: 'Summary' }).press('ArrowRight')
    await expect(catalog.getByRole('radio', { name: 'Details' })).toHaveAttribute('aria-checked', 'true')
    await catalog.getByRole('textbox', { name: 'Catalog notes' }).fill('Consumer-owned content')
    await expect(catalog.getByRole('textbox')).toHaveValue('Consumer-owned content')
    await expect(catalog).toHaveScreenshot(`${mode}-emerald-catalog.png`)
  })
}
