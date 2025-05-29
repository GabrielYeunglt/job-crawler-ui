export class KeywordCategory {
    category: string;
    weight: number;

    constructor(data: Partial<KeywordCategory>) {
        this.category = data.category || '';
        this.weight = data.weight || 0;
    }
}

export class Keyword {
    name: string;
    category: KeywordCategory;
    type: KeywordType;
    synonyms: Set<string>;
    constructor(data: Partial<Keyword>) {
        this.name = data.name || '';
        this.category = data.category || new KeywordCategory({});
        this.type = data.type || KeywordType.all;
        this.synonyms = data.synonyms || new Set<string>();
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