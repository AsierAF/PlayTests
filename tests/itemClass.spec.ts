import test from "node:test";

export class Item {
    private description: string;
    private no: string;
    private shelfNo: number;
    private unitVolume: number;
    private unitCost: number;
    private unitPrice: number;
    private vendorItemNo: number;

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
        unitCost = 0, unitPrice = 0, vendorItemNo = 0 }) {
        this.no = no;
        this.description = description;
        this.shelfNo = shelfNo;
        this.unitVolume = unitVolume;
        this.unitCost = unitCost;
        this.unitPrice = unitPrice;
        this.vendorItemNo = vendorItemNo;
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

    restoreData({ no = this.no , description = this.description , shelfNo = this.shelfNo, unitVolume = this.unitVolume,
        unitCost = this.unitCost, unitPrice = this.unitPrice, vendorItemNo = this.vendorItemNo }) {
        this.no = no;
        this.description = description;
        this.shelfNo = shelfNo;
        this.unitVolume = unitVolume;
        this.unitCost = unitCost;
        this.unitPrice = unitPrice;
        this.vendorItemNo = vendorItemNo;
    }

    deleteItem(){
        this.no = "";
        this.description = "";
        this.shelfNo = 0;
        this.unitVolume = 0;
        this.unitCost = 0;
        this.unitPrice = 0;
        this.vendorItemNo = 0;
    }
}

 


test('Class Item Test', async ({ }) => {
    function createItem() {
        //let it = new Item({ "description": "tut" })

        const it = new Item({
            no: "1010",
            description: "item precioso",
            shelfNo: 10,
            unitVolume: 20,
            unitCost: 30,
            unitPrice: 40,
            vendorItemNo: 50
        });

        it.setUnitCost = 12
        console.log(it.getUnitCost)

        it.restoreData({ "shelfNo": 3, "unitVolume": 4 })
        console.log(it.getUnitCost)
        console.log(it.getDescription)
        console.log(it.getShelfNo)
        console.log(it.getUnitVolume)

        it.deleteItem()
        console.log(it.getUnitCost)
        console.log(it.getDescription)
        console.log(it.getShelfNo)
        console.log(it.getUnitVolume)
    }
    createItem()
});