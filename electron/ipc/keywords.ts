import { ipcMain } from 'electron';
import { KeywordStoreService } from '../services/keywordStoreService';
import { Keyword, KeywordCategory } from '../models/keyword';

let currentKeywords: Keyword[] = KeywordStoreService.load();

export function registerKeywordIpcHandlers() {

    ipcMain.handle('get-keywords', () => {
        return currentKeywords;
    });

    ipcMain.handle('save-keywords', (event, rawList: any[]) => {
        currentKeywords = rawList.map(data => new Keyword({
            ...data,
            category: new KeywordCategory(data.category),
            synonyms: new Set(data.synonyms)
        }));

        KeywordStoreService.save(currentKeywords);
        return { success: true };
    });

    ipcMain.handle('delete-keyword', (event, name: string) => {
        currentKeywords = currentKeywords.filter(k => k.name !== name);
        KeywordStoreService.save(currentKeywords);
        return { success: true };
    });

}