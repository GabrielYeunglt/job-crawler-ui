import { By } from "selenium-webdriver";
import { BasePage } from "../basePage";

export class IndeedHomePage extends BasePage {
    protected override get url(): string {
        return "https://ca.indeed.com/";
    }
    override async runPageFlow(): Promise<void> {
        try {
          await this.open();
      
          await this.enterSearchTerm('software');
      
          await this.clickFindJobs();
        } catch (err) {
          console.error(`runPageFlow failed: ${err}`);
          throw err;
        }
      }      

    async enterSearchTerm(term: string) {
        (await this.waitForElement(By.xpath(".//input[@id='text-input-what']"))).sendKeys('software');
    }

    async clickFindJobs() {
        (await this.waitForElement(By.xpath(".//button[@type='submit']"))).click();
    }
}