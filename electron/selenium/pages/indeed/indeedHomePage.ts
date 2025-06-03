import { By } from "selenium-webdriver";
import { BasePage } from "../basePage";

export class IndeedHomePage extends BasePage {
    protected override get url(): string {
        return "https://ca.indeed.com/";
    }
    override async runPageFlow(): Promise<void> {
        try {
            await this.open();

            await this.enterSearchTerm('software');

            await this.clickFindJobs();

            await this.sleep(2000);
        } catch (err) {
            console.error(`runPageFlow failed: ${err}`);
            throw err;
        }
    }

    async enterSearchTerm(term: string): Promise<void> {
        const searchBar = await this.waitForElement(By.xpath(".//input[@id='text-input-what']"), 30000);
        await searchBar.sendKeys(term);
    }

    async clickFindJobs(): Promise<void> {
        const submit = await this.waitForElement(By.xpath(".//button[@type='submit']"))
        await submit.click();
    }
}