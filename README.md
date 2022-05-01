# redmine-watcher

## Install app

```
deno install --allow-net --name redmine-watcher https://raw.githubusercontent.com/ilgazil/redmine-watcher/main/mod.ts
```

Now you can run app with `redmine-watcher`.

## Run app without installing

```
deno run --allow-net https://raw.githubusercontent.com/ilgazil/redmine-watcher/main/mod.ts
```

## About the authentication

For now, you must login in Redmine and provide your `_redmine_session` cookie as `session` option in commands.

## Commands

### Check issues

```
redmine-watcher status --session [session]
```
