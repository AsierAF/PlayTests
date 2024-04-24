import { awaitMainListError, timeoutValue } from "./supportVariables.spec";

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
    await iframe.getByTitle('View layout options').waitFor({ timeout: timeoutValue }).catch(() => {throw awaitMainListError;});
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
    }
  };
  await checkRows();
};

/*export async function countRows2(iframe: any) {
  const rows = await iframe.getByLabel('Sales Order List').locator('tbody');
  let countedRows = await rows.locator('tr').count();

  let timeoutReached = await countSeconds(5);

  while (countedRows > 10 || timeoutReached === false) {
    countedRows = await rows.locator('tr').count();
    console.log('Rows counted:', countedRows);
  }
}

/*export const countSeconds2 = (limitSeconds: number) => {
  return new Promise<boolean>((resolve) => {
    let seconds = 0;
    const count = () => {
      seconds++;
      if (seconds >= limitSeconds) {
        resolve(true);
      } else {
        setTimeout(count, 1000);
      }
    };
    setTimeout(count, 1000);
  });
}; 

export const countSeconds3 = (limitSeconds: number) => {
  return new Promise<boolean>((resolve) => {
    let seconds = 0;
    const intervalId = setInterval(() => {
      seconds++;
      if (seconds >= limitSeconds) {
        clearInterval(intervalId);
        resolve(true);
      }
    }, 1000);
  });
};*/


export async function modifyData(iframe: any) {
    let savingIconVisible = false;
    await iframe.getByRole('textbox', { name: 'Quantity', exact: true }).clear();
    await iframe.getByRole('textbox', { name: 'Quantity', exact: true }).fill('50');
    await iframe.getByRole('textbox', { name: 'Quantity', exact: true }).press('Tab');
    const savingText = await iframe.getByTitle('Your data is being saved...').innerText();
    if (savingText == 'Saving...') {
      savingIconVisible = true;
    } else {
      await modifyData(iframe);
    }
    let savedText = await iframe.getByTitle('Your data is saved now and the page can be closed.').isVisible();
    while(savingIconVisible && !savedText){
      savedText = await iframe.getByTitle('Your data is saved now and the page can be closed.').isVisible();
    }
}

