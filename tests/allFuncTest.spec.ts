import { test } from '@playwright/test';
import { createCustomerFunc } from './customerCreate.spec';
import { checkCustomerFunc } from './customerCheck.spec';
import { createSalesOrderFunc } from './salesOrderCreate.spec';
import { checkSalesOrderFunc } from './salesOrderCheck.spec';
import { createItemFunc } from './itemCreate.spec';
import { checkItemFunc } from './itemCheck.spec';

import { login } from './supportFunctions.spec';

test.describe('allTest',() => {
  let itemId: string;
  let customerId: string;
  let salesOrder: string;
  const unitVolume = '99';
  const email = 'email@email.com';
  const documentName = 'salesorderpdf';

  test.beforeEach('Open & Login',async({page}) => {
    await login(page);
  });

  test.afterEach('Wait & Close', async({page}) => {
    await page.waitForLoadState('networkidle');
    await page.close();
  });

  test('Create Item', async ({ page }) => {
    itemId = await createItemFunc(page, unitVolume)
  });

  test('Check Item', async ({ page }) => {
    await checkItemFunc(page, itemId, unitVolume);
  });

  test('Create Customer', async ({ page }) => {
    customerId = await createCustomerFunc(page, email);
  });

  test('Check Customer', async ({ page }) => {
    await checkCustomerFunc(page, customerId , email);
  });

  test('Create Sales Order', async ({ page }) => {
    salesOrder = await createSalesOrderFunc(page, itemId, customerId, documentName);
  });

  test('Check Sales Order', async ({ page }) => {
    await checkSalesOrderFunc(page, itemId, customerId, salesOrder ,documentName);
  });

});