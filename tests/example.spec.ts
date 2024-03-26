// @ts-nocheck
const { test, expect } = require('@playwright/test');

test('Validate user login credential', async ({ page }) => {
  await page.goto('https://www.amazon.com/');
  // wait for loding the page
  await page.waitForLoadState();
  // data-nav-role="signin"
  // click on button which have class as signin
  await page.click('[data-nav-role="signin"]');
  // wait for email input field
  await page.waitForSelector('#ap_email');
  // enter email address
  await page.fill('#ap_email', '+917778045343');
  // click on continue button
  await page.click('#continue');
  // wait for password field
  await page.waitForSelector('#ap_password');
  // enter password
  await page.fill('#ap_password', 'Sagar@1234567');
  // click on login button
  await page.click('#signInSubmit');
  // wait for page to load
  await page.waitForLoadState();
  await page.waitForSelector('#nav-link-accountList-nav-line-1');
  // check if login success by checking user name in header
  const text = await page.innerText('#nav-link-accountList-nav-line-1');
  expect(text).toBe('Hello, sagar');
});

test('Search for product', async ({ page }) => {
  await page.goto('https://www.amazon.in/');
  // wait for loding the page
  await page.waitForLoadState();
  // enter search keyword
  await page.fill('#twotabsearchtextbox', 'iphone 15 plus');
  // click on search button
  await page.click('#nav-search-submit-button');
  // wait for page to load
  await page.waitForLoadState();
  // check if search result found
  await page.waitForSelector('span.a-size-medium-plus.a-color-base.a-text-bold');
  const text = await page.innerText('.a-size-medium-plus.a-color-base.a-text-bold');
  expect(text).toBe('Results');
})

test('Search for product and return no result', async ({ page }) => {
  await page.goto('https://www.amazon.in/');
  // wait for loding the page
  await page.waitForLoadState();
  // enter search keyword
  await page.fill('#twotabsearchtextbox', 'hdkhwakjd+ldkhakjwhd+dhakjwhda');
  // click on search button
  await page.click('#nav-search-submit-button');
  // wait for page to load
  await page.waitForLoadState();
  // check if search result found
  await page.waitForSelector('span.a-size-medium.a-color-base');
  const text = await page.innerText('.a-size-medium.a-color-base');
  expect(text).toBe('No results for ');
})