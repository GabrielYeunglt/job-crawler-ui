import { ipcMain } from 'electron';
import { KeywordStoreService } from '../services/keywordStoreService';
import { Keyword, KeywordCategory, KeywordSynonym } from '../models/keyword';
import { DatabaseService } from '../services/databaseService';

export function registerKeywordIpcHandlers() {

    ipcMain.handle('get-keywords', () => {
        return DatabaseService.getKeywords();
    });

    // ipcMain.handle('save-keywords', (event, rawList: any[]) => {
    //     currentKeywords = rawList.map(data => new Keyword({
    //         ...data,
    //         category: new KeywordCategory(data.category),
    //         synonyms: data.synonyms.map((s: any) => new KeywordSynonym(s))
    //     }));

    //     for (const keyword of currentKeywords) {
    //         DatabaseService.saveKeyword(keyword.name, keyword.type, keyword.category_id);
    //     }

    //     return { success: true };
    // });

    ipcMain.handle('save-keyword', (event, data: any) => {
        const keyword = new Keyword({
            ...data
        });

        DatabaseService.saveKeyword(keyword.name, keyword.type, keyword.category_id);

        return { success: true };
    });

    ipcMain.handle('delete-keyword', (event, keywordId: number) => {
        const deleted = DatabaseService.deleteKeyword(keywordId);
        return { success: deleted === 1 };
    });

}