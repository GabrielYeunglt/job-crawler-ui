import { WebDriver } from "selenium-webdriver";
import { DriverFactory } from "../drivers/driverFactory";
import { Google } from "../pages/google";
import { IndeedSite } from "../pages/indeed/indeedSite";
import { LinkedinSite } from "../pages/linkedin/linkedinSite";
import { DatabaseService } from "../../services/databaseService";
import { Job } from "../../models/job";
import { iSite } from "../pages/iSite";
import { GlassdoorSite } from "../pages/glassdoor/glassdoorSite";
import { LinkedinHomePage } from "../pages/linkedin/linkedinHomePage";
import { BasePage } from "../pages/basePage";
import { IndeedHomePage } from "../pages/indeed/indeedHomePage";
import { GlassdoorHomePage } from "../pages/glassdoor/glassdoorHomePage";

export class CrawlService {
    static async runCrawl(keyword: string): Promise<string[]> {
        const factory = new DriverFactory();
        const driver: WebDriver = factory.createWebDriver();

        try {
            const viewedJobsData = DatabaseService.getRecentJobs();
            const viewedJobs = this.constructViewedJobsSet(viewedJobsData);
            const linkedin = new LinkedinSite(driver, 'linkedin', viewedJobs);
            const indeed = new IndeedSite(driver, 'indeed', viewedJobs);
            const glassdoor = new GlassdoorSite(driver, 'glassdoor', viewedJobs);
            await this.siteRunner(linkedin);
            await this.siteRunner(indeed);
            await this.siteRunner(glassdoor);
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
                case 'glassdoor':
                    site = new GlassdoorSite(driver, sitename, viewedJobs);
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

    static async loginSite(sitename: string): Promise<void> {
        const factory = new DriverFactory();
        const driver: WebDriver = factory.createWebDriver();
        let homePage: BasePage;

        try {
            switch (sitename.toLowerCase()) {
                case 'linkedin':
                    homePage = new LinkedinHomePage(driver, sitename);
                    break;
                case 'indeed':
                    homePage = new IndeedHomePage(driver, sitename);
                    break;
                case 'glassdoor':
                    homePage = new GlassdoorHomePage(driver, sitename);
                    break;
                default:
                    throw new Error(`Unsupported sitename: ${sitename}`);
            }
            await homePage.open();
            await this.monitorBrowserClosed(driver, () => driver.quit());
        } catch (error) {
            console.error('Crawler error:', error);
        } finally {
            driver.quit();
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
    static async siteRunner(site: iSite): Promise<void> {
        try {
            await site.runPages();
        } catch (err) {
            console.error(`${site.getName()} error: ${err}`);
            throw err;
        }
    }

    static async monitorBrowserClosed(driver: WebDriver, onClose: () => void): Promise<void> {
        const interval = 1000; // 1 second polling
        const timeout = 60000; // max 60 seconds

        const start = Date.now();

        while (Date.now() - start < timeout) {
            try {
                await driver.getWindowHandle(); // will throw if closed
            } catch (err) {
                console.log('Browser closed by user.');
                onClose();
                return;
            }
            await new Promise(res => setTimeout(res, interval));
        }

        console.log('Timeout reached — assuming browser still open.');
    }
}