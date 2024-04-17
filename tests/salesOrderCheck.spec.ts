import { test, expect } from '@playwright/test';
import { login } from './supportFunctions.spec';
import { listView, lookForSection } from './supportFunctions.spec';

export async function checkSalesOrderFunc(page: any, itemId: string, customerId: string, salesOrderId: string, documentName: string, section: string): Promise<void> {
  const iframe = page.frameLocator('iframe[title="undefined"]');
  await lookForSection(section, page, iframe);
  await listView(iframe);
  await iframe.locator('.ms-SearchBox-iconContainer').click();
  await iframe.getByPlaceholder('Search').fill(salesOrderId);
  const rows = await iframe.getByLabel('Sales Order List').locator('tbody');
  let countedRows = await rows.locator('tr').count();
  while (countedRows > 10) {
    countedRows = await rows.locator('tr').count();
  }
  //await iframe.getByTitle('Open record "' + salesOrderId + '"').waitFor();
  await iframe.getByTitle('Open record "' + salesOrderId + '"').click();
  await iframe.getByRole('button', { name: 'General" / "' }).waitFor();
  const checkedDocument = await iframe.getByRole('textbox', { name: 'External Document No.' }).inputValue();
  expect(checkedDocument.toLocaleLowerCase).toBe(documentName.toLocaleLowerCase);
  const checkedSalesOrder = await iframe.locator('.title--DaOt1SlIHGgb2tatyyfP').innerText();
  const regex = /(\S+)\s(.)\s(\S+)/;
  const match = checkedSalesOrder.match(regex);
  const extractedId = match[1];
  expect(extractedId).toBe(salesOrderId);
  await iframe.getByLabel('Choose a value for Customer Name').click();
  const checkedCustomerId = await iframe.getByTitle('Select record "' + customerId + '"').innerText();
  expect(checkedCustomerId).toBe(customerId);
  await iframe.getByTitle('Save and close the page').click();
  await iframe.getByLabel('Toggle focus mode').click();
  const checkedItemId = await iframe.getByRole('combobox', { name: 'No.', exact: true }).inputValue();
  expect(checkedItemId).toBe(itemId);
}

test('Check Sales Order 2', async ({ page }) => {
  const itemId = '1136';
  const customerId = 'C01330';
  const salesOrder = 'S-ORD101147';
  const documentName = 'salesorderpdf';
  const salesOrderSection = 'Sales Orders';
  await login(page);
  await checkSalesOrderFunc(page, itemId, customerId, salesOrder, documentName, salesOrderSection);
  await page.waitForLoadState('networkidle');
  await page.close();
});