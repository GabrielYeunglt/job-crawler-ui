import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KeywordService {
  getKeywords(): Promise<any[]> {
    return window.electron.ipcRenderer.invoke('get-keywords');
  }

  saveKeywords(keywords: any[]): Promise<{ success: boolean }> {
    return window.electron.ipcRenderer.invoke('save-keywords', keywords);
  }

  deleteKeyword(name: string): Promise<{ success: boolean }> {
    return window.electron.ipcRenderer.invoke('delete-keyword', name);
  }
}
