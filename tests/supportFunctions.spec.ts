import { errors } from "@playwright/test";


export const timeoutValue = 5;

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
    await iframe.getByTitle('View layout options').waitFor({ timeout: timeoutValue }).catch(() => {
      throw new Error('Timeout waiting for the list page to open');
    });
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

/*
export async function countRows(iframe: any) {
  const rows = await iframe.getByLabel('Sales Order List').locator('tbody');
  let countedRows = await rows.locator('tr').count();
  let seconds = 0;

  const countSeconds = () => {
    seconds++;
    if (seconds < 5) {
      setTimeout(countSeconds, 1000);
    }
  };

  const checkRows = async () => {
    countSeconds();
    while (countedRows > 0 && seconds < 5) {
      countedRows = await rows.locator('tr').count(); 
      console.log('sec: ', seconds)
      if (countedRows > 0) {
        continue;
      } else {
        break;
      }
    }
  };

  await checkRows();
};
*/

export async function countRows(iframe: any) {
  const rows = await iframe.getByLabel('Sales Order List').locator('tbody');
  let countedRows = await rows.locator('tr').count();
  let seconds = 0;
  let flag = true;

  const countSeconds = () => {
    seconds++;
    if (seconds >= 5) {
      flag = false;
    } else {
      setTimeout(countSeconds, 1000);
    }
  };

  const checkRows = async () => {
    countSeconds();
    while (countedRows > 10 && flag) {
      countedRows = await rows.locator('tr').count();
      if (countedRows > 10) {
        continue;
      } else {
        break;
      }
    }
  };
  await checkRows();
};
