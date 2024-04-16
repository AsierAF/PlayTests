import { expect } from '@playwright/test';
import { listView, lookForSection } from './supportFunctions.spec';

export async function checkCustomerFunc(page: any, customerId: string, email: string, section: string): Promise<void> {
  const iframe = page.frameLocator('iframe[title="undefined"]');

  await lookForSection(section, page, iframe);
  //----poner la vista de lista
  await listView(iframe);
  //----busca y comprueba
  await iframe.locator('.ms-SearchBox').click();
  await iframe.getByPlaceholder('Search').fill(customerId);

  //----comprobar customer
  await iframe.getByTitle('Open record "' + customerId + '"').focus();
  await iframe.getByTitle('Open record "' + customerId + '"').click();

  const checkedEmail = await iframe.getByLabel('Email', { exact: true }).inputValue();
  console.log('email:', checkedEmail);
  expect(checkedEmail).toBe(email);

  const checkedCustomerId = await iframe.getByRole('textbox', { name: 'No.', exact: true }).inputValue();
  expect(checkedCustomerId.toString()).toBe(customerId.toString());
}