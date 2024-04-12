

export async function login(page:any){
    await page.goto('http://bcsandboxfinal/BC/?tenant=default');
    await page.getByLabel('Nombre usuario:').click();
    await page.getByLabel('Nombre usuario:').fill('admin');
    await page.getByLabel('Nombre usuario:').press('Tab');
    await page.getByLabel('Contraseña:').fill('P@ssw0rd');
    await page.getByLabel('Contraseña:').press('Enter');
  } 