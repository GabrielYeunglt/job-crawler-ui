import { catchError } from 'rxjs';
import db from '../db';
import { Job } from '../models/job';
import Database from 'better-sqlite3';
import { Keyword, KeywordCategory, KeywordSynonym } from '../models/keyword';

export class DatabaseService {
    private static runInsert(stmt: Database.Statement, ...params: any[]): Database.RunResult {
        try {
            return stmt.run(...params);
        } catch (err) {
            console.error('DB Insert Error:', err);
            throw err;
        }
    }

    static saveJob(job_id: string, site: string, title: string, company: string, location: string, description: string, postedDate: string, url: string, score: number): Database.RunResult {
        const now = this.getDbDate();
        const stmt = db.prepare(`INSERT OR REPLACE INTO jobs (jobid, site, title, company, location, description, postedDate, url, score, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
        return this.runInsert(stmt, job_id, site, title, company, location, description, postedDate, url, score, now);
    }

    static saveJobFeature(job_id: string, keyword_id: string): Database.RunResult {
        const stmt = db.prepare(`INSERT INTO jobfeatures (job_id, job_site, keyword_id) VALUES (?, ?, ?)`);
        return this.runInsert(stmt, job_id, keyword_id);
    }

    static saveKeywordCategory(name: string, weight: number): Database.RunResult {
        const stmt = db.prepare(`INSERT INTO keywordcategories (name, weight) VALUES (?, ?)`);
        return this.runInsert(stmt, name, weight);
    }

    static saveKeyword(name: string, type: number, category_id: number): Database.RunResult {
        const stmt = db.prepare(`INSERT INTO keywords (name, type, category_id) VALUES (?, ?, ?)`);
        return this.runInsert(stmt, name, type, category_id);
    }

    static saveKeywordSynonym(keyword_id: number, name: string): Database.RunResult {
        const stmt = db.prepare(`INSERT OR REPLACE INTO keywordsynonyms (keyword_id, name) VALUES (?, ?)`);
        return this.runInsert(stmt, keyword_id, name);
    }

    static editKeyword(id: number, name: string, type: number, category_id: number): Database.RunResult {
        const stmt = db.prepare(`REPLACE INTO keywords (id, name, type, category_id) VALUES (?, ?, ?, ?)`);
        return this.runInsert(stmt, id, name, type, category_id);
    }

    static editKeywordCategory(id: number, name: string, weight: number): Database.RunResult {
        const stmt = db.prepare(`REPLACE INTO keywordcategories (id, name, weight) VALUES (?, ?, ?)`);
        return this.runInsert(stmt, id, name, weight);
    }

    static getJob(id: string, site: string): Job {
        try {
            const stmt = db.prepare(`SELECT * FROM jobs WHERE id = ? AND site = ?`);
            return stmt.get(id, site) as Job;
        } catch (err) {
            console.error(err)
            throw err;
        }
    }

    static getRecentJobs(days: number = 2): Job[] {
        try {
            const stmt = db.prepare(`
        SELECT * FROM jobs 
        WHERE created_at >= datetime('now', ?) 
        ORDER BY created_at DESC
    `);
            return stmt.all(`-${days} days`) as Job[];
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    static getKeywordCategories(): KeywordCategory[] {
        try {
            const stmt = db.prepare(`SELECT * FROM keywordcategories`);
            return stmt.all() as KeywordCategory[];
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    static getKeywordCategory(id: number): KeywordCategory {
        try {
            const stmt = db.prepare(`SELECT * FROM keywordcategories WHERE id = ?`);
            return stmt.all(id).pop() as KeywordCategory;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    static getKeyword(id: number): Keyword {
        try {
            const stmt = db.prepare(`SELECT * FROM keywords WHERE id = ?`);
            const keyword = stmt.get(id) as Keyword;
            keyword.category = this.getKeywordCategory(keyword.category_id);
            keyword.synonyms = this.getKeywordSynonyms(keyword.id);
            return keyword;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    static getKeywords(): Keyword[] {
        try {
            const stmt = db.prepare(`SELECT * FROM keywords`);
            const keywords = stmt.all() as Keyword[];
            for (const keyword of keywords) {
                keyword.category = this.getKeywordCategory(keyword.category_id);
                keyword.synonyms = this.getKeywordSynonyms(keyword.id);
            }
            return keywords;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
    static getKeywordSynonyms(keyword_id: number): KeywordSynonym[] {
        try {
            const stmt = db.prepare(`SELECT * FROM keywordsynonyms WHERE keyword_id = ?`);
            return stmt.all(keyword_id) as KeywordSynonym[];
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    static deleteKeywordCategory(category_id: number): Database.RunResult {
        try {
            const stmt = db.prepare(`DELETE FROM keywordcategories WHERE id = ?`);
            return stmt.run(category_id);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    static deleteKeyword(keyword_id: number): Database.RunResult {
        try {
            const stmt = db.prepare(`DELETE FROM keywords WHERE id = ?`);
            return stmt.run(keyword_id);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    static getDbDate(date: Date = new Date()): string {
        return date.toISOString().slice(0, 19).replace('T', ' '); // 'YYYY-MM-DD HH:MM:SS'
    }
}