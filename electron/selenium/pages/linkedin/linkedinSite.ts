import { WebDriver } from "selenium-webdriver";
import { BaseSite } from "../baseSite";
import { LinkedinHomePage } from "./linkedinHomePage";
import { LinkedinJobListPage } from "./linkedinJobListPage";

export class LinkedinSite extends BaseSite {
    constructor(driver: WebDriver, siteName: string = 'generic') {
        super(driver, siteName);
        this.pages.push(new LinkedinHomePage(driver));
        this.pages.push(new LinkedinJobListPage(driver, siteName));
    }
}