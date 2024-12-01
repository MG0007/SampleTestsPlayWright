import { test, expect } from '@playwright/test';
import { locators } from '../locators';

test("Visit Framer home page and click 'Pricing'", async ({ page }) => {
    await page.goto(locators.homePage);
    await page.locator(locators.pricingPage).click();
    await expect(page.locator(locators.pricingPageTitle)).toHaveText('Pricing');
})

test("Does display '$' for products in Pricing page", async({page})=>{
    await page.goto(locators.homePage);
    await page.locator(locators.pricingPage).click();

    const priceTagAllTiles = await page.locator(locators.pricingPageTiles).allTextContents();

    priceTagAllTiles.forEach((priceTag)=>{
        expect(priceTag[0]).toEqual('$');
    })
})