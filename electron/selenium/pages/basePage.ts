import { By, until, WebDriver, WebElement } from 'selenium-webdriver';
import { IPage } from './iPage';

export abstract class BasePage implements IPage {
    protected driver: WebDriver;
    protected abstract get url(): string;

    constructor(driver: WebDriver) {
        this.driver = driver;
    }

    async open(): Promise<void> {
        console.log(`Accessing: ${this.url}`);
        await this.driver.get(this.url);
    }

    async waitForElement(locator: By, timeout = 10000): Promise<WebElement> {
        const el = await this.driver.wait(until.elementLocated(locator), timeout);
        await this.driver.wait(until.elementIsVisible(el), timeout);
        return el;
    }

    async waitForElements(locator: By, timeout = 10000): Promise<WebElement[]> {
        // Wait for at least one element to be located
        await this.driver.wait(until.elementsLocated(locator), timeout);
        // Fetch all matching elements
        const elements = await this.driver.findElements(locator);
        // Wait for each to be visible
        for (const el of elements) {
            await this.driver.wait(until.elementIsVisible(el), timeout);
        }
        return elements;
    }

    abstract runPageFlow(): Promise<void>;

    async scrollTo(element: WebElement): Promise<void> {
        await this.driver.executeScript("arguments[0].scrollIntoView({block: 'end'})", element);
    }

    cannotFindElementMessage(name: string, err: any) {
        return `Cannot find or interact with ${name}: ${err}`;
    }

    sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}