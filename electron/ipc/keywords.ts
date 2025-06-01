import { ipcMain } from 'electron';
import { Keyword, KeywordCategory, KeywordSynonym } from '../models/keyword';
import { DatabaseService } from '../services/databaseService';

export function registerKeywordIpcHandlers() {

    ipcMain.handle('get-keyword', (event, id: number) => {
        return DatabaseService.getKeyword(id);
    });

    ipcMain.handle('get-keywords', () => {
        return DatabaseService.getKeywords();
    });

    ipcMain.handle('get-keyword-category', (event, id: number) => {
        const category = DatabaseService.getKeywordCategory(id);
        return category;
    });

    ipcMain.handle('get-keyword-categories', (event) => {
        const categories = DatabaseService.getKeywordCategories();
        return categories;
    });

    ipcMain.handle('get-keyword-synonyms', (event, keyword_id: number) => {
        const synonyms = DatabaseService.getKeywordSynonyms(keyword_id);
        return synonyms;
    });


    ipcMain.handle('save-keyword-category', (event, data: KeywordCategory) => {
        const result = DatabaseService.saveKeywordCategory(data.name, data.weight);
        return result;
    });

    ipcMain.handle('save-keyword', (event, data: any) => {
        const keyword = new Keyword({
            ...data
        });

        return DatabaseService.saveKeyword(keyword.name, keyword.type, keyword.category_id);;
    });

    ipcMain.handle('save-keyword-synonym', (event, data: any) => {
        const synonym = new KeywordSynonym({
            ...data
        });

        DatabaseService.saveKeywordSynonym(synonym.keyword_id, synonym.name);

        return { success: true };
    });

    ipcMain.handle('edit-keyword', (event, data: Keyword) => {
        const result = DatabaseService.editKeyword(data.id, data.name, data.type, data.category_id);
        return result;
    });

    ipcMain.handle('edit-keyword-category', (event, data: KeywordCategory) => {
        const result = DatabaseService.editKeywordCategory(data.id, data.name, data.weight);
        return result;
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