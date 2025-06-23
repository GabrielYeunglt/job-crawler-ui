import { By, WebDriver, WebElement } from "selenium-webdriver";
import { Job } from "../../../models/job";
import { BaseJobListPage } from "../baseJobListPage";

export class GlassdoorJobListPage extends BaseJobListPage {
    constructor(driver: WebDriver, siteName: string, viewedJobs: Set<string>) {
        super(driver, siteName, viewedJobs);
        this.jobListXPath = './/ul[@aria-label="Jobs List"]/li[@data-test="jobListing"]';
        this.paginationXPath = './/button[@data-test="load-more"]';
    }
    override getJobIdFromUrl(url: string): string {
        throw new Error("Method not implemented.");
    }
    override async extractJobDetail(jobElement: WebElement): Promise<Job> {
        await jobElement.click();
        const id = await this.getJobIdFromJobElement(jobElement);
        const titleLink = await this.waitForNestedElement(jobElement, By.xpath('.//a[@data-test="job-title"]'));
        const job: Job = new Job({
            site: this.siteName,
            job_id: id,
            url: await titleLink.getAttribute('href'),
            title: (await titleLink.getText()).trim(),
            company: (await (await this.waitForNestedElement(jobElement, By.xpath('.//div[contains(@class, "EmployerProfile_employerNameContainer")]/span'))).getText()).trim(),
            location: (await (await this.waitForNestedElement(jobElement, By.xpath('.//div[@data-test="emp-location"]'))).getText()).trim(),
            postedDate: (await (await this.waitForNestedElement(jobElement, By.xpath('.//div[@data-test="job-age"]'))).getText()).trim()
        })
        // separate job description page
        await this.sleep(200);
        try {
            await (await this.waitForElement(By.xpath('.//div[contains(@class, "JobDetails_showMoreWrapper")]/button'))).click()
            job.description = (await (await this.waitForElement(By.xpath(".//div[contains(@class, 'JobDetails_jobDescription')]"))).getText()).trim();
        }
        catch (err) {
            console.error(`Could not load job description page: ${err}`);
        }
        // console.log(job);
        return job;
    }
    override async getJobIdFromJobElement(jobElement: WebElement): Promise<string> {
        return await jobElement.getAttribute('data-jobid');
    }
    protected override get url(): string {
        return "https://www.glassdoor.ca/Job/toronto-on-software-developer-jobs-SRCH_IL.0,10_IC2281069_KO11,29.htm?fromAge=1";
    }
    override async nextPage(): Promise<boolean> {
        try {
            const nextPageButton = await this.waitForElement(By.xpath(this.paginationXPath), 500);
            await nextPageButton.click();
            await this.sleep(2000);
            return true;
        }
        catch (err) {
            console.error("No more page found " + err);
            return false;
        }
    }
}