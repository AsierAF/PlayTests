import { expect } from '@playwright/test';
import { lookForSection } from './supportFunctions.spec';

export async function createItemFunc(page: any, itemId: string, unitVolume: string, section: string): Promise<string> {
    const iframe = page.frameLocator('iframe[title="undefined"]');

    //----esperar que se cargue la pagina de bc
    await lookForSection(section, page, iframe);

    //----crear item
    await iframe.getByRole('button', { name: 'New', exact: true }).click();
    //----espera a que se abra
    await expect(iframe.getByRole('heading', { name: 'Select a template for a new' })).toBeVisible();
    await iframe.getByRole('button', { name: 'OK' }).click();
    itemId = await iframe.locator('.title--DaOt1SlIHGgb2tatyyfP').innerText();
    console.log('Item id:', itemId.toString());

    //----espera a que se abra
    await expect(iframe.getByRole('heading', { name: 'Item Card' }).locator('div').nth(2)).toBeVisible();
    await iframe.getByRole('textbox', { name: 'Description' }).fill('ItemPrueba');
    await iframe.getByLabel('Unit Volume').fill(unitVolume.toString());
    await iframe.getByRole('button', { name: 'Back' }).click();
    return itemId.toString();
}