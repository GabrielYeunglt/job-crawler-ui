import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { app } from 'electron';

// function getDatabasePath(): string {
//     if (app.isPackaged) {
//         return path.join(app.getPath('userData'), 'data.sqlite'); // ✅ Safe writeable location
//     } else {
//         return path.resolve(__dirname, './data.sqlite'); // ✅ Dev path (adjust if needed)
//     }
// }

// Create a persistent file under app directory
const dbPath = path.resolve(__dirname, './data.sqlite');

// Ensure directory exists
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath);

// Optional: enforce foreign keys
db.exec('PRAGMA foreign_keys = ON');

// Create a jobs table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS jobs (
    id TEXT NOT NULL,
    site TEXT NOT NULL,
    title TEXT,
    company TEXT,
    location TEXT,
    description TEXT,
    postedDate TEXT,
    url TEXT,
    score DECIMAL(2,2),
    features TEXT,
    created_at TEXT,
    PRIMARY KEY (id, site),
    UNIQUE (url)
  )
`);

export default db;
