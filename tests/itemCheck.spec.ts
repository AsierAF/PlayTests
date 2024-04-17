import { expect } from '@playwright/test';
import { listView, lookForSection } from './supportFunctions.spec';


export async function checkItemFunc(page: any, itemId: string, unitVolume: string, section: string): Promise<void> {
    const iframe = page.frameLocator('iframe[title="undefined"]');
    await lookForSection(section, page, iframe);
    await listView(iframe);
    await iframe.locator('.ms-SearchBox').click();
    await iframe.getByPlaceholder('Search').fill(itemId);
    await iframe.getByTitle('Open record "' + itemId + '"').waitFor();
    await iframe.getByTitle('Open record "' + itemId + '"').click();
    const checkedVolume = await iframe.getByLabel('Unit Volume').inputValue();
    expect(checkedVolume.toString()).toBe(unitVolume.toString());
    const checkedItemId = await iframe.getByRole('textbox', { name: 'No.', exact: true }).inputValue();
    expect(checkedItemId.toString()).toBe(itemId.toString());
}