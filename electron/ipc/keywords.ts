import { ipcMain } from 'electron';
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

    ipcMain.handle('get-keyword-category', (event, id: number) => {
        const category = DatabaseService.getKeywordCategory(id);
        return category;
    });
    
    ipcMain.handle('get-keyword-categories', (event) => {
        const categories = DatabaseService.getKeywordCategories();
        return categories;
    });

    ipcMain.handle('save-keyword-category', (event, data: KeywordCategory) => {
        const result = DatabaseService.saveKeywordCategory(data.name, data.weight);
        return result;
    });

    ipcMain.handle('edit-keyword-category', (event, data: KeywordCategory) => {
        const result = DatabaseService.editKeywordCategory(data.id, data.name, data.weight);
        return result;
    });

    ipcMain.handle('save-keyword', (event, data: any) => {
        const keyword = new Keyword({
            ...data
        });

        DatabaseService.saveKeyword(keyword.name, keyword.type, keyword.category_id);

        return { success: true };
    });

    ipcMain.handle('delete-keyword-category', (event, categoryid: number) => {
        const deleted = DatabaseService.deleteKeywordCategory(categoryid);
        return deleted;
    });

    ipcMain.handle('delete-keyword', (event, keywordId: number) => {
        const deleted = DatabaseService.deleteKeyword(keywordId);
        return deleted;
    });

}