import { green } from '../deps.ts';
import { parseIssues } from '../lib/issue.ts';

interface AuthOptions {
    session: string;
}

const ROOT = 'https://redmine.infomaniak.ch/';
const ISSUES = `${ROOT}projects/workspace/issues?set_filter=1&f[]=status_id&op[status_id]=%3D&v[status_id][]=1`;

export default async function status({ session }: AuthOptions) {
    const response = await (await fetch(ISSUES, {
        method: 'GET',
        headers: [['Cookie', `_redmine_session=${session}`]],
    }));

    const issues = parseIssues((await response.text()).match(/<table class="list issues.*?">(.*?)<\/table>/s)?.[1] || '');

    if (!issues.length) {
        console.log(green('No issue opened! 🎉'));
        return;
    }

    console.log(issues);
}
