import { Job } from "../../../models/job";
import { BaseJobListPage } from "../baseJobListPage";

export class IndeedJobListPage extends BaseJobListPage {
    override async extractJobs(): Promise<void> {
        
    }
    protected override get url(): string {
        return "https://ca.indeed.com/jobs?q=software&l=Toronto%2C+ON&fromage=1&radius=25&from=searchOnDesktopSerp";
    }
    override async runPageFlow(): Promise<void> {
        await this.open();

       await this.extractJobs();
    }
}