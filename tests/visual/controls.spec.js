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

  const region = page.getByRole('combobox', { name: 'Region' })
  await region.press('ArrowDown')
  await expect(region).toHaveAttribute('aria-expanded', 'true')
  await page.getByLabel('Search options').fill('Asia')
  await page.getByLabel('Search options').press('Enter')
  await expect(region).toHaveText(/Asia Pacific/)
  await expect(region).toHaveAttribute('aria-expanded', 'false')

  const startDate = page.getByRole('button', { name: 'Start date' })
  await startDate.press('ArrowDown')
  const dateDialog = page.getByRole('dialog', { name: 'Date picker' })
  await expect(dateDialog).toBeVisible()
  const selectedDay = page.getByRole('gridcell', { name: /February 14, 2028/ })
  await selectedDay.press('ArrowRight')
  await page.keyboard.press('Enter')
  await expect(startDate).toHaveText(/February 15, 2028/)
  await expect(dateDialog).toBeHidden()

  await startDate.press('ArrowDown')
  await page.getByLabel('Date input').fill('2028-02-30')
  await page.getByLabel('Date input').press('Enter')
  await expect(dateDialog.getByRole('alert')).toContainText('valid available date')
  await page.keyboard.press('Escape')
  await expect(startDate).toBeFocused()

  await name.fill('')
  await page.getByRole('button', { name: 'Validate form' }).click()
  await expect(page.getByRole('alert')).toHaveText('Display name is required')
  await name.fill('Grace Hopper')
  await page.getByRole('button', { name: 'Validate form' }).click()
  await expect(page.getByRole('status')).toHaveText('Reusable form validation passed.')

  await expect(page.getByText('stable', { exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'Remove tag' }).first().click()
  await expect(page.getByText('stable', { exact: true })).toHaveCount(0)
})
