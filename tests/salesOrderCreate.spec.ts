import { lookForSection } from './supportFunctions.spec';
import { awaitDataAttachedError, awaitItemTableError, awaitSOToOpenError, regexSalesOrderTitle, timeoutValue } from './supportVariables.spec';

export async function createSalesOrderFunc(page: any, itemId: string, customerId: string, salesOrderId: string, documentName: string, quantity: string, unitPrice: string, taxGroup: string, section: string): Promise<string> {
  try {
    const iframe = page.frameLocator('iframe[title="undefined"]');
    await lookForSection(section, page, iframe);
    await iframe.getByRole('button', { name: 'Sales Orders:', exact: true }).waitFor({ timeout: timeoutValue }).catch(() => { throw awaitSOToOpenError; });
    await iframe.getByRole('menuitem', { name: 'New' }).click();
    await iframe.getByRole('textbox', { name: 'Contact (Blank)' }).click();
    await iframe.getByRole('heading', { name: 'Sales Order' }).waitFor({ timeout: timeoutValue }).catch(() => { throw awaitSOToOpenError; });
    await iframe.getByRole('textbox', { name: 'External Document No.' }).fill(documentName);
    await iframe.getByLabel('Customer Name', { exact: true }).fill(customerId);
    await iframe.getByLabel('Toggle focus mode').click();
    await iframe.getByRole('menuitemcheckbox', { name: 'Toggle filter' }).waitFor({ timeout: timeoutValue }).catch(() => { throw awaitItemTableError; });
    await iframe.getByRole('combobox', { name: 'No.', exact: true }).fill(itemId);
    await iframe.getByRole('combobox', { name: 'No.', exact: true }).waitFor('attached', { timeout: timeoutValue }).catch(() => { throw awaitDataAttachedError; });
    await iframe.getByRole('combobox', { name: 'Tax Group Code' }).fill(taxGroup);
    await iframe.getByLabel(taxGroup).click();
    await iframe.getByRole('combobox', { name: 'Tax Group Code' }).waitFor('attached', { timeout: timeoutValue }).catch(() => { throw awaitDataAttachedError; });
    await iframe.getByRole('textbox', { name: 'Quantity', exact: true }).fill(quantity);
    await iframe.getByRole('textbox', { name: 'Quantity', exact: true }).waitFor('attached', { timeout: timeoutValue }).catch(() => { throw awaitDataAttachedError; });
    await iframe.getByRole('textbox', { name: 'Unit Price Excl. Tax', exact: true }).fill(unitPrice);
    await iframe.getByRole('textbox', { name: 'Unit Price Excl. Tax', exact: true }).waitFor('attached', { timeout: timeoutValue }).catch(() => { throw awaitDataAttachedError; });
    await iframe.getByLabel('Toggle focus mode').click();
    const titleId = await iframe.locator('.title--DaOt1SlIHGgb2tatyyfP').innerText();
    const match = titleId.match(regexSalesOrderTitle);
    salesOrderId = match[1];
    await iframe.getByRole('button', { name: 'Back' }).click();
    return salesOrderId;
  } catch (error) {
    throw error;
  }

}
