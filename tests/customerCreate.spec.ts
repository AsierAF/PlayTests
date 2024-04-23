import { test } from '@playwright/test';
import { lookForSection, login, timeoutValue } from './supportFunctions.spec';

export async function createCustomerFunc(page: any, customerId: string, email: string, section: string): Promise<string> {
  try {
    const iframe = page.frameLocator('iframe[title="undefined"]');
    await lookForSection(section, page, iframe);
    await iframe.getByRole('menuitem', { name: 'New', exact: true }).click();
    await iframe.getByRole('heading', { name: 'Select a template for a new' }).waitFor({ timeout: timeoutValue }).catch(() => {
      throw new Error('Timeout waiting for the header of the page');
    });
    await iframe.getByRole('button', { name: 'OK' }).click();
    await iframe.getByLabel('Email', { exact: true }).fill(email);
    await iframe.locator('.title--DaOt1SlIHGgb2tatyyfP').waitFor({ timeout: timeoutValue }).catch(() => {
      throw new Error('Timeout waiting for the id of the customer');
    });
    customerId = await iframe.locator('.title--DaOt1SlIHGgb2tatyyfP').innerText();
    await iframe.getByRole('textbox', { name: 'Name' }).fill('CustomerPrueba');
    await iframe.getByLabel('Email', { exact: true }).waitFor('attached', { timeout: timeoutValue }).catch(() => {
      throw new Error('Timeout waiting for the email to be attached');
    });
    await iframe.getByRole('button', { name: 'Back' }).click();
    return customerId;
  } catch (error) {
    throw error;
  }
}

let customerId: string;

test('Create Customer', async ({ page }) => {
  const email = 'email@email.com';
  const customerSection = 'Customers';
  await login(page);
  customerId = await createCustomerFunc(page, customerId, email, customerSection);
  await page.waitForLoadState('networkidle');
  await page.close();
});