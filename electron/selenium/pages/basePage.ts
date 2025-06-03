import { By, until, WebDriver, WebElement } from 'selenium-webdriver';
import { IPage } from './iPage';

export abstract class BasePage implements IPage {
    protected siteName: string;
    protected driver: WebDriver;
    protected abstract get url(): string;

    constructor(driver: WebDriver, siteName: string = 'generic') {
        this.siteName = siteName;
        this.driver = driver;
    }

    async open(url: string = this.url): Promise<void> {
        console.log(`Accessing: ${url}`);
        await this.driver.get(url);
        await this.sleep(2000);
    }

    async waitForNestedElement(parent: WebElement, locator: By, timeout = 10000): Promise<WebElement> {
        await this.driver.wait(async () => {
            try {
                const child = await parent.findElement(locator);
                return child;
            } catch (err) {
                return false;
            }
        }, timeout, 'Timed out waiting for nested element ' + locator.toString());
        const element = await parent.findElement(locator);
        return element;
    }

    async waitForElement(locator: By, timeout = 10000): Promise<WebElement> {
        await this.driver.wait(until.elementLocated(locator), timeout);
        const element = await this.driver.findElement(locator);
        return element;
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
        try {
            if (!await element.isDisplayed()) {
                await this.sleep(200);
            }
            await this.driver.executeScript("arguments[0].scrollIntoView({block: 'end'})", element);
        }
        catch (err) {
            console.error(`Cannot scroll to element: ${err}`);
        }
    }

    async sendKey(xpath: string, key: string): Promise<void> {
        const field = await this.waitForElement(By.xpath(xpath));
        await field.sendKeys(key);
    }

    cannotFindElementMessage(name: string, err: any) {
        return `Cannot find or interact with ${name}: ${err}`;
    }

    sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    getRandomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}