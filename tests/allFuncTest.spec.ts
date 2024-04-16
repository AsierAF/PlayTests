import { test } from '@playwright/test';
import { createCustomerFunc } from './customerCreate.spec';
import { checkCustomerFunc } from './customerCheck.spec';
import { createSalesOrderFunc } from './salesOrderCreate.spec';
import { checkSalesOrderFunc } from './salesOrderCheck.spec';
import { createItemFunc } from './itemCreate.spec';
import { checkItemFunc } from './itemCheck.spec';

import { login } from './supportFunctions.spec';

test.describe('allTest', () => {
  let itemId: string;
  let customerId: string;
  let salesOrderId: string;
  const unitVolume = '99';
  const email = 'email@email.com';
  const documentName = 'salesorderpdf';
  const itemSection = 'Items';
  const customerSection = 'Customers';
  const salesOrderSection = 'Sales Orders';

  test.beforeEach('Open & Login', async ({ page }) => {
    await login(page);
  });

  test.afterEach('Wait & Close', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await page.close();
  });

  test('Create Item', async ({ page }) => {
    itemId = await createItemFunc(page, itemId, unitVolume, itemSection);
  });

  test('Check Item', async ({ page }) => {
    await checkItemFunc(page, itemId, unitVolume, itemSection);
  });

  test('Create Customer', async ({ page }) => {
    customerId = await createCustomerFunc(page, customerId, email, customerSection);
  });

  test('Check Customer', async ({ page }) => {
    await checkCustomerFunc(page, customerId, email, customerSection);
  });

  test('Create Sales Order', async ({ page }) => {
    salesOrderId = await createSalesOrderFunc(page, itemId, customerId, salesOrderId, documentName, salesOrderSection);
  });

  test('Check Sales Order', async ({ page }) => {
    await checkSalesOrderFunc(page, itemId, customerId, salesOrderId, documentName, salesOrderSection);
  });

});