import { By, WebDriver, WebElement } from "selenium-webdriver";
import { Job } from "../../../models/job";
import { BaseJobListPage } from "../baseJobListPage";

export class IndeedJobListPage extends BaseJobListPage {
    override getJobIdFromJobElement(jobElement: WebElement): Promise<string> {
        return jobElement.getAttribute('data-jk');
    }
    constructor(driver: WebDriver, siteName: string, viewedJobs: Set<string>) {
        super(driver, siteName, viewedJobs);
        this.jobListXPath = './/div[@data-testid="slider_container"]';
        this.paginationXPath = './/nav[@aria-label="pagination"]/ul/li/a[@aria-label="%s"]';
    }
    override async extractJobDetail(jobElement: WebElement): Promise<Job> {
        await jobElement.click();
        const job: Job = new Job({
            site: "Indeed",
            url: await (await this.waitForNestedElement(jobElement, By.xpath(".//a"))).getAttribute("href"),
            job_id: await this.getJobIdFromJobElement(jobElement),
            title: (await (await this.waitForNestedElement(jobElement, By.xpath(".//a[contains(@class, 'jcs-JobTitle')]"))).getText()).trim(),
            company: (await (await this.waitForNestedElement(jobElement, By.xpath(".//span[@data-testid='company-name']"))).getText()).trim(),
            location: (await (await this.waitForNestedElement(jobElement, By.xpath(".//div[@data-testid='text-location']"))).getText()).trim(),
            description: (await (await this.waitForElement(By.xpath(".//div[contains(@id, 'jobDescriptionText')]"))).getText()).trim()
        })
        return job;
    }
    protected override get url(): string {
        return "https://ca.indeed.com/jobs?q=software&l=Toronto%2C+ON&fromage=1&radius=25";
    }
    override getJobIdFromUrl(url: string): string {
        throw 'Not implemented';
    }
}