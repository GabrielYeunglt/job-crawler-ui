import { By } from "selenium-webdriver";
import { BasePage } from "./basePage";

export class Google extends BasePage {
    protected override get url(): string {
        return "https://google.com"
    }
    override async runPageFlow(): Promise<void> {
        await this.open();

        await this.waitForElement(By.xpath(".//textarea[@name='q']"))
            .then(async element => {
                await element.sendKeys("Test");
            })
            .catch(err => console.error('[Google] Error in runPageFlow:', err))
            .finally(() => {
                console.log('Current page finished');
            });
    }

}