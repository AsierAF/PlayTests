import { expect } from '@playwright/test';
import { lookForSection } from './supportFunctions.spec';

export async function createSalesOrderFunc(page: any, itemId: string, customerId:string, salesOrderId: string ,documentName: string, section: string): Promise<string> {
  const iframe = page.frameLocator('iframe[title="undefined"]');

  //----esperar que se cargue la pagina de bc
  await lookForSection(section, page, iframe);

  //----crear sales order
  await expect(iframe.getByRole('button', { name: 'Sales Orders:' , exact: true })).toBeVisible();
  await iframe.getByRole('menuitem', { name: 'New' }).click();
  await iframe.getByRole('textbox', { name: 'Contact (Blank)' }).click();
  //----esperar a que se abra
  await expect(iframe.getByRole('heading', { name: 'Sales Order' }).locator('div').nth(2)).toBeVisible();
  salesOrderId = await iframe.locator('.title--DaOt1SlIHGgb2tatyyfP').innerText();
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