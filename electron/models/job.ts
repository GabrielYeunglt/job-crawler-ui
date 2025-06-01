export class Job {
    id: string;
    title: string;
    company: string;
    location: string;
    description: string;
    postedDate: string;
    url: string;
    site: string;
    score: number;

    constructor(data: Partial<Job>) {
        this.id = data.id || '';
        this.title = data.title || '';
        this.company = data.company || '';
        this.location = data.location || '';
        this.description = data.description || '';
        this.postedDate = data.postedDate || '';
        this.url = data.url || '';
        this.site = data.site || '';
        this.score = data.score || 0
    }

    equals(other: Job): boolean {
        return (
            this.id === other.id &&
            this.site === other.site
        );
    }

    static constructKey(id: string, site: string): string {
        return `${id}|${site}`;
    }
}
