import {Page, FrameLocator} from "@playwright/test"

export class HomeIframePage{
    readonly page:Page;
    readonly frameLocator:FrameLocator;
    
    constructor(page:Page){
        this.page = page;
        this.frameLocator = page.frameLocator('iframe[title="undefined"]');
    }
}