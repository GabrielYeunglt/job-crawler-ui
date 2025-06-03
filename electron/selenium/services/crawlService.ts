import { WebDriver } from "selenium-webdriver";
import { DriverFactory } from "../drivers/driverFactory";
import { Google } from "../pages/google";
import { IndeedSite } from "../pages/indeed/indeedSite";
import { LinkedinSite } from "../pages/linkedin/linkedinSite";
import { DatabaseService } from "../../services/databaseService";
import { Job } from "../../models/job";
import { iSite } from "../pages/iSite";

export class CrawlService {
    static async runCrawl(keyword: string): Promise<string[]> {
        const factory = new DriverFactory();
        const driver: WebDriver = factory.createWebDriver();

        try {
            const viewedJobsData = DatabaseService.getRecentJobs();
            const viewedJobs = this.constructViewedJobsSet(viewedJobsData);
            // const indeed = new IndeedSite(driver, 'indeed');
            // await indeed.runPages();
            const linkedin = new LinkedinSite(driver, 'linkedin', viewedJobs);
            await linkedin.runPages();
            return ['Success'];
        } catch (error) {
            console.error('Crawler error:', error);
            return [];
        } finally {
            await driver.quit();
        }
    }

    static async crawlSite(sitename: string): Promise<void> {
        const factory = new DriverFactory();
        const driver: WebDriver = factory.createWebDriver();
        let site: iSite;

        try {
            const viewedJobsData = DatabaseService.getRecentJobs();
            const viewedJobs = this.constructViewedJobsSet(viewedJobsData);
            switch (sitename.toLowerCase()) {
                case 'linkedin':
                    site = new LinkedinSite(driver, sitename, viewedJobs);
                    break;
                case 'indeed':
                    site = new IndeedSite(driver, sitename, viewedJobs);
                    break;
                default:
                    throw new Error(`Unsupported sitename: ${sitename}`);
            }
            await site.runPages();
        } catch (error) {
            console.error('Crawler error:', error);
        } finally {
            await driver.quit();
        }
    }

    static constructViewedJobsSet(viewedJobs: Job[]) {
        const viewedJobsSet: Set<string> = new Set<string>();
        for (const job of viewedJobs) {
            const key = Job.constructKey(job.job_id, job.site);
            if (!viewedJobsSet.has(key)) {
                viewedJobsSet.add(key);
            }
        }
        return viewedJobsSet;
    }
}