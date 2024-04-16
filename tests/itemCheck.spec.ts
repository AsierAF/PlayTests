import { expect } from '@playwright/test';
import { listView, lookForSection } from './supportFunctions.spec';


export async function checkItemFunc(page: any, itemId: string, unitVolume: string, section: string): Promise<void> {
    const iframe = page.frameLocator('iframe[title="undefined"]');

    await lookForSection(section, page, iframe)
    //----poner la vista de lista
    await listView(iframe);
    //----busca y comprueba
    await iframe.locator('.ms-SearchBox').click();
    await iframe.getByPlaceholder('Search').fill(itemId);

    //await expect(iframe.getByLabel('Item List').locator('div').last()).toBeVisible();

    //----comprobar item
    await iframe.getByTitle('Open record "' + itemId + '"').focus();
    await iframe.getByTitle('Open record "' + itemId + '"').click();

    const checkedVolume = await iframe.getByLabel('Unit Volume').inputValue();
    console.log('Unit Volume:', checkedVolume);
    expect(checkedVolume.toString()).toBe(unitVolume.toString());

    const checkedItemId = await iframe.getByRole('textbox', { name: 'No.', exact: true }).inputValue();
    expect(checkedItemId.toString()).toBe(itemId.toString());
}