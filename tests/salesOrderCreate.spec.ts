import { lookForSection, login } from './supportFunctions.spec';
import { test, expect } from '@playwright/test';

export async function createSalesOrderFunc(page: any, itemId: string, customerId: string, salesOrderId: string, documentName: string, quantity: string, unitPrice: string, taxGroup: string, section: string): Promise<string> {
  const iframe = page.frameLocator('iframe[title="undefined"]');
  await lookForSection(section, page, iframe);
  await iframe.getByRole('button', { name: 'Sales Orders:', exact: true }).waitFor({timeout: 2000});
  await iframe.getByRole('menuitem', { name: 'New' }).click();
  await iframe.getByRole('textbox', { name: 'Contact (Blank)' }).click();
  await iframe.getByRole('heading', { name: 'Sales Order' }).waitFor({timeout: 2000});
  await iframe.getByRole('textbox', { name: 'External Document No.' }).fill(documentName);
  await iframe.getByLabel('Customer Name', { exact: true }).fill(customerId);
  await iframe.getByLabel('Toggle focus mode').click();
  await iframe.getByRole('menuitemcheckbox', { name: 'Toggle filter' }).waitFor({timeout: 2000});
  await iframe.getByRole('combobox', { name: 'No.', exact: true }).fill(itemId);
  await iframe.getByRole('combobox', { name: 'No.', exact: true }).waitFor('attached', {timeout: 2000});
  await iframe.getByRole('combobox', { name: 'Tax Group Code' }).fill(taxGroup);
  await iframe.getByLabel(taxGroup).click();
  await iframe.getByRole('combobox', { name: 'Tax Group Code' }).waitFor('attached', {timeout: 2000});
  await iframe.getByRole('textbox', { name: 'Quantity', exact: true }).fill(quantity);
  await iframe.getByRole('textbox', { name: 'Quantity', exact: true }).waitFor('attached', {timeout: 2000});
  await iframe.getByRole('textbox', { name: 'Unit Price Excl. Tax', exact: true }).fill(unitPrice);
  await iframe.getByRole('textbox', { name: 'Unit Price Excl. Tax', exact: true }).waitFor('attached', {timeout: 2000});
  await iframe.getByLabel('Toggle focus mode').click();
  const titleId = await iframe.locator('.title--DaOt1SlIHGgb2tatyyfP').innerText();
  const regex = /(\S+)\s(.)\s(\S+)/;
  const match = titleId.match(regex);
  salesOrderId = match[1];
  await iframe.getByRole('button', { name: 'Back' }).click();
  return salesOrderId;
}

let salesOrder: string;
test('Create Sales Order 2', async ({ page }) => {
  const itemId = '1136';
  const customerId = 'C01330';
  const quantity = '10'
  const unitPrice = '150'
  const taxGroup = 'LABOR'
  const documentName = 'salesorderpdf';
  const salesOrderSection = 'Sales Orders';
  await login(page);
  await createSalesOrderFunc(page, itemId, customerId, salesOrder, documentName, quantity, unitPrice, taxGroup, salesOrderSection);
  await page.waitForLoadState('networkidle');
  await page.close();
});