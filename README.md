cli-zzc
=======

In order to simplify the daily work

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/cli-zzc.svg)](https://npmjs.org/package/cli-zzc)
[![Downloads/week](https://img.shields.io/npm/dw/cli-zzc.svg)](https://npmjs.org/package/cli-zzc)
[![License](https://img.shields.io/npm/l/cli-zzc.svg)](https://github.com/workspace/cli-zzc/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g cli-zzc
$ cli-zzc COMMAND
running command...
$ cli-zzc (-v|--version|version)
cli-zzc/0.0.0 darwin-x64 node-v10.20.1
$ cli-zzc --help [COMMAND]
USAGE
  $ cli-zzc COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`cli-zzc demo:add`](#cli-zzc-demoadd)
* [`cli-zzc demo:advice`](#cli-zzc-demoadvice)
* [`cli-zzc demo:remove`](#cli-zzc-demoremove)
* [`cli-zzc demo:show`](#cli-zzc-demoshow)
* [`cli-zzc demo:update`](#cli-zzc-demoupdate)
* [`cli-zzc help [COMMAND]`](#cli-zzc-help-command)

## `cli-zzc demo:add`

Add a new todo

```
USAGE
  $ cli-zzc demo:add

OPTIONS
  -n, --task=task  task
```

_See code: [src/commands/demo/add.ts](https://github.com/workspace/cli-zzc/blob/v0.0.0/src/commands/demo/add.ts)_

## `cli-zzc demo:advice`

Shares an advice for you.

```
USAGE
  $ cli-zzc demo:advice
```

_See code: [src/commands/demo/advice.ts](https://github.com/workspace/cli-zzc/blob/v0.0.0/src/commands/demo/advice.ts)_

## `cli-zzc demo:remove`

Removes a task by id

```
USAGE
  $ cli-zzc demo:remove

OPTIONS
  -n, --id=id  (required) task id

DESCRIPTION
  ...
  Removes a task permanently from database by id
```

_See code: [src/commands/demo/remove.ts](https://github.com/workspace/cli-zzc/blob/v0.0.0/src/commands/demo/remove.ts)_

## `cli-zzc demo:show`

Shows existing tasks

```
USAGE
  $ cli-zzc demo:show

DESCRIPTION
  ...
  Show all the tasks sorted by their ids
```

_See code: [src/commands/demo/show.ts](https://github.com/workspace/cli-zzc/blob/v0.0.0/src/commands/demo/show.ts)_

## `cli-zzc demo:update`

Marks a task as done

```
USAGE
  $ cli-zzc demo:update

OPTIONS
  -n, --id=id  task id

DESCRIPTION
  ...
     Marks a task as done
```

_See code: [src/commands/demo/update.ts](https://github.com/workspace/cli-zzc/blob/v0.0.0/src/commands/demo/update.ts)_

## `cli-zzc help [COMMAND]`

display help for cli-zzc

```
USAGE
  $ cli-zzc help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_
<!-- commandsstop -->
