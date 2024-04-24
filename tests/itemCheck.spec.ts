import { expect, test } from '@playwright/test';
import { listView, lookForSection, login } from './supportFunctions.spec';
import { awaitItemError, timeoutValue } from './supportVariables.spec';


export async function checkItemFunc(page: any, itemId: string, unitVolume: string, section: string): Promise<void> {
    try {
        const iframe = page.frameLocator('iframe[title="undefined"]');
        await lookForSection(section, page, iframe);
        await listView(iframe);
        await iframe.locator('.ms-SearchBox').click();
        await iframe.getByPlaceholder('Search').fill(itemId);
        await iframe.getByTitle('Open record "' + itemId + '"').waitFor({ timeout: timeoutValue }).catch(() => { throw awaitItemError; });
        await iframe.getByTitle('Open record "' + itemId + '"').click();
        const checkedVolume = await iframe.getByLabel('Unit Volume').inputValue();
        expect(checkedVolume.toString()).toBe(unitVolume.toString());
        const checkedItemId = await iframe.getByRole('textbox', { name: 'No.', exact: true }).inputValue();
        expect(checkedItemId.toString()).toBe(itemId.toString());
    } catch (error) {
        throw error;
    }
}

test('Check Item', async ({ page }) => {
    const itemId = '1205'
    const unitVolume = '99';
    const itemSection = 'Items';
    await login(page);
    await checkItemFunc(page, itemId, unitVolume, itemSection)
    await page.waitForLoadState('networkidle');
    await page.close();
});