import { awaitMainListError, timeoutValue, flag, setFlagFalse, setFlagTrue} from "./supportVariables.spec";

export async function login(page: any) {
  await page.goto('http://bcsandboxfinal/BC/?tenant=default');
  await page.getByLabel('Nombre usuario:').click();
  await page.getByLabel('Nombre usuario:').fill('admin');
  await page.getByLabel('Nombre usuario:').press('Tab');
  await page.getByLabel('Contraseña:').fill('P@ssw0rd');
  await page.getByLabel('Contraseña:').press('Enter');
  await page.waitForLoadState();
}

export async function listView(iframe: any) {
  try {
    await iframe.getByTitle('View layout options').waitFor({ timeout: timeoutValue }).catch(() => { throw awaitMainListError; });
    await iframe.getByTitle('View layout options').click();
    await iframe.getByTitle('Show as list').click();
  } catch (error) {
    throw error;
  }
}

export async function lookForSection(section: string, page: any, iframe: any) {
  await page.getByLabel('Search').click();
  await iframe.getByRole('textbox', { name: 'Tell me what you want to do' }).fill(section);
  await iframe.locator('.ms-itemName--fz_QEQj5YbI2XSdfnCIM.thm-font-size-small.thm-color--brand-primary_mintint_45--not_FCM').and(page.getByText(section, { exact: true })).click();
}

export function timer(limitSeconds: number) {
  const limit = limitSeconds * 1000;
  setTimeout(setFlagFalse, limit);
};


export async function countRows(iframe: any) {
  const rows = await iframe.getByLabel('Sales Order List').locator('tbody');
  let countedRows = await rows.locator('tr').count();
  async function checkRows() {
    timer(4);
    while (countedRows > 10 && flag) {
      countedRows = await rows.locator('tr').count();
    }
  }
  await checkRows();
};

export async function modifyData(iframe: any) {
  async function checkForSaving() {
    setFlagTrue();
    timer(8)
    await iframe.getByRole('textbox', { name: 'Quantity', exact: true }).clear();
    await iframe.getByRole('textbox', { name: 'Quantity', exact: true }).fill('30');
    await iframe.getByRole('textbox', { name: 'Quantity', exact: true }).press('Tab');
    const savingText = await iframe.getByTitle('Your data is being saved...').innerText();
    if (savingText == 'Saving...') {
      let savedText = await iframe.getByTitle('Your data is saved now and the page can be closed.').isVisible();
      while (!savedText && flag) {
        savedText = await iframe.getByTitle('Your data is saved now and the page can be closed.').isVisible();
      }
    } 
  }
  await checkForSaving();
}

