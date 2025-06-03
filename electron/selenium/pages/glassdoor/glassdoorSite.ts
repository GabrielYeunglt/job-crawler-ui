import { WebDriver } from "selenium-webdriver";
import { BaseSite } from "../baseSite";
import { GlassdoorHomePage } from "./glassdoorHomePage";
import { GlassdoorJobListPage } from "./glassdoorJobListPage";

export class GlassdoorSite extends BaseSite {
    constructor(driver: WebDriver, siteName: string = 'generic', viewedJobs: Set<string> = new Set<string>()) {
        super(driver, siteName);
        this.pages.push(new GlassdoorHomePage(driver));
        this.pages.push(new GlassdoorJobListPage(driver, siteName, viewedJobs));
    }
}