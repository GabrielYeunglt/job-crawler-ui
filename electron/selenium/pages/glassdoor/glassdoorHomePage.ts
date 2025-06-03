import { By, Key } from "selenium-webdriver";
import { BasePage } from "../basePage";

export class GlassdoorHomePage extends BasePage {
    protected override get url(): string {
        return "https://www.glassdoor.ca/";
    }
    override async runPageFlow(): Promise<void> {
        try {
            await this.open();

            await this.open("https://www.glassdoor.ca/Job/index.htm");

            await this.enterSearchTerm('software');

            await this.sleep(2000);
        } catch (err) {
            console.error(`runPageFlow failed: ${err}`);
            throw err;
        }
    }

    async enterSearchTerm(term: string): Promise<void> {
        const searchBar = await this.waitForElement(By.xpath(".//input[@id='searchBar-jobTitle']"), 30000);
        await searchBar.sendKeys(term);
        const locationBar = await this.waitForElement(By.xpath(".//input[@id='searchBar-location']"), 30000);
        await locationBar.sendKeys('Toronto, ON (Canada)', Key.RETURN);
    }
}