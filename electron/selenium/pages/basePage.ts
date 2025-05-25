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

    abstract runPageFlow(): Promise<void>;

    scrollTo(element: WebElement): void {
        this.driver.executeScript("arguments[0].scrollIntoView({block: 'end'})", element);
    }

    cannotFindElementMessage(name: string, err: any) {
        return `Cannot find or interact with ${name}: ${err}`;
    }
}