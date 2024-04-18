
export async function login(page: any) {
  await page.goto('http://bcsandboxfinal/BC/?tenant=default');
  await page.getByLabel('Nombre usuario:').click();
  await page.getByLabel('Nombre usuario:').fill('admin');
  await page.getByLabel('Nombre usuario:').press('Tab');
  await page.getByLabel('Contraseña:').fill('P@ssw0rd');
  await page.getByLabel('Contraseña:').press('Enter');
  await page.waitForLoadState();
  //await page.getByText('Dynamics 365 Business Central').waitFor();
}

export async function listView(iframe: any) {
  await iframe.getByTitle('View layout options').waitFor({timeout: 2000});
  await iframe.getByTitle('View layout options').click();
  await iframe.getByTitle('Show as list').click();
}

export async function lookForSection(section: string, page: any, iframe: any) {
  await page.getByLabel('Search').click();
  await iframe.getByRole('textbox', { name: 'Tell me what you want to do' }).fill(section);
  await iframe.locator('.ms-itemName--fz_QEQj5YbI2XSdfnCIM.thm-font-size-small.thm-color--brand-primary_mintint_45--not_FCM').and(page.getByText(section, { exact: true })).click();
}

export async function timer(){
  let seconds = 0;
  const timer = setInterval(()=>{
      seconds++
  }, 1000)
}

export async function countRows(iframe: any) {
  const rows = await iframe.getByLabel('Sales Order List').locator('tbody');
  let countedRows = await rows.locator('tr').count();
  let seconds = 0;
  const timer = setInterval(()=>{
      seconds++
  }, 1000);

  const checkRows = async() => {
    while (countedRows > 10 && seconds < 10) {
      countedRows = rows.locator('tr').count();
      await new Promise(resolve => setTimeout(resolve,1));
    };
    clearInterval(timer);
  };
  await checkRows();

};