import { WebDriver } from 'selenium-webdriver';
import { BasePage } from './basePage';
import { Job } from '../../models/job';
import { iJobListPage } from './iJobListPage';

export abstract class BaseJobListPage extends BasePage implements iJobListPage {
    protected jobList: Job[] = [];

    constructor(driver: WebDriver) {
        super(driver); // ✅ pass driver to BasePage
    }
    abstract extractJobs(): Promise<void>;
}
