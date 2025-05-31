import { Injectable } from '@angular/core';
import { Keyword, KeywordCategory, KeywordSynonym } from '../../../electron/models/keyword';
import { BaseService } from './base.service';

@Injectable({
    providedIn: 'root'
})
export class KeywordService extends BaseService {
    async getKeyword(id: number): Promise<Keyword> {
        return (await this.invoke<Keyword>('get-keyword', id)) ?? new Keyword({});
    }

    async getKeywords(): Promise<Keyword[]> {
        return (await this.invoke<Keyword[]>('get-keywords')) ?? [];
    }

    async getKeywordCategory(id: number): Promise<KeywordCategory | undefined> {
        return (await this.invoke<KeywordCategory>('get-keyword-category', id)) ?? undefined;
    }

    async getKeywordCategories(): Promise<KeywordCategory[]> {
        return (await this.invoke<KeywordCategory[]>('get-keyword-categories')) ?? [];
    }

    async getKeywordSynonyms(keyword_id: number): Promise<KeywordSynonym[]> {
        return (await this.invoke<KeywordSynonym[]>('get-keyword-synonyms', keyword_id)) ?? [];
    }

    async saveKeyword(keyword: Keyword): Promise<boolean> {
        return (await this.invoke<boolean>('save-keyword', keyword)) ?? false;
    }

    async saveKeywordCategory(keywordCat: KeywordCategory): Promise<boolean> {
        return (await this.invoke<boolean>('save-keyword-category', keywordCat)) ?? false;
    }

    // async saveKeywords(keywords: Keyword[]): Promise<boolean> {
    //     return (await this.invoke<boolean>('save-keywords', keywords)) ?? false;
    // }

    async deleteKeyword(name: string): Promise<boolean> {
        return (await this.invoke<boolean>('delete-keyword', name)) ?? false;
    }
}
