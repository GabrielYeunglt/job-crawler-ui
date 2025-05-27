import { By, WebDriver, WebElement } from 'selenium-webdriver';
import { BasePage } from './basePage';
import { Job } from '../../models/job';
import { iJobListPage } from './iJobListPage';
import { format } from 'util';

export abstract class BaseJobListPage extends BasePage implements iJobListPage {
    protected jobList: Job[];
    protected jobListXPath: string;
    protected currentPage: number;
    protected paginationXPath: string;
    constructor(driver: WebDriver, siteName: string) {
        super(driver, siteName); // ✅ pass driver to BasePage
        this.jobList = [];
        this.jobListXPath = "";
        this.currentPage = 1;
        this.paginationXPath = "";
    }
    override async runPageFlow(): Promise<void> {
        await this.open();
        await this.sleep(2000);
        do {
            await this.extractJobs();
        } while (await this.nextPage());
    }
    async extractJobs(): Promise<void> {
        const jobElementList = await this.getJobElementList();
        for (const jobElement of jobElementList) {
            await this.scrollTo(jobElement);
            await this.sleep(100);
        }
        for (const jobElement of jobElementList) {
            try {
                this.jobList.push(await this.extractJobDetail(jobElement));
            }
            catch (err) {
                console.error(`Error when extracting detail: ${err}`);
            }
        }
    }
    async getJobElementList(): Promise<WebElement[]> {
        const jobListElement = await this.waitForElements(By.xpath(this.jobListXPath));
        return jobListElement;
    }
    abstract getJobIdFromUrl(url: string): string;
    abstract extractJobDetail(jobElement: WebElement): Promise<Job>;
    async nextPage(): Promise<boolean> {
        const formattedNextPageXPath = format(this.paginationXPath, ++this.currentPage);
        try {
            const nextPageButton = await this.waitForElement(By.xpath(formattedNextPageXPath), 500);
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
