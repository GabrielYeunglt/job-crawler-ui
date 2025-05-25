import { By, WebElement } from "selenium-webdriver";
import { Job } from "../../../models/job";
import { BaseJobListPage } from "../baseJobListPage";

export class IndeedJobListPage extends BaseJobListPage {
    override async extractJobs(): Promise<void> {
        const jobElementList = await this.getJobElementList();
        for (const jobElement of jobElementList) {
            await this.scrollTo(jobElement);
            await this.sleep(300);
        }
    }
    protected override get url(): string {
        return "https://ca.indeed.com/jobs?q=software&l=Toronto%2C+ON&fromage=1&radius=25";
    }
    override async runPageFlow(): Promise<void> {
        await this.open();

        await this.extractJobs();
    }
    async getJobElementList(): Promise<WebElement[]> {
        const jobListElement = await this.waitForElements(By.xpath('.//div[@data-testid="slider_container"]'));
        return jobListElement;
    }
}