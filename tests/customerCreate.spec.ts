import { expect } from '@playwright/test';
import { lookForSection } from './supportFunctions.spec';

export async function createCustomerFunc(page: any, customerId: string, email: string, section: string): Promise<string> {
  const iframe = page.frameLocator('iframe[title="undefined"]');

  //----inicio
  await lookForSection(section, page, iframe);
  //----crear customer
  await iframe.getByRole('menuitem', { name: 'New', exact: true }).click();
  //----esperar a que se abra
  await expect(iframe.getByRole('heading', { name: 'Select a template for a new' })).toBeVisible();
  await iframe.getByRole('button', { name: 'OK' }).click();
  customerId = await iframe.locator('.title--DaOt1SlIHGgb2tatyyfP').innerText();
  console.log('Customer id:', customerId);
  await iframe.getByRole('textbox', { name: 'Name' }).fill('CustomerPrueba');
  await iframe.getByLabel('Email', { exact: true }).fill(email);
  //----EL SIGUIENTE CLICK ES PORQUE EL EMAIL NO SE GUARDA Y NO SE PORQUE
  await iframe.getByRole('button', { name: 'Customer Card' }).click();
  await iframe.getByRole('button', { name: 'Back' }).click();
  return customerId;
}