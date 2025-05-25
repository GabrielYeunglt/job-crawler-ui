import { WebDriver } from "selenium-webdriver";
import { BaseSite } from "../baseSite";
import { IndeedHomePage } from "./indeedHomePage";
import { IndeedJobListPage } from "./indeedJobListPage";

export class IndeedSite extends BaseSite {
    constructor(driver: WebDriver) {
        super(driver);
        this.pages.push(new IndeedHomePage(driver));
        // this.pages.push(new IndeedJobListPage(driver));
    }
}