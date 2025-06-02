// src/types/preload.d.ts

export { };

declare global {
    interface Window {
        electron: {
            ipcRenderer: {
                invoke: (channel: string, ...args: any[]) => Promise<any>;
                send: (channel: string, ...args: any[]) => void;
                on: (channel: string, listener: (...args: any[]) => void) => void;
                once: (channel: string, listener: (...args: any[]) => void) => void;
            };
            shell: {
                openExternal: (url: string) => void;
            };
        };
    }
}
