import { WebElement } from "selenium-webdriver";
import { Job } from "../../models/job";
export interface iJobListPage {
    getJobElementList(): Promise<WebElement[]>;
    extractJobs(): Promise<void>;
    extractJobDetail(jobElement: WebElement): Promise<Job>;
    getJobIdFromUrl(url: string): string;
}