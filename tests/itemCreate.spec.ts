import { test, expect } from '@playwright/test';

let itemId: string; 

export async function createItemFunc(page: any, unitVolume: string): Promise<string> {
    
    const iframe = page.frameLocator('iframe[title="undefined"]');
    //----esperar que se cargue la pagina de bc
    await page.getByLabel('Search').click();
    await iframe.getByRole('textbox', { name: 'Tell me what you want to do' }).fill('Items');
    await iframe.locator('#GroupedListSection335').getByText('Items', { exact: true }).click();

    //----crear item
    await iframe.getByRole('button', { name: 'New', exact: true }).click();
    //----espera a que se abra
    await expect(iframe.getByRole('heading', { name: 'Select a template for a new' })).toBeVisible();
    await iframe.getByRole('button', { name: 'OK' }).click();
    const itemElement = iframe.locator('.title--DaOt1SlIHGgb2tatyyfP');
    itemId = (await itemElement.innerText()).toString();
    console.log('Item id:', itemId);
    
    //----espera a que se abra
    await expect(iframe.getByRole('heading', { name: 'Item Card' }).locator('div').nth(2)).toBeVisible();
    await iframe.getByRole('textbox', { name: 'Description' }).fill('ItemPrueba');
    await iframe.getByLabel('Unit Volume').fill(unitVolume.toString());
    await iframe.getByRole('button', { name: 'Back' }).click();
    return itemId;
}


test('testItem', async ({ page }) => {

});
