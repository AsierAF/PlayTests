import { test } from '@playwright/test';
import { lookForSection, listView, login } from '../tests/supportFunctions.spec';
import { awaitHeaderError, awaitIdItemError, timeoutValue, awaitItemError } from '../tests/supportVariables.spec';

export class Item {
    private description: string;
    private no: string;
    private shelfNo: number;
    private unitVolume: number;
    private unitCost: number;
    private unitPrice: number;
    private vendorItemNo: number;
    private quantity: number;
    private taxGroupCode: string;
    private page: any
    private section = 'Items';
    private iframe: any
    private initialMapData: Map<string, any>


    private async reachItem(no: string) {
        await lookForSection(this.section, this.page, this.iframe);
        await listView(this.iframe);
        await this.iframe.locator('.ms-SearchBox').click();
        await this.iframe.getByPlaceholder('Search').fill(no);
        await this.iframe.getByTitle('Open record "' + no + '"').waitFor({ timeout: timeoutValue }).catch(() => { throw awaitItemError; });
        await this.iframe.getByTitle('Open record "' + no + '"').click();
    }

    constructor({ no = "", description = "", shelfNo = 0, unitVolume = 0,
        unitCost = 0, unitPrice = 0, vendorItemNo = 0, quantity = 0, taxGroupCode = "" }, page: any) {
        this.no = no;
        this.description = description;
        this.shelfNo = shelfNo;
        this.unitVolume = unitVolume;
        this.unitCost = unitCost;
        this.unitPrice = unitPrice;
        this.vendorItemNo = vendorItemNo;
        this.quantity = quantity;
        this.taxGroupCode = taxGroupCode;
        this.page = page;
        this.iframe = page.frameLocator('iframe[title="undefined"]')
        this.initialMapData = new Map<string, any>();
        this.initialMapData
            .set('no', this.no)
            .set('description', this.description)
            .set('shelfNo', this.shelfNo)
            .set('unitVolume', this.unitVolume)
            .set('unitCost', this.unitCost)
            .set('unitPrice', this.unitPrice)
            .set('vendorItemNo', this.vendorItemNo)
            .set('quantity', this.quantity)
            .set('taxGroupCode', this.taxGroupCode);
    }

    async createItem() {
        try {
            
            await lookForSection(this.section, this.page, this.iframe);
            await this.iframe.getByRole('button', { name: 'New', exact: true }).click();
            await this.iframe.getByRole('heading', { name: 'Select a template for a new' }).waitFor({ timeout: timeoutValue }).catch(() => { throw awaitHeaderError; });
            await this.iframe.getByRole('button', { name: 'OK' }).click();
            await this.iframe.locator('.title--DaOt1SlIHGgb2tatyyfP').waitFor({ timeout: timeoutValue }).catch(() => { throw awaitIdItemError; });
            this.no = await this.iframe.locator('.title--DaOt1SlIHGgb2tatyyfP').innerText();
            await this.iframe.getByRole('textbox', { name: 'Description' }).fill(this.description);
            await this.iframe.getByLabel('Unit Volume').fill(this.unitVolume.toString());
            await this.iframe.getByRole('button', { name: 'Back' }).click();
        } catch (error) {
            throw error;
        }
    }



    async deleteItemById(no: string) {
        try {
            await this.reachItem(no)
            await this.iframe.getByRole('button', { name: 'Delete the information' }).waitFor({ timeout: timeoutValue }).catch(() => { throw awaitItemError });
            await this.iframe.getByRole('button', { name: 'Delete the information' }).click();
            await this.iframe.getByRole('button', { name: 'Yes' }).click();
        } catch (error) {
            throw error;
        }
    }

    async deleteCurrentItem() {
        try {
            await this.reachItem(this.no)
            await this.iframe.getByRole('button', { name: 'Delete the information' }).waitFor({ timeout: timeoutValue }).catch(() => { throw awaitItemError });
            await this.iframe.getByRole('button', { name: 'Delete the information' }).click();
            await this.iframe.getByRole('button', { name: 'Yes' }).click();
        } catch (error) {
            throw error;
        }
    }

    async updateMapData({ no = "", description = "", shelfNo = 0, unitVolume = 0,
        unitCost = 0, unitPrice = 0, vendorItemNo = 0, quantity = 0, taxGroupCode = "" }) {
        const newMapData = new Map<string, any>()
        newMapData
            .set('no', no)
            .set('description', description)
            .set('shelfNo', shelfNo)
            .set('unitVolume', unitVolume)
            .set('unitCost', unitCost)
            .set('unitPrice', unitPrice)
            .set('vendorItemNo', vendorItemNo)
            .set('quantity', quantity)
            .set('taxGroupCode', taxGroupCode);

        for (const [key, value] of newMapData.entries()) {
            const initialValue = this.initialMapData.get(key);
            const updatedValue = newMapData.get(key)
            if ((updatedValue !== "" && updatedValue !== 0) && initialValue != updatedValue) {
                await this.updateItemData(key, value);
            }
        }
    }

    async updateItemData(key: string, value: any) {
        await this.reachItem(this.no)
        switch (key) {
            case 'no':
                //Aqui habría que añadir una condicion para comprobar que el numero introducido es valido
                
                break;
            case 'description':
                break;
            case 'shelfNo':
                break;
            case 'unitVolume':
                break;
            case 'unitCost':
                break;
            case 'unitPrice':
                break;
            case 'vendorItemNo':
                break;
            case 'quantity':
                break;
            case 'taxGroupCode':
                break;
        }
    }

    get getNo() { return this.no }

    set setNo(value: string) { this.no = value; }

    get getDescription() { return this.description }

    set setDescription(value: string) { this.description = value }

    get getShelfNo() { return this.shelfNo; }

    set setShelfNo(value: number) { this.shelfNo = value; }

    get getUnitVolume() { return this.unitVolume; }

    set setUnitVolume(value: number) { this.unitVolume = value; }

    get getUnitCost() { return this.unitCost; }

    set setUnitCost(value: number) { this.unitCost = value; }

    get getUnitPrice() { return this.unitPrice }

    set setUnitPrice(value: number) { this.unitPrice = value; }

    get getVendorItemNo() { return this.vendorItemNo; }

    set setvendorItemNo(value: number) { this.vendorItemNo = value; }

    get getQuantity() { return this.quantity; }

    set setQuantity(value: number) { this.quantity = value; }

    get getTaxGroupCode() { return this.taxGroupCode; }

    set setTaxGroupCode(value: string) { this.taxGroupCode = value; }

    restoreDataItem({ no = this.no, description = this.description, shelfNo = this.shelfNo, unitVolume = this.unitVolume,
        unitCost = this.unitCost, unitPrice = this.unitPrice, vendorItemNo = this.vendorItemNo, quantity = this.quantity, taxGroupCode = this.taxGroupCode }) {
        this.no = no;
        this.description = description;
        this.shelfNo = shelfNo;
        this.unitVolume = unitVolume;
        this.unitCost = unitCost;
        this.unitPrice = unitPrice;
        this.vendorItemNo = vendorItemNo;
        this.quantity = quantity;
        this.taxGroupCode = taxGroupCode;
    }
}







test.describe('allTest', () => {
 
  test.beforeEach('Open & Login', async ({ page }) => {
    await login(page);
  });

  test.afterEach('Wait & Close', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await page.close();
  });

  test('Class Item Test', async ({ page }) => {

    const it = new Item({
        description: "item precioso",
        shelfNo: 10,
        unitVolume: 20,
        unitCost: 30,
        unitPrice: 40,
        vendorItemNo: 50
    }, page);

    await it.deleteItemById('1224')
    console.log()
});

});