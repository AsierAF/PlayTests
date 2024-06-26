import { test, expect } from '@playwright/test';
import { countRows, login, listView, lookForSection} from './supportFunctions.spec';
import { awaitSOToOpenError, regexSalesOrderTitle, timeoutValue } from './supportVariables.spec';

export async function checkSalesOrderFunc(page: any, itemId: string, customerId: string, salesOrderId: string, documentName: string, section: string): Promise<void> {
  try {
    const iframe = page.frameLocator('iframe[title="undefined"]');
    await lookForSection(section, page, iframe);
    await listView(iframe);
    await iframe.locator('.ms-SearchBox-iconContainer').click();
    await iframe.getByPlaceholder('Search').fill(salesOrderId);

    await countRows(iframe);

    await iframe.getByTitle('Open record "' + salesOrderId + '"').click();
    await iframe.getByRole('button', { name: 'General" / "' }).waitFor({ timeout: timeoutValue }).catch(() => { throw awaitSOToOpenError; });
    const checkedDocument = await iframe.getByRole('textbox', { name: 'External Document No.' }).inputValue();
    expect(checkedDocument.toLocaleLowerCase).toBe(documentName.toLocaleLowerCase);
    const checkedSalesOrder = await iframe.locator('.title--DaOt1SlIHGgb2tatyyfP').innerText();
    const match = checkedSalesOrder.match(regexSalesOrderTitle);
    const extractedId = match[1];
    expect(extractedId).toBe(salesOrderId);
    await iframe.getByLabel('Choose a value for Customer Name').click();
    const checkedCustomerId = await iframe.getByTitle('Select record "' + customerId + '"').innerText();
    expect(checkedCustomerId).toBe(customerId);
    await iframe.getByTitle('Save and close the page').click();
    await iframe.getByLabel('Toggle focus mode').click();
    const checkedItemId = await iframe.getByRole('combobox', { name: 'No.', exact: true }).inputValue();
    expect(checkedItemId).toBe(itemId);
  } catch (error) {
    throw error;
  }

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