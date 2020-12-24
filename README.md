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
* [`cli-zzc add`](#cli-zzc-add)
* [`cli-zzc advice`](#cli-zzc-advice)
* [`cli-zzc help [COMMAND]`](#cli-zzc-help-command)
* [`cli-zzc lint [FILE]`](#cli-zzc-lint-file)
* [`cli-zzc remove`](#cli-zzc-remove)
* [`cli-zzc show`](#cli-zzc-show)
* [`cli-zzc update`](#cli-zzc-update)

## `cli-zzc add`

Add a new todo

```
USAGE
  $ cli-zzc add

OPTIONS
  -n, --task=task  task
```

_See code: [src/commands/add.ts](https://github.com/workspace/cli-zzc/blob/v0.0.0/src/commands/add.ts)_

## `cli-zzc advice`

Shares an advice for you.

```
USAGE
  $ cli-zzc advice
```

_See code: [src/commands/advice.ts](https://github.com/workspace/cli-zzc/blob/v0.0.0/src/commands/advice.ts)_

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

## `cli-zzc lint [FILE]`

describe the command here

```
USAGE
  $ cli-zzc lint [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/lint.ts](https://github.com/workspace/cli-zzc/blob/v0.0.0/src/commands/lint.ts)_

## `cli-zzc remove`

Removes a task by id

```
USAGE
  $ cli-zzc remove

OPTIONS
  -n, --id=id  (required) task id

DESCRIPTION
  ...
  Removes a task permanently from database by id
```

_See code: [src/commands/remove.ts](https://github.com/workspace/cli-zzc/blob/v0.0.0/src/commands/remove.ts)_

## `cli-zzc show`

Shows existing tasks

```
USAGE
  $ cli-zzc show

DESCRIPTION
  ...
  Show all the tasks sorted by their ids
```

_See code: [src/commands/show.ts](https://github.com/workspace/cli-zzc/blob/v0.0.0/src/commands/show.ts)_

## `cli-zzc update`

Marks a task as done

```
USAGE
  $ cli-zzc update

OPTIONS
  -n, --id=id  task id

DESCRIPTION
  ...
     Marks a task as done
```

_See code: [src/commands/update.ts](https://github.com/workspace/cli-zzc/blob/v0.0.0/src/commands/update.ts)_
<!-- commandsstop -->
