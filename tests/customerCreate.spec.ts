import { lookForSection } from './supportFunctions.spec';
import { awaitEmailAttachedError, awaitHeaderError, awaitIdCustomerError, timeoutValue } from './supportVariables.spec';

export async function createCustomerFunc(page: any, customerId: string, email: string, section: string): Promise<string> {
  try {
    const iframe = page.frameLocator('iframe[title="undefined"]');
    await lookForSection(section, page, iframe);
    await iframe.getByRole('menuitem', { name: 'New', exact: true }).click();
    await iframe.getByRole('heading', { name: 'Select a template for a new' }).waitFor({ timeout: timeoutValue }).catch(() => { throw awaitHeaderError; });
    await iframe.getByRole('button', { name: 'OK' }).click();
    await iframe.getByLabel('Email', { exact: true }).fill(email);
    await iframe.locator('.title--DaOt1SlIHGgb2tatyyfP').waitFor({ timeout: timeoutValue }).catch(() => { throw awaitIdCustomerError; });
    customerId = await iframe.locator('.title--DaOt1SlIHGgb2tatyyfP').innerText();
    await iframe.getByRole('textbox', { name: 'Name' }).fill('CustomerPrueba');
    await iframe.getByLabel('Email', { exact: true }).waitFor('attached', { timeout: timeoutValue }).catch(() => { throw awaitEmailAttachedError; });
    await iframe.getByRole('button', { name: 'Back' }).click();
    return customerId;
  } catch (error) {
    throw error;
  }
}