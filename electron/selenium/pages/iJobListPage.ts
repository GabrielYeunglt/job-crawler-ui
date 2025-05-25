import { Job } from "../../models/job";
export interface iJobListPage {
    extractJobs(): Promise<void>;
}