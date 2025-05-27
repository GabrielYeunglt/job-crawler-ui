import { By, WebDriver, WebElement } from "selenium-webdriver";
import { BasePage } from "../basePage";
import { LinkedinLoginPage } from "./linkedinLoginPage";

export class LinkedinHomePage extends BasePage {
    private signinButton: WebElement | null = null;
    protected override get url(): string {
        return "https://linkedin.com/"
    }
    override async runPageFlow(): Promise<void> {
        this.open();

        const isGuest = await this.checkSignInStatus();
        if (isGuest && this.signinButton) {
            await this.signinButton.click();
            const loginPage = new LinkedinLoginPage(this.driver, this.siteName);
            await loginPage.runPageFlow();
        }
    }
    async checkSignInStatus(): Promise<boolean> {
        try {
            this.signinButton = await this.waitForElement(
                By.xpath('.//a[@data-tracking-control-name="guest_homepage-basic_nav-header-signin"]'),
                3000
            );
            return true; // guest (sign-in button found)
        } catch (err) {
            // likely TimeoutError → user is signed in
            this.signinButton = null;
            return false;
        }
    }
}