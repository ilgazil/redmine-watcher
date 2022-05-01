import { Denomander } from './deps.ts';

const program = new Denomander({
    app_name: 'Redmine watcher',
    app_description: 'Watch issues on redmine and notify when change',
    app_version: '1.0.0',
});

program.parse(Deno.args);
