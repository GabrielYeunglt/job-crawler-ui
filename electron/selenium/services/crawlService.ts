import { WebDriver } from "selenium-webdriver";
import { DriverFactory } from "../drivers/driverFactory";
import { Google } from "../pages/google";
import { IndeedSite } from "../pages/indeed/indeedSite";

export async function runCrawl(keyword: string): Promise<string[]> {
    const factory = new DriverFactory();
    const driver: WebDriver = factory.createWebDriver();
    
  try {
    const indeed = new IndeedSite(driver);
    await indeed.runPages();
    
    return ['Success'];
  } catch (error) {
    console.error('Crawler error:', error);
    return [];
  } finally {
    // await driver.quit();
  }
}
