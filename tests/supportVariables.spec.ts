export const awaitCustomerError = new Error('Timeout waiting for the customer to open');
export const awaitItemError = new Error('Timeout waiting for the item to open');
export const awaitSOToOpen = new Error('Timeout waiting for the sales order to open');
export const awaitHeaderError = new Error('Timeout waiting for the header of the page');
export const awaitIdCustomerError = new Error('Timeout waiting for the id of the customer');
export const awaitIdItemError = new Error('Timeout waiting for the id of the item');
export const awaitEmailAttachedError = new Error('Timeout waiting for the email to be attached');
export const awaitItemTableError = new Error('Timeout waiting for the item table to be visible');
export const awaitDataAttachedError = new Error('Timeout waiting for the item data to be attached');
export const awaitMainListError = new Error('Timeout waiting for the list page to open');

export const regexSalesOrderTitle = /(\S+)\s(.)\s(\S+)/;
export const timeoutValue = 5000;
export let seconds = 0;
export function setSeconds(value: number) {
    seconds = value
}
export let flag = true;
export function setFlag(value: boolean) {
    flag = value;
}
export let limitSeconds = 0
export function setLimitSeconds(value:number){
    limitSeconds = value
}