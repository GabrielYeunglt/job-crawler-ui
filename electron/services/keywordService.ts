import { Job } from "../models/job";
import { Keyword, KeywordType } from "../models/keyword";

export class KeywordService {
    processJob(job: Job, keywords: Set<Keyword>, totalWeight: number): Job {
        const result = this.getMatchedKeywords(job, keywords);
        job.score = this.calculateScore(result.weight, totalWeight);
        job.features = Array.from(result.matched).map(k => k.name);
        return job;
    }

    getMatchedKeywords(job: Job, keywords: Set<Keyword>): { weight: number; matched: Set<Keyword> } {
        const matchedKeywords: Set<Keyword> = new Set<Keyword>();
        const categoryMap = new Map<string, number>();
        for (const keyword of keywords) {
            if (this.matches(job, keyword)) {
                matchedKeywords.add(keyword);

                // Add only the first occurrence of each category
                if (!categoryMap.has(keyword.category.category)) {
                    categoryMap.set(keyword.category.category, keyword.category.weight);
                }
            }
        }
        // Convert map values to array and sum them
        const categoryTotalWeight = Array.from(categoryMap.values()).reduce((sum, weight) => sum + weight, 0)
        return { weight: categoryTotalWeight, matched: matchedKeywords };
    }

    calculateScore(weight: number, totalWeight: number): number {
        if (totalWeight === 0) return 0;
        return (weight / totalWeight) * 100;
    }

    calculateTotalWeight(keywords: Set<Keyword>): number {
        const categoryMap = new Map<string, number>();

        for (const keyword of keywords) {
            const categoryKey = keyword.category.category;

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
            const categoryName = keyword.category.category;

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

        const terms = [keyword.name.toLowerCase(), ...Array.from(keyword.synonyms).map(s => s.toLowerCase())];
        return terms.some(term => searchSpace.includes(term));
    }
}