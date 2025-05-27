import { By, WebDriver, WebElement } from "selenium-webdriver";
import { Job } from "../../../models/job";
import { BaseJobListPage } from "../baseJobListPage";

export class IndeedJobListPage extends BaseJobListPage {
    constructor(driver: WebDriver, siteName: string) {
        super(driver, siteName);
        this.jobListXPath = './/div[@data-testid="slider_container"]';
    }
    override async extractJobDetail(jobElement: WebElement): Promise<Job> {
        await jobElement.click();
        const job: Job = new Job({
            site: "Indeed",
            url: await (await this.waitForElement(By.xpath(".//a"))).getAttribute("href"),
            id: this.getJobIdFromUrl(this.url),
            title: (await (await this.waitForElement(By.xpath(".//a[contains(@class, 'jcs-JobTitle')]"))).getText()).trim(),
            company: (await (await this.waitForElement(By.xpath(".//span[@data-testid='company-name']"))).getText()).trim(),
            location: (await (await this.waitForElement(By.xpath(".//div[@data-testid='text-location']"))).getText()).trim(),
            description: (await (await this.waitForElement(By.xpath(".//div[contains(@id, 'jobDescriptionText')]"))).getText()).trim()
        })
        return job;
    }
    protected override get url(): string {
        return "https://ca.indeed.com/jobs?q=software&l=Toronto%2C+ON&fromage=1&radius=25";
    }
    override getJobIdFromUrl(url: string): string {
        try {
            const uri = new URL(url);
            const queryParams = new URLSearchParams(uri.search);
            console.log(uri);
            console.log(queryParams);
            return queryParams.get('vjk') ?? '';
        } catch (err) {
            throw new Error(`Invalid URL: ${err}`);
        }
    }
}