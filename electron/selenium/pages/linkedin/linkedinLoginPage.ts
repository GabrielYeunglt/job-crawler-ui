import { By } from "selenium-webdriver";
import { BasePage } from "../basePage";
import { CredentialService } from "../../services/credentialService";

export class LinkedinLoginPage extends BasePage {
    protected override get url(): string {
        throw new Error("Method not implemented.");
    }
    override async runPageFlow(): Promise<void> {
        const submitButton = await this.waitForElement(By.xpath('.//button[@type="submit"]'));

        await this.sendKey('.//input[@id="username"]', process.env['LINKEDIN_USERNAME'] || '');
        await this.sendKey('.//input[@id="password"]', CredentialService.decrypt(process.env['LINKEDIN_PASSWORD'] || ''));

        await submitButton.click();
        await this.sleep(2000);
    }
}