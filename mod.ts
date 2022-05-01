import { Denomander } from './deps.ts';

import status from './commands/status.ts';

const program = new Denomander({
    app_name: 'Redmine watcher',
    app_description: 'Watch issues on redmine and notify when change',
    app_version: '1.0.0',
});

program
    .command('status', 'Read redmine issues status')
    .requiredOption('-s --session', 'Redmine session')
    .alias('red')
    .action(() => status({ session: program.session }));

program.parse(Deno.args);
