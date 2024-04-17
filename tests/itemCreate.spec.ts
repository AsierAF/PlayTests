import { test, expect } from '@playwright/test';
import { lookForSection, login } from './supportFunctions.spec';

export async function createItemFunc(page: any, itemId: string, unitVolume: string, section: string): Promise<string> {
    const iframe = page.frameLocator('iframe[title="undefined"]');

    //----esperar que se cargue la pagina de bc
    await lookForSection(section, page, iframe);

    //----crear item
    await iframe.getByRole('button', { name: 'New', exact: true }).click();
    //----espera a que se abra
    await iframe.getByRole('heading', { name: 'Select a template for a new' }).waitFor();
    await iframe.getByRole('button', { name: 'OK' }).click();

    //----espera a que se abra
    //await iframe.getByRole('heading', { name: 'Item Card' }).waitFor();
    await iframe.locator('.title--DaOt1SlIHGgb2tatyyfP').waitFor();
    itemId = await iframe.locator('.title--DaOt1SlIHGgb2tatyyfP').innerText();
    console.log('Item id:', itemId.toString());

    await iframe.getByRole('textbox', { name: 'Description' }).fill('ItemPrueba');
    await iframe.getByLabel('Unit Volume').fill(unitVolume.toString());
    await iframe.getByRole('button', { name: 'Back' }).click();
    return itemId.toString();
}


let itemId: string;
test('Create Item', async ({ page }) => {

    const unitVolume = '99';
    const itemSection = 'Items';
    await login(page);
    await createItemFunc(page, itemId, unitVolume, itemSection)
    await page.waitForLoadState('networkidle');
    await page.close();
});