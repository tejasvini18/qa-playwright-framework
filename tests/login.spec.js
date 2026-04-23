const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { testData } = require('../utils/testData');

test.describe('Login Tests', () => {

  test('Valid Login Test', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login(
      testData.validUser.username,
      testData.validUser.password
    );

    await expect(page).toHaveURL(/inventory/);
  });

  test('Invalid Login Test', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login(
      testData.invalidUser.username,
      testData.invalidUser.password
    );

    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
  });

});