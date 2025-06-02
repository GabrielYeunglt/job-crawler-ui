import { Job } from "../models/job";
import { Keyword, KeywordCategory, KeywordType } from "../models/keyword";
import { DatabaseService } from "./databaseService";

export class KeywordService {
    keywords: Keyword[];
    keywordCategories: KeywordCategory[];
    totalWeight: number;

    constructor() {
        this.keywords = [];
        this.keywordCategories = [];
        this.refreshKeywords();
        this.totalWeight = this.getTotalWeight();
    }

    refreshKeywords(): void {
        this.keywords = DatabaseService.getKeywords();
        this.keywordCategories = DatabaseService.getKeywordCategories();
    }

    getTotalWeight(): number {
        return this.keywordCategories.reduce((sum, cat) => sum + Math.abs(cat.weight), 0);
    }

    processJob(job: Job): { score: number, matchedKeyword: Keyword[] } {
        const result = this.getMatchedKeywords(job);
        const score = this.calculateScore(result.weight);
        return { score: score, matchedKeyword: result.matched };
    }

    getMatchedKeywords(job: Job): { weight: number; matched: Keyword[] } {
        const matchedKeywords: Keyword[] = [];
        const categoryMap = new Map<string, number>();
        for (const keyword of this.keywords) {
            if (this.matches(job, keyword)) {
                matchedKeywords.push(keyword);

                // Add only the first occurrence of each category
                if (!categoryMap.has(keyword.category.name)) {
                    categoryMap.set(keyword.category.name, keyword.category.weight);
                }
            }
        }
        // Convert map values to array and sum them
        const categoryTotalWeight = Array.from(categoryMap.values()).reduce((sum, weight) => sum + weight, 0)
        return { weight: categoryTotalWeight, matched: matchedKeywords };
    }

    calculateScore(weight: number): number {
        if (this.totalWeight === 0) return 0;
        return (weight / this.totalWeight) * 100;
    }

    calculateTotalWeight(keywords: Set<Keyword>): number {
        const categoryMap = new Map<string, number>();

        for (const keyword of keywords) {
            const categoryKey = keyword.category.name;

            // Add only the first occurrence of each category
            if (!categoryMap.has(categoryKey)) {
                categoryMap.set(categoryKey, keyword.category.weight);
            }
        }

        // Convert map values to array and sum them
        const categoryTotalWeight = Array.from(categoryMap.values()).reduce((sum, weight) => sum + weight, 0);

        return categoryTotalWeight;
    }

    groupKeywordsByCategory(keywords: Set<Keyword>): Map<string, Keyword[]> {
        const grouped = new Map<string, Keyword[]>();

        for (const keyword of keywords) {
            const categoryName = keyword.category.name;

            if (!grouped.has(categoryName)) {
                grouped.set(categoryName, []);
            }

            grouped.get(categoryName)!.push(keyword);
        }

        return grouped;
    }

    matches(job: Job, keyword: Keyword): boolean {
        const textToCheck = (field: KeywordType): string => {
            switch (field) {
                case KeywordType.title: return job.title?.toLowerCase() || '';
                case KeywordType.company: return job.company?.toLowerCase() || '';
                case KeywordType.location: return job.location?.toLowerCase() || '';
                case KeywordType.postedDate: return job.postedDate?.toLowerCase() || '';
                case KeywordType.description: return job.description?.toLowerCase() || '';
                default:
                    return (
                        `${job.title} ${job.company} ${job.location} ${job.description}`
                            .toLowerCase() || ''
                    );
            }
        };

        const searchSpace = textToCheck(keyword.type);

        const terms = [keyword.name.toLowerCase(), ...keyword.synonyms.map(s => s.name.toLowerCase())];
        return terms.some(term => searchSpace.includes(term));
    }
}