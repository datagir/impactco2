// @ts-check
const { test, expect } = require('@playwright/test')

test('Poisson gras', async ({ page }) => {
  await test.step('On charge la page sur les poissons gras', async () => {
    await page.goto('/repas/repasavecdupoissongras')
  })
  await test.step('1 repas avec du boeuf...', async () => {
    await expect(page.getByTitle('texte boeuf')).toHaveText(
      '1 repas avecdu boeuf'
    )
  })
  await test.step('équivaut à 4 repas avec du poisson gras', async () => {
    expect(await page.getByAltText('🐟').count()).toEqual(4)
    await expect(page.getByTitle('texte poissons')).toHaveText(
      '4 repas avecdu poisson gras'
    )
  })
})
