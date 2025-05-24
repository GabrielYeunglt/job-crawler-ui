import { WebDriver } from "selenium-webdriver";
import { DriverFactory } from "../drivers/driverFactory";
import { Google } from "../pages/google";

export async function runCrawl(keyword: string): Promise<string[]> {
    const factory = new DriverFactory();
    const driver: WebDriver = factory.createWebDriver();
    
  try {
    const homePage = new Google(driver);
    await homePage.runPageFlow();
    
    return ['Success'];
  } catch (error) {
    console.error('Crawler error:', error);
    return [];
  } finally {
    await driver.quit();
  }
}
