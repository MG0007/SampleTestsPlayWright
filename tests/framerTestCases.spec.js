import { test, expect } from '@playwright/test';
import { locators } from '../locators';

test("Visit Framer home page and click 'Pricing'", async ({ page }) => {
    await page.goto(locators.homePage);
    await page.locator(locators.pricingPage).click();
    await expect(page.locator(locators.pricingPageTitle)).toHaveText('Pricing');
})

test("Does display '$' for products in Pricing page", async ({ page }) => {
    await page.goto(locators.homePage);
    await page.locator(locators.pricingPage).click();

    const priceTagAllTiles = await page.locator(locators.pricingPageTiles).allTextContents();

    priceTagAllTiles.forEach((priceTag) => {
        expect(priceTag[0]).toEqual('$');
    })
})

test("Does contain 4 questions in the FAQ section from 'Pricing' page", async ({ page }) => {
    await page.goto(locators.homePage);
    await page.locator(locators.pricingPage).click();

    await page.getByText('FAQ').scrollIntoViewIfNeeded();

    const allQuestionsCount = await page.locator(locators.pricingPageQuestions).count();
    expect(allQuestionsCount).toEqual(locators.fqaNumberOfQuestions);
})

test("Does display 'visit' button on each card in the 'Many types of components to customize' section", async ({ page }) => {
    await page.goto(locators.homePage)
    await page.locator(locators.componentsPage).click();

    const countCardVisitButton = await page.locator(locators.componentsPageCardsVisitButtons).count();
    const cardCount = await page.locator(locators.componentsPageCard).count();
    const cardSmallCount = await page.locator(locators.componentsPageCardSmall).count();

    expect(cardCount + cardSmallCount).toEqual(countCardVisitButton);
})

test("Does display 'Sign up' button's color as 'rgb(255,82,79'", async ({ page }) => {
    await page.goto(locators.homePage);
    await page.locator(locators.componentsPage).click();

    await page.locator(locators.footerSection).scrollIntoViewIfNeeded();

    const attributes = await page.locator(locators.footerSignUpButton).evaluate((el) => getComputedStyle(el).background);

    const attrSplit = attributes.split(' ');

    const buttonColor = attrSplit[0] + attrSplit[1] + attrSplit[2];

    await expect(page.locator(locators.footerSubscribeSection)
        .locator(locators.footerSignUpButton)).toHaveText('Sign Up');
    expect(buttonColor).toBe(locators.componentsPageSignUpButton);
})