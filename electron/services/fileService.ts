import { app } from "electron";
import path from "path";

export class FileService {
    public static getFilePath(filename: string): string {
        return path.resolve(app.getPath('userData'), filename);
    }
}