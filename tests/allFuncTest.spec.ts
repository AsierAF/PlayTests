import { test } from '@playwright/test';
import { createCustomerFunc } from './customerCreate.spec';
import { checkCustomerFunc } from './customerCheck.spec';
import { createSalesOrderFunc } from './salesOrderCreate.spec';
import { checkSalesOrderFunc } from './salesOrderCheck.spec';
import { createItemFunc } from './itemCreate.spec';
import { checkItemFunc } from './itemCheck.spec';
import { login } from './supportFunctions.spec';
import { Item } from '../classes/item.class';

test.describe('allTest', () => {
  const itemData = new Item({
    description: "claseItem",
    shelfNo: 10,
    unitVolume: 20,
    unitCost: 30,
    unitPrice: 40,
    vendorItemNo: 50
  })

  let itemId: string;
  let customerId: string;
  let salesOrderId: string;
  const unitVolume = '99';
  const email = 'email@email.com';
  const documentName = 'salesorderpdf';
  const itemSection = 'Items';
  const customerSection = 'Customers';
  const salesOrderSection = 'Sales Orders';
  const quantity = '10';
  const unitPrice = '150';
  const taxGroup = 'LABOR';
  //const frLoc = 'iframe[title="undefined"]';

  test.beforeEach('Open & Login', async ({ page }) => {
    await login(page);
  });

  test.afterEach('Wait & Close', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await page.close();
  });

  test('Create Item', async ({ page }) => {
    itemId = await createItemFunc(page, itemId, itemData.getUnitVolume.toString(), itemSection);
    itemData.setNo = itemId
    console.log('Clase Item')
    console.log('No: ', itemData.getNo)
    console.log('Descripcion: ',  itemData.getDescription)
    console.log('Unit Volume: ', itemData.getUnitVolume)
    console.log('Shelf No: ', itemData.getShelfNo)
    console.log('Unit Cost: ', itemData.getUnitCost)
  });

  test('Check Item', async ({ page }) => {
    await checkItemFunc(page, itemData.getNo, itemData.getUnitVolume.toString(), itemSection);
    console.log('Clase Item Check')
    console.log('No: ', itemData.getNo)
    console.log('Descripcion: ',  itemData.getDescription)
    console.log('Unit Volume: ', itemData.getUnitVolume)
    console.log('Shelf No: ', itemData.getShelfNo)
    console.log('Unit Cost: ', itemData.getUnitCost)
  });

  test('Create Customer', async ({ page }) => {
    customerId = await createCustomerFunc(page, customerId, email, customerSection);
  });

  test('Check Customer', async ({ page }) => {
    await checkCustomerFunc(page, customerId, email, customerSection);
  });

  test('Create Sales Order', async ({ page }) => {
    salesOrderId = await createSalesOrderFunc(page, itemId, customerId, salesOrderId, documentName, quantity, unitPrice, taxGroup, salesOrderSection);
  });

  test('Check Sales Order', async ({ page }) => {
    await checkSalesOrderFunc(page, itemId, customerId, salesOrderId, documentName, salesOrderSection);
  });

});