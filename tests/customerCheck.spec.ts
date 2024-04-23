import { expect } from '@playwright/test';
import { listView, lookForSection, timeoutValue } from './supportFunctions.spec';

export async function checkCustomerFunc(page: any, customerId: string, email: string, section: string): Promise<void> {
  try {
    const iframe = page.frameLocator('iframe[title="undefined"]');
    await lookForSection(section, page, iframe);
    await listView(iframe);
    await iframe.locator('.ms-SearchBox').click();
    await iframe.getByPlaceholder('Search').fill(customerId);
    await iframe.getByTitle('Open record "' + customerId + '"').waitFor({ timeout: timeoutValue }).catch(() => {
      throw new Error('Timeout waiting for the item to open');
    });
    await iframe.getByTitle('Open record "' + customerId + '"').click();
    const checkedEmail = await iframe.getByLabel('Email', { exact: true }).inputValue();
    expect(checkedEmail).toBe(email);
    const checkedCustomerId = await iframe.getByRole('textbox', { name: 'No.', exact: true }).inputValue();
    expect(checkedCustomerId.toString()).toBe(customerId.toString());
  } catch (error) {
    throw error;
  }

}