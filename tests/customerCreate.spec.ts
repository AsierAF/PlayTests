import { test, expect } from '@playwright/test';

let customerId: string;

export async function createCustomerFunc(page: any, email:string): Promise<string> {
    const iframe = page.frameLocator('iframe[title="undefined"]');
    //----inicio
    //----esperar que se cargue la pagina de bc
    await expect(page.getByText('Dynamics 365 Business Central')).toBeVisible();
    await page.getByLabel('Search').click();
    await iframe.getByRole('textbox', { name: 'Tell me what you want to do' }).fill('Customers');
    await iframe.locator('#GroupedListSection335').getByText('Customers', { exact: true }).click();
    //----poner la vista de lista
    await iframe.getByLabel('', { exact: true }).click();
    await iframe.getByLabel('List').click();
    //----crear customer
    await iframe.getByRole('menuitem', { name: 'New', exact: true }).click();
    //----esperar a que se abra
    await expect(iframe.getByRole('heading', { name: 'Select a template for a new' })).toBeVisible();
    await iframe.getByRole('button', { name: 'OK' }).click();
    const customerElement = iframe.locator('.title--DaOt1SlIHGgb2tatyyfP');
    customerId = await customerElement.innerText();
    console.log('Customer id:', customerId);
    await iframe.getByRole('textbox', { name: 'Name' }).fill('CustomerPrueba');
    await iframe.getByLabel('Email', { exact: true }).fill(email);
    //----EL SIGUIENTE CLICK ES PORQUE EL EMAIL NO SE GUARDA Y NO SE PORQUE
    await iframe.getByRole('button', { name: 'Customer Card' }).click();
    await iframe.getByRole('button', { name: 'Back' }).click();
    return customerId;
  }


test('testCustomer', async ({ page }) => {

});

