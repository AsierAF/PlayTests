import { test } from '@playwright/test';
import { lookForSection, listView } from '../tests/supportFunctions.spec';
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
    private page:any
    private section = 'Items';

    /*constructor(no: string, description: string, shelfNo: number, unitVolume: number,
         unitCost: number, unitPrice: number, vendorItemNo: number) {
         this.no = no;
         this.description = description;
         this.shelfNo = shelfNo;
         this.unitVolume = unitVolume;
         this.unitCost = unitCost;
         this.unitPrice = unitPrice;
         this.vendorItemNo = vendorItemNo;
     }*/

    constructor({ no = "", description = "", shelfNo = 0, unitVolume = 0,
        unitCost = 0, unitPrice = 0, vendorItemNo = 0, quantity = 0, taxGroupCode = "" }, page:any) {
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
    }

    private async login() {
        await this.page.goto('http://bcsandboxfinal/BC/?tenant=default');
        await this.page.getByLabel('Nombre usuario:').click();
        await this.page.getByLabel('Nombre usuario:').fill('admin');
        await this.page.getByLabel('Nombre usuario:').press('Tab');
        await this.page.getByLabel('Contraseña:').fill('P@ssw0rd');
        await this.page.getByLabel('Contraseña:').press('Enter');
        await this.page.waitForLoadState();
    }

    async createItem() {
        try {
            await this.login()
            const iframe = this.page.frameLocator('iframe[title="undefined"]');
            await lookForSection(this.section, this.page, iframe);
            await iframe.getByRole('button', { name: 'New', exact: true }).click();
            await iframe.getByRole('heading', { name: 'Select a template for a new' }).waitFor({ timeout: timeoutValue }).catch(() => { throw awaitHeaderError; });
            await iframe.getByRole('button', { name: 'OK' }).click();
            await iframe.locator('.title--DaOt1SlIHGgb2tatyyfP').waitFor({ timeout: timeoutValue }).catch(() => { throw awaitIdItemError; });
            this.no = await iframe.locator('.title--DaOt1SlIHGgb2tatyyfP').innerText();
            await iframe.getByRole('textbox', { name: 'Description' }).fill(this.description);
            await iframe.getByLabel('Unit Volume').fill(this.unitVolume.toString());
            await iframe.getByRole('button', { name: 'Back' }).click();
        } catch (error) {
            throw error;
        }
    }

    private async reachItem(no: string, page: any, section: string, iframe: any) {
        await lookForSection(section, page, iframe);
        await listView(iframe);
        await iframe.locator('.ms-SearchBox').click();
        await iframe.getByPlaceholder('Search').fill(no);
        await iframe.getByTitle('Open record "' + no + '"').waitFor({ timeout: timeoutValue }).catch(() => { throw awaitItemError; });
        await iframe.getByTitle('Open record "' + no + '"').click();
    }

    async deleteItem(no: string, page: any, section: string) {
        try {
            const iframe = page.frameLocator('iframe[title="undefined"]');
            this.reachItem(no,page,section,iframe)
            await iframe.getByRole('button', { name: 'Delete the information' }).click();
            await iframe.getByRole('button', { name: 'Yes' }).click();
        } catch (error) {
            throw error;
        }
    }


    get getNo() {
        return this.no
    }

    set setNo(value: string) {
        this.no = value;
    }

    get getDescription() {
        return this.description
    }

    set setDescription(value: string) {
        this.description = value
    }

    get getShelfNo() {
        return this.shelfNo;
    }

    set setShelfNo(value: number) {
        this.shelfNo = value;
    }

    get getUnitVolume() {
        return this.unitVolume;
    }

    set setUnitVolume(value: number) {
        this.unitVolume = value;
    }

    get getUnitCost() {
        return this.unitCost;
    }

    set setUnitCost(value: number) {
        this.unitCost = value;
    }

    get getUnitPrice() {
        return this.unitPrice
    }

    set setUnitPrice(value: number) {
        this.unitPrice = value;
    }

    get getVendorItemNo() {
        return this.vendorItemNo;
    }

    set setvendorItemNo(value: number) {
        this.vendorItemNo = value;
    }

    get getQuantity() {
        return this.quantity;
    }

    set setQuantity(value: number) {
        this.quantity = value;
    }

    get getTaxGroupCode() {
        return this.taxGroupCode;
    }

    set setTaxGroupCode(value: string) {
        this.taxGroupCode = value;
    }

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




test('Class Item Test', async ({ page }) => {
    
    const it = new Item({
        no: "1010",
        description: "item precioso",
        shelfNo: 10,
        unitVolume: 20,
        unitCost: 30,
        unitPrice: 40,
        vendorItemNo: 50
    }, page);

    await it.createItem()
});