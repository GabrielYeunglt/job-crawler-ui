import { By } from "selenium-webdriver";
import { BasePage } from "./basePage";

export class Google extends BasePage {
    protected override get url(): string {
        return "https://google.com"
    }
    override async runPageFlow(): Promise<void> {
        await this.open();

        this.waitForElement(By.xpath(".//textarea[@name='q']"))
            .then(element => {
                element.sendKeys("Test");
            })
            .catch(err => console.error(err))
            .finally();
    }

}