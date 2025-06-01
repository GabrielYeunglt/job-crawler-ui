export class KeywordCategory {
    id: number;
    name: string;
    weight: number;

    constructor(data: Partial<KeywordCategory>) {
        this.id = data.id || 0;
        this.name = data.name || '';
        this.weight = data.weight || 0;
    }
}

export class Keyword {
    id: number;
    name: string;
    category_id: number;
    category: KeywordCategory;
    type: KeywordType;
    synonyms: KeywordSynonym[];
    constructor(data: Partial<Keyword>) {
        this.id = data.id || 0;
        this.name = data.name || '';
        this.category_id = data.category_id || 0;
        this.category = data.category || new KeywordCategory({});
        this.type = data.type || KeywordType.all;
        this.synonyms = data.synonyms || [];
    }
}

export class KeywordSynonym {
    keyword_id: number;
    name: string;
    constructor(data: Partial<KeywordSynonym>) {
        this.keyword_id = data.keyword_id || 0;
        this.name = data.name || '';
    }
}

export enum KeywordType {
    all,
    title,
    company,
    location,
    postedDate,
    description,
}