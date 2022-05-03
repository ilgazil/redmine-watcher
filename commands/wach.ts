import { parseIssues } from '../lib/issue.ts';

interface AuthOptions {
    session: string;
}

const ROOT = 'https://redmine.infomaniak.ch/';
const ISSUES = `${ROOT}projects/workspace/issues?set_filter=1&f[]=status_id&op[status_id]=%3D&v[status_id][]=1`;

export default async function watch({ session }: AuthOptions) {
    async function fetchIssues() {
        const response = await (await fetch(ISSUES, {
            method: 'GET',
            headers: [['Cookie', `_redmine_session=${session}`]],
        }));

        return parseIssues((await response.text()).match(/<table class="list issues.*?">(.*?)<\/table>/s)?.[1] || '');
    }

    const cachedIssues = await fetchIssues();

    setInterval(async () => {
        try {
            const issues = await fetchIssues();
            const ids = cachedIssues.map(({ id }) => id);
            const newIssues = issues.filter(({ id }) => !ids.includes(id));

            if (newIssues.length) {
                console.log(newIssues);
                cachedIssues.splice(0, cachedIssues.length, ...issues);
            }
        } catch (_e) {
        }
    }, 1000);
}
