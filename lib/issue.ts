export interface Issue {
    id: number;
    priority: string;
    title: string;
    lastUpdate: Date;
}

export function parseIssues(html: string): Issue[] {
    const issues: Issue[] = [];

    html.match(/<tr id="issue-\d+?.*?<\/tr>/gs)
        ?.splice(1)
        .forEach((htmlRow) => {
            const issue: Issue = {
                id: 0,
                priority: 'N/A',
                title: 'N/A',
                lastUpdate: new Date(),
            };

            htmlRow.match(/<td.*?>(.*?)<\/td>/gs)
                ?.forEach((content, index) => {
                    switch (index) {
                        case 0:
                            issue.id = ~~(content.match(/value="(\d+)"/)?.[1] || 0);
                            break;

                        case 4:
                            issue.priority = content.match(/>(.+?)</)?.[1] || '';
                            break;

                        case 5:
                            issue.title = (content.match(/<a.*?>(.+?)<\/a>/)?.[1] || '')
                                .replace(/&#39;/g, `'`)
                                .replace(/&quot;/g, '"')
                                .replace(/&lt;/g, '<')
                                .replace(/&gt;/g, '>');
                            break;

                        case 7:
                        case 8:
                            const [date, month, year, hour, minute] = content.match(/>(\d+?)\/(\d+?)\/(\d+?) (\d+?):(\d+?)</)?.splice(1) || [];
                            issue.lastUpdate = new Date();
                            issue.lastUpdate.setDate(~~date);
                            issue.lastUpdate.setMonth(~~month);
                            issue.lastUpdate.setFullYear(~~year);
                            issue.lastUpdate.setHours(~~hour);
                            issue.lastUpdate.setMinutes(~~minute);
                            issue.lastUpdate.setSeconds(0);
                            break;
                    }
                });

            issues.push(issue);
        });

    return issues;
}
