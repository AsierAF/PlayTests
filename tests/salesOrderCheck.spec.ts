import { test, expect } from '@playwright/test';
import { login } from './supportFunctions.spec';
import { listView, lookForSection } from './supportFunctions.spec';

export async function checkSalesOrderFunc(page: any, itemId: string, customerId: string, salesOrderId: string, documentName: string, section: string): Promise<void> {
  const iframe = page.frameLocator('iframe[title="undefined"]');

  await lookForSection(section, page, iframe);
  //----poner la vista de lista
  await listView(iframe);
  //----busca y comprueba
  await iframe.locator('.ms-SearchBox-iconContainer').click();
  await iframe.getByPlaceholder('Search').fill(salesOrderId);

  await iframe.getByTitle('Open record "' + salesOrderId + '"').focus();
  await iframe.getByTitle('Open record "' + salesOrderId + '"').click();

  //const rows = await iframe.getByLabel('Sales Order List').locator('tbody');
  //await expect(rows).toBeVisible();
  //const countRows = await rows.locator('tr').count();
  //console.log('rows counted' ,countRows);

  //----espera que se abra
  await expect(iframe.getByRole('button', { name: 'General" / "' })).toBeVisible();
  //----comprueba el texto
  const checkedDocument = await iframe.getByRole('textbox', { name: 'External Document No.' }).inputValue();
  console.log('Document name:', checkedDocument.toLocaleLowerCase());
  expect(checkedDocument.toLocaleLowerCase).toBe(documentName.toLocaleLowerCase);
  //----comprueba el id
  const checkedSalesOrder = await iframe.locator('.title--DaOt1SlIHGgb2tatyyfP').innerText();

  //----regular expression para sacar el id de la sales order si usaramos match[3] seria el nombre del customer
  const regex = /(\S+)\s(.)\s(\S+)/;
  const match = checkedSalesOrder.match(regex);
  const extractedId = match[1];
  expect(extractedId).toBe(salesOrderId);
  console.log('Checked sales id: ', extractedId);
  //----comprobar customer
  await iframe.getByLabel('Choose a value for Customer Name').click();
  const checkedCustomerId = await iframe.getByTitle('Select record "' + customerId + '"').innerText();
  console.log('Customer id checked: ', checkedCustomerId)
  console.log('CustomerId used: ', customerId);
  expect(checkedCustomerId).toBe(customerId);
  await iframe.getByTitle('Save and close the page').click();
  //----comprobar item
  await iframe.getByLabel('Toggle focus mode').click();
  const checkedItemId = await iframe.getByRole('combobox', { name: 'No.', exact: true }).inputValue();
  console.log('ItemId checked: ', checkedItemId);
  console.log('ItemId used: ', itemId);
  expect(checkedItemId).toBe(itemId);
}

test('Check Sales Order', async ({ page }) => {
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