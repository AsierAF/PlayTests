export const awaitCustomerError = new Error('Timeout waiting for the customer to open');
export const awaitItemError = new Error('Timeout waiting for the item to open');
export const awaitSOToOpenError = new Error('Timeout waiting for the sales order to open');
export const awaitHeaderError = new Error('Timeout waiting for the header of the page');
export const awaitIdCustomerError = new Error('Timeout waiting for the id of the customer');
export const awaitIdItemError = new Error('Timeout waiting for the id of the item');
export const awaitEmailAttachedError = new Error('Timeout waiting for the email to be attached');
export const awaitItemTableError = new Error('Timeout waiting for the item table to be visible');
export const awaitDataAttachedError = new Error('Timeout waiting for the item data to be attached');
export const awaitMainListError = new Error('Timeout waiting for the list page to open');
export const awaitSavingText = new Error('Timeout waiting for the saving text to appear');
export const awaitSavedText = new Error('Timeout waiting for the saved text to appear');

export const regexSalesOrderTitle = /(\S+)\s(.)\s(\S+)/;
export const timeoutValue = 5000;

