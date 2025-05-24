import { By, until, WebDriver, WebElement } from 'selenium-webdriver';
import { IPage } from './iPage';

export abstract class BasePage implements IPage {
    protected driver: WebDriver;
    protected abstract get url(): string;

    constructor(driver: WebDriver) {
        this.driver = driver;
    }

    async open(): Promise<void> {
        await this.driver.get(this.url);
    }

    async waitForElement(locator: By, timeout = 5000): Promise<WebElement> {
        return this.driver.wait(until.elementLocated(locator), timeout);
    }

    abstract runPageFlow(): Promise<void>;

    scrollTo(element: WebElement): void {
        this.driver.executeScript("arguments[0].scrollIntoView({block: 'end'})", element);
    }
}