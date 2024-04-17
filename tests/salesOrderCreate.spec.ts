import { lookForSection, login } from './supportFunctions.spec';
import { test, expect } from '@playwright/test';

export async function createSalesOrderFunc(page: any, itemId: string, customerId: string, salesOrderId: string, documentName: string, quantity: string, unitPrice: string, taxGroup: string, section: string): Promise<string> {
  const iframe = page.frameLocator('iframe[title="undefined"]');
  
  //----esperar que se cargue la pagina de bc
  await lookForSection(section, page, iframe);

  //----crear sales order
  await iframe.getByRole('button', { name: 'Sales Orders:', exact: true }).waitFor();
  await iframe.getByRole('menuitem', { name: 'New' }).click();
  await iframe.getByRole('textbox', { name: 'Contact (Blank)' }).click();
  //----esperar a que se abra
  await iframe.getByRole('heading', { name: 'Sales Order' }).waitFor();
  await iframe.getByRole('textbox', { name: 'External Document No.' }).fill(documentName);
  
  salesOrderId = await iframe.locator('.title--DaOt1SlIHGgb2tatyyfP').innerText();
  console.log('Sales id: ', salesOrderId)
  await iframe.getByLabel('Customer Name', { exact: true }).fill(customerId);

  await iframe.getByLabel('Toggle focus mode').click();
  //----esperar a que se abra
  await iframe.getByRole('heading', { name: 'Lines' }).waitFor();
  await iframe.getByRole('combobox', { name: 'No.', exact: true }).fill(itemId);
  const itemIdTest = await iframe.getByRole('combobox', { name: 'No.', exact: true }).inputValue();
  //await iframe.getByRole('combobox', { name: 'No.', exact: true }).waitFor('attached');
  await iframe.getByRole('textbox', { name: 'Quantity', exact: true }).fill(quantity);
  const quantityTest = await iframe.getByRole('textbox', { name: 'Quantity', exact: true }).inputValue();
  //await iframe.getByRole('textbox', { name: 'Quantity', exact: true }).waitFor('attached');
  await iframe.getByRole('textbox', { name: 'Unit Price Excl. Tax', exact: true }).fill(unitPrice);
  const unitPriceTest = await iframe.getByRole('textbox', { name: 'Unit Price Excl. Tax', exact: true }).inputValue();
  //await iframe.getByRole('textbox', { name: 'Unit Price Excl. Tax', exact: true }).waitFor('attached');
  await iframe.getByRole('combobox', { name: 'Tax Group Code' }).fill(taxGroup);
  const taxGroupTest = await iframe.getByRole('combobox', { name: 'Tax Group Code' }).inputValue();
  await iframe.getByRole('combobox', { name: 'Tax Group Code' }).waitFor('attached');
  //await expect(iframe.getByRole('combobox', { name: 'Tax Group Code' })).toBeFocused();

  console.log('itemId SOC: ', itemIdTest)
  console.log('qty SOC: ', quantityTest)
  console.log('unitP SOC: ', unitPriceTest)
  console.log('tafGroup SOC: ', taxGroupTest)
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