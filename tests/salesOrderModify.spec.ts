import { test, expect } from '@playwright/test';
import { login } from './supportFunctions.spec';
import { listView, lookForSection, countRows } from './supportFunctions.spec';

export async function modifySalesOrderFunc(page: any, itemId: string, salesOrderId: string, section: string): Promise<void> {
    const iframe = page.frameLocator('iframe[title="undefined"]');
    await lookForSection(section, page, iframe);
    await listView(iframe);
    await iframe.locator('.ms-SearchBox-iconContainer').click();
    await iframe.getByPlaceholder('Search').fill(salesOrderId);
    await countRows(iframe);

    //await iframe.getByTitle('Open record "' + salesOrderId + '"').waitFor();
    await iframe.getByTitle('Open record "' + salesOrderId + '"').click();
    await iframe.getByRole('button', { name: 'General" / "' }).waitFor({ timeout: 5000 });
    const checkedSalesOrder = await iframe.locator('.title--DaOt1SlIHGgb2tatyyfP').innerText();
    const regex = /(\S+)\s(.)\s(\S+)/;
    const match = checkedSalesOrder.match(regex);
    const extractedId = match[1];
    expect(extractedId).toBe(salesOrderId);
    await iframe.getByLabel('Toggle focus mode').click();
    const firstLineItemId = await iframe.getByRole('combobox', { name: 'No.', exact: true }).inputValue();
    if (firstLineItemId == itemId) {
        await iframe.getByRole('combobox', { name: 'No.', exact: true }).click();
    } else {
        await iframe.getByRole('textbox', { name: itemId }).click();
        await iframe.getByRole('textbox', { name: 'Quantity', exact: true }).clear();
        await iframe.getByRole('textbox', { name: 'Quantity', exact: true }).fill('20');
        await iframe.getByRole('textbox', { name: 'Quantity', exact: true }).waitFor('attached', {timeout: 2000});
    }
    await iframe.getByRole('button', { name: 'Back' }).click();
}

test('Check Sales Order 2', async ({ page }) => {
    const itemId = '1136';
    const salesOrder = 'S-ORD101285';
    const salesOrderSection = 'Sales Orders';
    await login(page);
    await modifySalesOrderFunc(page, itemId, salesOrder, salesOrderSection);
    await page.waitForLoadState('networkidle');
    await page.close();
});