import { WebDriver } from "selenium-webdriver";
import { BasePage } from "./basePage";
import { iSite } from "./iSite";

export abstract class BaseSite implements iSite {
    protected driver: WebDriver;
    protected pages: BasePage[] = [];

    constructor(driver: WebDriver) {
        this.driver = driver;
    }

    async runPages(): Promise<void> {
        for (const page of this.pages) {
            await page.runPageFlow(); // ✅ sequential, each page is fully done
        }
    }

}