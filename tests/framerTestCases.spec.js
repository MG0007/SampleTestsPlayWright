import { test, expect } from '@playwright/test';
import { locators } from '../locators';

test("Visit Framer home page and click 'Pricing'", async ({ page }) => {
    await page.goto(locators.homePage.homePageUrl);
    await page.locator(locators.pricingPage.pricingPageUrl).click();
    await expect(page.locator(locators.pricingPage.pricingPageTitle)).toHaveText('Pricing');
})

test("Does display '$' for products in Pricing page", async ({ page }) => {
    await page.goto(locators.homePage.homePageUrl);
    await page.locator(locators.pricingPage.pricingPageUrl).click();

    const priceTagAllTiles = await page.locator(locators.pricingPage.pricingPageTiles).allTextContents();

    priceTagAllTiles.forEach((priceTag) => {
        expect(priceTag[0]).toEqual('$');
    })
})

test("Does contain 4 questions in the FAQ section from 'Pricing' page", async ({ page }) => {
    await page.goto(locators.homePage.homePageUrl);
    await page.locator(locators.pricingPage.pricingPageUrl).click();

    await page.getByText('FAQ').scrollIntoViewIfNeeded();

    const allQuestionsCount = await page.locator(locators.pricingPage.pricingPageQuestions).count();
    expect(allQuestionsCount).toEqual(locators.pricingPage.fqaNumberOfQuestions);
})

test("Does display 'visit' button on each card in the 'Many types of components to customize' section", async ({ page }) => {
    await page.goto(locators.homePage.homePageUrl)
    await page.locator(locators.componentsPage.componentsPageUrl).click();

    const countCardVisitButton = await page.locator(locators.componentsPage.componentsPageCardsVisitButtons).count();
    const cardCount = await page.locator(locators.componentsPage.componentsPageCard).count();
    const cardSmallCount = await page.locator(locators.componentsPage.componentsPageCardSmall).count();

    expect(cardCount + cardSmallCount).toEqual(countCardVisitButton);
})

test("Does display 'Sign up' button's color as 'rgb(255,82,79'", async ({ page }) => {
    await page.goto(locators.homePage.homePageUrl);
    await page.locator(locators.componentsPage.componentsPageUrl).click();

    await page.locator(locators.footerSection.footerSec).scrollIntoViewIfNeeded();

    const attributes = await page.locator(locators.footerSection.footerSignUpButton).evaluate((el) => getComputedStyle(el).background);

    const attrSplit = attributes.split(' ');

    const buttonColor = attrSplit[0] + attrSplit[1] + attrSplit[2];

    await expect(page.locator(locators.footerSection.footerSubscribeSection)
        .locator(locators.footerSection.footerSignUpButton)).toHaveText('Sign Up');
    expect(buttonColor).toBe(locators.componentsPage.componentsPageSignUpButton);
})

test("Does blur the background after clicking 'Get the app' button", async({page})=>{
    await page.goto(locators.homePage.homePageUrl);

    await page.locator(locators.homePage.homePageGetTheAppButton).click();

    const blur = await page.locator('#overlay div.framer-vrqh0x').count();
    expect(blur).toBe(1);
})

test("Does display the 'Updates' page after clicking the 'Update' button", async ({ page }) => {
    await page.goto(locators.homePage.homePageUrl);
    await page.locator(locators.updatesPage.updatesPageUrl).click();

    await expect(page.locator(locators.updatesPage.updatesPageTitle)).toHaveText('Updates')
})

test("Does display 'get the app' and 'watch video' one above the other on mobile", async ({ page }) => {
    await page.goto(locators.homePage.homePageUrl);
    await page.setViewportSize({ width: 400, height: 800 });

    const buttonsText = await page.locator(locators.homePage.homePageMobileAppVideoButtons).allTextContents();

    expect(buttonsText[0]).toBe('Get the App')
    expect(buttonsText[1]).toBe('Watch video')
})

test("Does display 3d animation after clicking on 'click to view in 3d' button", async({page}) =>{
    await page.goto(locators.homePage.homePageUrl);
    await page.setViewportSize({ width: 1920, height: 1080 });

    await page.locator(locators.homePage.homePage3DButton).scrollIntoViewIfNeeded();
    await page.locator(locators.homePage.homePage3DButton).click();

    const animation = await page.locator(locators.homePage.animation3D).count();

    expect(animation).toBe(1);
})
