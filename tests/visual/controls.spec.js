import { expect, test } from '@playwright/test'

test('controlled primitives expose their keyboard and event contracts', async ({ page }) => {
  await page.goto('/?mode=light&palette=blue')

  const name = page.getByLabel('Display name')
  await name.fill('Grace Hopper')
  await expect(name).toHaveValue('Grace Hopper')

  const seats = page.getByLabel('Seats')
  await seats.fill('99')
  await seats.press('Enter')
  await expect(seats).toHaveValue('12')

  const alerts = page.getByRole('switch', { name: 'Enable alerts' })
  await expect(alerts).toHaveAttribute('aria-checked', 'true')
  await alerts.press('Space')
  await expect(alerts).toHaveAttribute('aria-checked', 'false')

  await expect(page.getByText('stable', { exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'Remove tag' }).first().click()
  await expect(page.getByText('stable', { exact: true })).toHaveCount(0)
})
