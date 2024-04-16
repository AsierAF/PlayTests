import { test, expect } from '@playwright/test';

export async function checkItemFunc(page: any, itemId: string, unitVolume: string): Promise<void> {
    const iframe = page.frameLocator('iframe[title="undefined"]');

    await page.getByLabel('Search').click();
    await iframe.getByRole('textbox', { name: 'Tell me what you want to do' }).fill('Items');
    await iframe.locator('#GroupedListSection335').getByText('Items', { exact: true }).click();
    
    //----poner la vista de lista
    await iframe.getByLabel('', { exact: true }).click();
    await iframe.getByLabel('List').click();

    await iframe.locator('.ms-SearchBox').click();
    await iframe.getByPlaceholder('Search').fill(itemId);
    
   
    //await expect(iframe.getByLabel('Item List').locator('div').last()).toBeVisible();

    await iframe.getByTitle('Open record "' + itemId + '"').focus();

    //----comprobar item
    await iframe.getByTitle('Open record "' + itemId + '"').click();
    const checkedVolume = iframe.getByLabel('Unit Volume');
    const volumeValue = await checkedVolume.inputValue();
    console.log('Unit Volume:', volumeValue);
    expect(volumeValue.toString()).toBe(unitVolume.toString());
    const checkedItemId = iframe.getByRole('textbox', { name: 'No.', exact: true });
    const checkedIdValue = await checkedItemId.inputValue();
    expect(checkedIdValue.toString()).toBe(itemId.toString());


}