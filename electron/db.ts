import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { app } from 'electron';
import { FileService } from './services/fileService';

// function getDatabasePath(): string {
//     if (app.isPackaged) {
//         return path.join(app.getPath('userData'), 'data.sqlite'); // ✅ Safe writeable location
//     } else {
//         return path.resolve(__dirname, './data.sqlite'); // ✅ Dev path (adjust if needed)
//     }
// }

// Create a persistent file under app directory
const dbPath = FileService.getFilePath('./data/data.sqlite');

// Ensure directory exists
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath);

// Optional: enforce foreign keys
db.exec('PRAGMA foreign_keys = ON');

// Create a jobs table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    jobid TEXT NOT NULL,
    site TEXT NOT NULL,
    title TEXT,
    company TEXT,
    location TEXT,
    description TEXT,
    postedDate TEXT,
    url TEXT,
    score DECIMAL(2,2),
    created_at TEXT,
    PRIMARY KEY (id, site),
    UNIQUE (url)
  )
`);

//
// ✅ TABLE: keywordcategories
//
db.exec(`
  CREATE TABLE IF NOT EXISTS keywordcategories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    weight INTEGER DEFAULT 0
  )
`);

//
// ✅ TABLE: keywords
//
db.exec(`
  CREATE TABLE IF NOT EXISTS keywords (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    type INTEGER DEFAULT 0,
    FOREIGN KEY (category_id) REFERENCES keywordcategories(id) ON DELETE CASCADE
  )
`);

//
// ✅ TABLE: keywordsynonyms
//
db.exec(`
  CREATE TABLE IF NOT EXISTS keywordsynonyms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    keyword_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    FOREIGN KEY (keyword_id) REFERENCES keywords(id) ON DELETE CASCADE
  )
`);


// Create a jobs table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS jobfeatures (
    job_id TEXT NOT NULL,
    keyword_id INTEGER NOT NULL,
    PRIMARY KEY (job_id, keyword_id),
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    FOREIGN KEY (keyword_id) REFERENCES keywords(id) ON DELETE CASCADE
    );
`);

export default db;
