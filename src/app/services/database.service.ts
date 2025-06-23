import { Injectable } from '@angular/core';
import { DatabaseResult } from '../../../electron/models/databaseResult';
import { BaseService } from './base.service';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService extends BaseService {

    async manualQuery(query: string): Promise<DatabaseResult | any[]> {
        return await this.invoke<DatabaseResult | any[]>('manual-query', query) ?? { changes: 0, lastInsertRowid: 0 };
    }
}
