import { mockRoutes } from "../test-mock/mock-route.js";

// @ts-check
const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }, testInfo) => {
  console.log(`Running ${testInfo.title}`);
  mockRoutes(page);
  await page.goto("/livraison");
  await expect(page.getByText("par livraison")).toHaveCount(1);
});

test("U1 - Affichage simulateur et source", async ({ page }) => {
  await test.step("On peut accèder à impact-livraison directement depuis l'URL du navigateur", async () => {
    await expect(page).toHaveTitle(/Impact Carbone de la livraison de colis | Impact CO2/);
  });
  await test.step("J'ai bien le titre de l'onglet, le fil d'ariane, et le lien vers la source qui s'affichent", async () => {
    await expect(page).toHaveTitle(/Impact Carbone de la livraison de colis | Impact CO2/);
    await expect(page.getByRole("heading").first()).toHaveText("Mesurer l'impact carbone de la livraison de colis");
    await expect(page.getByTestId("paragraph1")).toHaveText(
      "80 % des Français de 11 ans et plus font des achats en ligne."
    );
    await expect(page.getByTestId("lien-etude-ademe")).toHaveText("Commerce en ligne - Étude ADEME 2023 ");
  });
  await test.step("J'ai bien le texte explicatif qui s'affiche", async () => {
    await expect(page.getByTestId("paragraph1")).toHaveText(
      "80 % des Français de 11 ans et plus font des achats en ligne."
    );
  });
});

test("U2 - Calcul de l'impact d'une livraison", async ({ page }) => {
  await test.step("Le produit par défaut est l'habillement", async () => {
    let currentProduit = await page.$eval(
      "select#produits",
      (sel) => sel.options[sel.options.selectedIndex].textContent
    );
    expect(currentProduit).toEqual("Habillement");
  });
  await test.step("Le mode de retrait par défaut est le point relais", async () => {
    let currentRetrait = await page.$eval(
      "select#retraits",
      (sel) => sel.options[sel.options.selectedIndex].textContent
    );
    expect(currentRetrait).toEqual("Point relais");
  });

  await test.step("Par défaut un calcul de CO2 est affiché", async () => {
    // Given
    await expect(page.getByTestId("resultAsText")).toHaveText("3,31 kg de CO2e ");
  });

  await test.step("Si on prend un colis volumineux, on a bien une augmentation de CO2", async () => {
    // Given
    await page.locator("select#retraits").selectOption({ label: "Livraison à domicile" });
    await page.locator("select#produits").selectOption({ label: "Bien d'équipement volumineux" }); // Ici
    // When-Then
    await expect(page.getByTestId("resultAsText")).toHaveText("70,59 kg de CO2e ");
  });

  await test.step("La liste déroulante “Vous commandez en majorité” a bien les options “Produits de grande consommation”, “Habillement”, “Produits culturel physique”, “bien d’équipement volumineux”, et “autre”", async () => {
    await page.locator("select#produits").selectOption({ label: "Produits de grande consommation" });
    await page.locator("select#produits").selectOption({ label: "Habillement" });
    await page.locator("select#produits").selectOption({ label: "Produit culturel physique" });
    await page.locator("select#produits").selectOption({ label: "Bien d'équipement volumineux" });
  });

  await test.step("La liste déroulante “Que vous faites livrer” a bien 3 options", async () => {
    await page.locator("select#retraits").selectOption({ label: "Livraison à domicile" });
    await page.locator("select#retraits").selectOption({ label: "Point relais" });
    await page.locator("select#retraits").selectOption({ label: "Click & collect" });
  });
});

test("U4 - Equivalences", async ({ page }) => {
  await test.step("Les équivalences s'affichent", async () => {
    // Given
    // When
    // Then
    await expect(page.getByText("15 km")).toHaveCount(1);
    await expect(page.getByText("52 heures")).toHaveCount(1);
    await expect(page.getByText("0,5 repas")).toHaveCount(1);
  });

  await test.step("Une modale d'explication s'affiche", async () => {
    // Given
    await expect(page.getByRole("button", { name: "Fermer" })).not.toBeVisible();
    // When
    await page.getByRole("button", { name: "Comprendre le calcul" }).click();
    // Then
    await expect(page.getByRole("button", { name: "Fermer" })).toBeVisible();
  });
});
