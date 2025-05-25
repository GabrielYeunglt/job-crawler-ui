import { BasePage } from "./basePage"

export interface iSite {
    runPages(): Promise<void>;
}