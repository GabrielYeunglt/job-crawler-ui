export class BaseService {
    private get ipc() {
        return (window as any).electron?.invoke;
    }

    protected async invoke<T>(channel: string, ...args: any[]): Promise<T | null> {
        if (!this.ipc) {
            console.error(`Electron IPC not available for channel: ${channel}`);
            return null;
        }

        try {
            return await this.ipc(channel, ...args);
        } catch (error) {
            console.error(`IPC call failed [${channel}]:`, error);
            return null;
        }
    }
}