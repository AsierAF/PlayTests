import { test, expect } from '@playwright/test';

export async function createSalesOrderFunc(page: any, itemId: string, customerId:string, documentName: string): Promise<string> {

  const iframe = page.frameLocator('iframe[title="undefined"]');

  //----esperar que se cargue la pagina de bc
  await page.getByLabel('Search').click();
  await iframe.getByRole('textbox', { name: 'Tell me what you want to do' }).fill('Sales Orders');
  await iframe.locator('#GroupedListSection335').getByText('Sales Orders', { exact: true }).click();

  //----crear sales order
  await expect(iframe.getByRole('button', { name: 'Sales Orders:', exact: true })).toBeVisible();
  await iframe.getByRole('menuitem', { name: 'New' }).click();
  await iframe.getByRole('textbox', { name: 'Contact (Blank)' }).click();
  //----esperar a que se abra
  await expect(iframe.getByRole('heading', { name: 'Sales Order' }).locator('div').nth(2)).toBeVisible();
  const salesOrderElement = iframe.locator('.title--DaOt1SlIHGgb2tatyyfP');
  const salesOrderId = await salesOrderElement.innerText();
  console.log('Sales order id:', salesOrderId);
  await iframe.getByLabel('Customer Name', { exact: true }).fill(customerId);
  await iframe.getByRole('textbox', { name: 'External Document No.' }).fill(documentName);
  await iframe.getByLabel('Toggle focus mode').click();
  //----esperar a que se abra
  await expect(iframe.getByRole('heading', { name: 'Lines' }).locator('span')).toBeVisible();
  await iframe.getByRole('combobox', { name: 'No.', exact: true }).fill(itemId);
  await iframe.getByRole('button', { name: 'Back' }).click();

  return salesOrderId;
}

test('testSalesOrder', async ({ page }) => {

});
