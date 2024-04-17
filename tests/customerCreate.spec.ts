import { test, expect } from '@playwright/test';
import { lookForSection, login } from './supportFunctions.spec';

export async function createCustomerFunc(page: any, customerId: string, email: string, section: string): Promise<string> {
  const iframe = page.frameLocator('iframe[title="undefined"]');

  //----inicio
  await lookForSection(section, page, iframe);
  //----crear customer
  await iframe.getByRole('menuitem', { name: 'New', exact: true }).click();
  //----esperar a que se abra
  await iframe.getByRole('heading', { name: 'Select a template for a new' }).waitFor();
  await iframe.getByRole('button', { name: 'OK' }).click();
  await iframe.getByLabel('Email', { exact: true }).fill(email);
  await iframe.locator('.title--DaOt1SlIHGgb2tatyyfP').waitFor()
  customerId = await iframe.locator('.title--DaOt1SlIHGgb2tatyyfP').innerText();
  console.log('Customer id:', customerId);
  await iframe.getByRole('textbox', { name: 'Name' }).fill('CustomerPrueba');

  //----espera a que el texto se ponga
  await iframe.getByLabel('Email' , {exact:true}).waitFor('attached');
  await iframe.getByRole('button', { name: 'Back' }).click();
  return customerId;
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