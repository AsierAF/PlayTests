import { lookForSection } from './supportFunctions.spec';
import { awaitHeaderError, awaitIdItemError, timeoutValue } from './supportVariables.spec';

export async function createItemFunc(page: any, itemId: string, unitVolume: string, section: string): Promise<string> {
    try {
        const iframe = page.frameLocator('iframe[title="undefined"]');
        await lookForSection(section, page, iframe);
        await iframe.getByRole('button', { name: 'New', exact: true }).click();
        await iframe.getByRole('heading', { name: 'Select a template for a new' }).waitFor({ timeout: timeoutValue }).catch(() => { throw awaitHeaderError; });
        await iframe.getByRole('button', { name: 'OK' }).click();
        await iframe.locator('.title--DaOt1SlIHGgb2tatyyfP').waitFor({ timeout: timeoutValue }).catch(() => { throw awaitIdItemError; });
        itemId = await iframe.locator('.title--DaOt1SlIHGgb2tatyyfP').innerText();
        await iframe.getByRole('textbox', { name: 'Description' }).fill('ItemPrueba');
        await iframe.getByLabel('Unit Volume').fill(unitVolume.toString());
        await iframe.getByRole('button', { name: 'Back' }).click();
        return itemId.toString();
    } catch (error) {
        throw error;
    }
}
