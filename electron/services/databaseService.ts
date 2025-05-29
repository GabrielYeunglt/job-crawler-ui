import { catchError } from 'rxjs';
import db from '../db';
import { Job } from '../models/job';

export class DatabaseService {

    static saveJob(id: string, site: string, title: string, company: string, location: string, description: string, postedDate: string, url: string, score: number, features: string) {
        try {
            const now = this.getDbDate();
            const stmt = db.prepare(`INSERT OR REPLACE INTO jobs (id, site, title, company, location, description, postedDate, url, score, features, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
            stmt.run(id, site, title, company, location, description, postedDate, url, score, features, now);
        }
        catch (err) {
            console.error(err);
        }
    }

    static getJob(id: string, site: string) {
        const stmt = db.prepare(`SELECT * FROM jobs WHERE id = ? AND site = ?`);
        return stmt.get(id, site);
    }

    static getRecentJobs(days: number = 2): Job[] {
        const stmt = db.prepare(`
        SELECT * FROM jobs 
        WHERE created_at >= datetime('now', ?) 
        ORDER BY created_at DESC
    `);
        return stmt.all(`-${days} days`) as Job[];
    }


    static getDbDate(date: Date = new Date()): string {
        return date.toISOString().slice(0, 19).replace('T', ' '); // 'YYYY-MM-DD HH:MM:SS'
    }
}