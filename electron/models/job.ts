export class Job {
    id?: number;
    title: string;
    company: string;
    location: string;
    summary: string;
    postedDate: string;
    url: string;
    site: string;

    constructor(data: Partial<Job>) {
        this.id = data.id;
        this.title = data.title || '';
        this.company = data.company || '';
        this.location = data.location || '';
        this.summary = data.summary || '';
        this.postedDate = data.postedDate || '';
        this.url = data.url || '';
        this.site = data.site || '';
    }
    
    equals(other: Job): boolean {
        return (
            this.id === other.id &&
            this.site === other.site
        );
    }
}
