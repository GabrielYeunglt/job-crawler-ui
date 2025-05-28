import { WebDriver } from "selenium-webdriver";
import { DriverFactory } from "../drivers/driverFactory";
import { Google } from "../pages/google";
import { IndeedSite } from "../pages/indeed/indeedSite";
import { LinkedinSite } from "../pages/linkedin/linkedinSite";
import { DatabaseService } from "./databaseService";
import { Job } from "../../models/job";

export class CrawlService {
    async runCrawl(keyword: string): Promise<string[]> {
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

    constructViewedJobsSet(viewedJobs: Job[]) {
        const viewedJobsSet: Set<string> = new Set<string>();
        for (const job of viewedJobs) {
            const key = Job.constructKey(job.id, job.site);
            if (!viewedJobsSet.has(key)) {
                viewedJobsSet.add(key);
            }
        }
        return viewedJobsSet;
    }
}