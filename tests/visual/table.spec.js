import { expect, test } from '@playwright/test'

for (const mode of ['light', 'dark']) {
  test(`${mode} table keeps header and rows in one responsive scroll container`, async ({ page }) => {
    await page.goto(`/?mode=${mode}&palette=violet`)
    const table = page.getByRole('table', { name: 'Reusable node inventory' })
    const scroll = page.locator('.liquid-table__scroll')
    await expect(scroll.locator('thead')).toHaveCount(1)
    await expect(scroll.locator('tbody')).toHaveCount(1)
    await expect(table.getByRole('row')).toHaveCount(11)

    await page.getByRole('button', { name: 'Latency' }).click()
    await expect(page.getByRole('columnheader', { name: /Latency/ })).toHaveAttribute('aria-sort', 'ascending')
    await expect(table.getByRole('row').nth(1)).toContainText('Tokyo Core')
    const overflow = await scroll.evaluate((element) => ({ clientWidth: element.clientWidth, scrollWidth: element.scrollWidth, clientHeight: element.clientHeight, scrollHeight: element.scrollHeight }))
    expect(overflow.scrollHeight).toBeGreaterThan(overflow.clientHeight)
    if (page.viewportSize().width < 600) expect(overflow.scrollWidth).toBeGreaterThan(overflow.clientWidth)
    await expect(page.locator('.lab-data-table')).toHaveScreenshot(`${mode}-violet-table.png`)
  })
}
