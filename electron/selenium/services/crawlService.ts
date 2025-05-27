import { WebDriver } from "selenium-webdriver";
import { DriverFactory } from "../drivers/driverFactory";
import { Google } from "../pages/google";
import { IndeedSite } from "../pages/indeed/indeedSite";
import { LinkedinSite } from "../pages/linkedin/linkedinSite";

export async function runCrawl(keyword: string): Promise<string[]> {
    const factory = new DriverFactory();
    const driver: WebDriver = factory.createWebDriver();

    try {
        // const indeed = new IndeedSite(driver, 'indeed');
        // await indeed.runPages();
        const linkedin = new LinkedinSite(driver, 'linkedin');
        await linkedin.runPages();
        return ['Success'];
    } catch (error) {
        console.error('Crawler error:', error);
        return [];
    } finally {
        await driver.quit();
    }
}
