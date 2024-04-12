import { test, expect } from '@playwright/test';

export async function checkItemFunc(page: any, itemId: string, unitVolume: string): Promise<void> {
    const iframe = page.frameLocator('iframe[title="undefined"]');

    await expect(page.getByText('Dynamics 365 Business Central')).toBeVisible();
    await page.getByLabel('Search').click();
    await iframe.getByRole('textbox', { name: 'Tell me what you want to do' }).fill('Items');

    await iframe.locator('#GroupedListSection335').getByText('Items', { exact: true }).click();

    await iframe.locator('.ms-SearchBox').click();
    await iframe.getByPlaceholder('Search').fill(itemId);
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