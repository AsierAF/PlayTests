import { test, expect } from '@playwright/test';

export async function checkCustomerFunc(page: any, customerId: string, email:string): Promise<void> {
    
    const iframe = page.frameLocator('iframe[title="undefined"]');

    await expect(page.getByText('Dynamics 365 Business Central')).toBeVisible();
    await page.getByLabel('Search').click();
    await iframe.getByRole('textbox', { name: 'Tell me what you want to do' }).fill('Customers');
    await iframe.locator('#GroupedListSection335').getByText('Customers', { exact: true }).click();

    //----poner la vista de lista
    await iframe.getByLabel('', { exact: true }).click();
    await iframe.getByLabel('List').click();
    
    await iframe.locator('.ms-SearchBox').click();
    await iframe.getByPlaceholder('Search').fill(customerId);
    //----comprobar customer
    await iframe.getByTitle('Open record "' + customerId + '"').click();
  
    const checkedEmail = iframe.getByLabel('Email', { exact: true });
    const emailValue = await checkedEmail.inputValue();
    console.log('email:', emailValue);
    expect(emailValue).toBe(email);
    const checkedCustomerId = iframe.getByRole('textbox', { name: 'No.', exact: true });
    const checkedCustomerValue = await checkedCustomerId.inputValue();
    expect(checkedCustomerValue.toString()).toBe(customerId.toString());
   
  }