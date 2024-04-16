import { test, expect } from '@playwright/test';

export async function login(page:any){
    await page.goto('http://bcsandboxfinal/BC/?tenant=default');
    await page.getByLabel('Nombre usuario:').click();
    await page.getByLabel('Nombre usuario:').fill('admin');
    await page.getByLabel('Nombre usuario:').press('Tab');
    await page.getByLabel('Contraseña:').fill('P@ssw0rd');
    await page.getByLabel('Contraseña:').press('Enter');
    await expect(page.getByText('Dynamics 365 Business Central')).toBeVisible();
}

export async function listView(iframe: any){
  await iframe.getByLabel('', { exact: true }).click();
  await iframe.getByLabel('List').click();
}

export async function lookForSection(section: string, page: any, iframe: any) {
  await page.getByLabel('Search').click();
  await iframe.getByRole('textbox', { name: 'Tell me what you want to do' }).fill(section);
  await iframe.locator('#GroupedListSection335').getByText(section, { exact: true }).click();
}