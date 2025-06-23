import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import { DatabaseResult } from '../../../../electron/models/databaseResult';

@Component({
    selector: 'app-manual-query',
    imports: [CommonModule, FormsModule],
    templateUrl: './manual-query.component.html',
    styleUrl: './manual-query.component.scss'
})
export class ManualQueryComponent {
    sql = '';
    result: DatabaseResult | any[] = [];
    error: string = '';

    constructor(private databaseService: DatabaseService) { }

    async runQuery() {
        this.error = '';
        try {
            // Call your Electron IPC or backend here
            this.result = await this.databaseService.manualQuery(this.sql);
        } catch (e: any) {
            this.error = e.message || 'Unknown error';
            this.result = [];
        }
    }

    isResultArray(): boolean {
        return Array.isArray(this.result);
    }

    get stringifiedResult(): string {
        return JSON.stringify(this.result, null, 2);
    }

    get arrayResult(): any[] {
        return this.result as any[];
    }

    getFirstRowKeys(): string[] {
        if (Array.isArray(this.result) && this.result.length > 0) {
            return Object.keys(this.result[0]);
        }
        return [];
    }
}
