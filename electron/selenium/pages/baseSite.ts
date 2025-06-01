import { WebDriver } from "selenium-webdriver";
import { BasePage } from "./basePage";
import { iSite } from "./iSite";
import { Job } from "../../models/job";

export abstract class BaseSite implements iSite {
    protected siteName: string;
    protected driver: WebDriver;
    protected pages: BasePage[];

    constructor(driver: WebDriver, siteName: string = 'generic', viewedJobs: Set<string> = new Set<string>) {
        this.driver = driver;
        this.siteName = siteName;
        this.pages = [];
    }

    async runPages(): Promise<void> {
        for (const page of this.pages) {
            await page.runPageFlow(); // ✅ sequential, each page is fully done
        }
    }

}