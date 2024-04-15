import { test, expect } from '@playwright/test';

export async function checkSalesOrderFunc(page: any, itemId: string, customerId:string, salesOrderId: string, documentName:string): Promise<void> {
    const iframe = page.frameLocator('iframe[title="undefined"]');
    
    //----esperar que se cargue la pagina de bc
    
    await page.getByLabel('Search').click();
    await iframe.getByRole('textbox', { name: 'Tell me what you want to do' }).fill('Sales Orders');
    await iframe.locator('#GroupedListSection335').getByText('Sales Orders', { exact: true }).click();
    await expect(iframe.getByRole('button', { name: 'Sales Orders:', exact: true })).toBeVisible();
    //----poner la vista de lista
    await iframe.getByLabel('', { exact: true }).click();
    await iframe.getByLabel('List').click();
    //----busca y comprueba
    await iframe.locator('.ms-SearchBox-iconContainer').click();
    await iframe.getByPlaceholder('Search').fill(salesOrderId);
    

    //await expect(iframe.getByLabel('Sales Order List').locator('div').last()).toBeVisible();
    //await expect(iframe.getByLabel('Sales Order List').locator('div').filter({ hasText: 'Sales Order ListPress Ctrl+' }).first()).toHaveText(salesOrderId)
    const textis = await iframe.getByLabel('Sales Order List').locator('tbody > tr').first().innerText();
    const lol = textis.split(3)
    console.log(lol)
    
    await expect(iframe.getByLabel('Sales Order List').locator('tbody > tr > td')).toHaveText(salesOrderId)
    
    const rows = await iframe.getByLabel('Sales Order List').locator('tbody');
    await expect(rows).toBeVisible();
    const countRows = await rows.locator('tr').count();
    console.log('rows counted' ,countRows);
    
    
    await iframe.getByTitle('Open record "' + salesOrderId + '"').click();
    //----espera que se abra
    await expect(iframe.getByRole('button', { name: 'General" / "' })).toBeVisible();
    //----comprueba el texto
    const checkedDocument = iframe.getByRole('textbox', { name: 'External Document No.' });
    const documentValue = await checkedDocument.inputValue();
    console.log('Document name:', documentValue);
    expect(documentValue.toLocaleLowerCase).toBe(documentName.toLocaleLowerCase);
    //----comprueba el id
    const checkedSalesOrder = iframe.locator('.title--DaOt1SlIHGgb2tatyyfP');
    const checkedSalesOrderId = await checkedSalesOrder.innerText();
    //----regular expression para sacar el id de la sales order
    const regex = /([A-Z]-[A-Z]+[\d]+)/;
    const match = checkedSalesOrderId.match(regex);
    const extractedId = match ? match[0] : null;
    expect(salesOrderId).toBe(extractedId);
    console.log('Checked sales id: ', extractedId);

    console.log('ItemId used: ', itemId);
    console.log('CustomerId used: ', customerId);
    //----cerrar
    
  }