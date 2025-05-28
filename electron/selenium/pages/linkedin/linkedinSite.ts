import { WebDriver } from "selenium-webdriver";
import { BaseSite } from "../baseSite";
import { LinkedinHomePage } from "./linkedinHomePage";
import { LinkedinJobListPage } from "./linkedinJobListPage";
import { Job } from "../../../models/job";

export class LinkedinSite extends BaseSite {
    constructor(driver: WebDriver, siteName: string = 'generic', viewedJobs: Set<string> = new Set<string>) {
        super(driver, siteName, viewedJobs);
        this.pages.push(new LinkedinHomePage(driver));
        this.pages.push(new LinkedinJobListPage(driver, siteName, this.viewedJobs));
    }
}