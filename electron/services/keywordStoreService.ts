// electron/services/keywordStoreService.ts
import fs from 'fs';
import path from 'path';
import { Keyword, KeywordCategory, KeywordType } from '../models/keyword';
import { app } from 'electron';
import { FileService } from './fileService';

const storePath = FileService.getFilePath('./keyword/keywords.json');
// Ensure directory exists
fs.mkdirSync(path.dirname(storePath), { recursive: true });
// const storePath = path.join(app.getPath('userData'), 'keywords.json');

export class KeywordStoreService {
    static load(): Keyword[] {
        if (!fs.existsSync(storePath)) return [];

        const raw = fs.readFileSync(storePath, 'utf-8');
        const parsed = JSON.parse(raw);

        return parsed.map((item: any) => new Keyword({
            name: item.name,
            type: item.type,
            category: new KeywordCategory(item.category),
            // synonyms: new Set(item.synonyms || []),
        }));
    }

    static save(keywords: Keyword[]): void {
        const serializable = keywords.map(k => ({
            name: k.name,
            type: k.type,
            category: {
                category: k.category.category,
                weight: k.category.weight,
            },
            synonyms: Array.from(k.synonyms),
        }));

        fs.writeFileSync(storePath, JSON.stringify(serializable, null, 2));
    }
}
