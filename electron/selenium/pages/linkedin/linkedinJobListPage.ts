import { By, WebDriver, WebElement } from "selenium-webdriver";
import { Job } from "../../../models/job";
import { BaseJobListPage } from "../baseJobListPage";

export class LinkedinJobListPage extends BaseJobListPage {
    constructor(driver: WebDriver, siteName: string = 'generic', viewedJobs: Set<string>) {
        super(driver, siteName, viewedJobs);
        this.jobListXPath = './/li[@data-occludable-job-id]';
        this.paginationXPath = './/ul[@class="jobs-search-pagination__pages"]/li/button[span="%s"]';
    }
    override async extractJobDetail(jobElement: WebElement): Promise<Job> {
        await jobElement.click();
        const id = await this.getJobIdFromJobElement(jobElement);
        const job: Job = new Job({
            site: this.siteName,
            job_id: id,
            url: this.getUrlFromJobId(id),
            title: (await (await this.waitForNestedElement(jobElement, By.xpath(".//a[@data-control-id]/span[1]"))).getText()).trim(),
            company: (await (await this.waitForNestedElement(jobElement, By.xpath('.//div[contains(@class, "artdeco-entity-lockup__subtitle")]'))).getText()).trim(),
            location: (await (await this.waitForNestedElement(jobElement, By.xpath(".//div[contains(@class, 'artdeco-entity-lockup__caption')]"))).getText()).trim()
        })
        // separate job description page
        await this.sleep(200);
        try {

            job.description = (await (await this.waitForElement(By.xpath(".//div[contains(@id, 'job-details')]"))).getText()).trim();
            job.postedDate = (await (await this.waitForElement(By.xpath('.//div[contains(@class, "job-details-jobs-unified-top-card__tertiary-description-container")]'))).getText()).trim();
        }
        catch (err) {
            console.error(`Could not load job description page: ${err}`);
        }
        await this.sleep(this.getRandomInt(1000, 2000));
        // console.log(job);
        return job;
    }
    protected override get url(): string {
        return "https://www.linkedin.com/jobs/search/?currentJobId=4238133812&f_F=it&f_PP=100761630&f_TPR=r86400&geoId=101174742&origin=JOB_SEARCH_PAGE_JOB_FILTER&refresh=true&sortBy=R";
    }

    override getJobIdFromUrl(url: string): string {
        return "";
    }

    getUrlFromJobId(jobId: string): string {
        return "https://www.linkedin.com/jobs/view/" + jobId;
    }

    override async getJobIdFromJobElement(jobElement: WebElement): Promise<string> {
        return await jobElement.getAttribute("data-occludable-job-id") ?? await jobElement.getAttribute("data-job-id");
    }
}