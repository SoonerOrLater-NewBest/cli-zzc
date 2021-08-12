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
cli-zzc/0.0.2 darwin-x64 node-v10.20.1
$ cli-zzc --help [COMMAND]
USAGE
  $ cli-zzc COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`cli-zzc help [COMMAND]`](#cli-zzc-help-command)
* [`cli-zzc statistic:rows FILEPATH [IGNORE]`](#cli-zzc-statisticrows-filepath-ignore)
* [`cli-zzc tpl:list [GROUP]`](#cli-zzc-tpllist-group)
* [`cli-zzc tpl:load NAME`](#cli-zzc-tplload-name)
* [`cli-zzc tpl:sourceDir`](#cli-zzc-tplsourcedir)
* [`cli-zzc tpl:update NAME`](#cli-zzc-tplupdate-name)
* [`cli-zzc transform:base64 FILEPATH`](#cli-zzc-transformbase64-filepath)
* [`cli-zzc transform:watermark WATERMARK IMGPATH`](#cli-zzc-transformwatermark-watermark-imgpath)

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

## `cli-zzc statistic:rows FILEPATH [IGNORE]`

统计文件行数

```
USAGE
  $ cli-zzc statistic:rows FILEPATH [IGNORE]

ARGUMENTS
  FILEPATH
  IGNORE    [default: .lock,.DS_Store] 过滤文件后缀

OPTIONS
  -h, --help       show CLI help
  -p, --path=path  [default: /fileInfo/] 保存路径用//包裹（默认在同目录下的/fileInfo/中）
  -t, --trim       是否去除空行
  -w, --write      是否将文件信息写入文件
```

_See code: [src/commands/statistic/rows.ts](https://github.com/SoonerOrLater-NewBest/cli-zzc/blob/v0.0.2/src/commands/statistic/rows.ts)_

## `cli-zzc tpl:list [GROUP]`

展示模板列表

```
USAGE
  $ cli-zzc tpl:list [GROUP]

ARGUMENTS
  GROUP  (common|fusion|antd|uni-app) [default: common] 选择模版框架

OPTIONS
  -h, --help  展示模板列表
```

_See code: [src/commands/tpl/list.ts](https://github.com/SoonerOrLater-NewBest/cli-zzc/blob/v0.0.2/src/commands/tpl/list.ts)_

## `cli-zzc tpl:load NAME`

使用模板

```
USAGE
  $ cli-zzc tpl:load NAME

OPTIONS
  -f, --force
  -g, --group=common|fusion|antd|uni-app  [default: common]
  -h, --help                              show CLI help
```

_See code: [src/commands/tpl/load.ts](https://github.com/SoonerOrLater-NewBest/cli-zzc/blob/v0.0.2/src/commands/tpl/load.ts)_

## `cli-zzc tpl:sourceDir`

获取模板本地缓存目录

```
USAGE
  $ cli-zzc tpl:sourceDir
```

_See code: [src/commands/tpl/sourceDir.ts](https://github.com/SoonerOrLater-NewBest/cli-zzc/blob/v0.0.2/src/commands/tpl/sourceDir.ts)_

## `cli-zzc tpl:update NAME`

更新模板

```
USAGE
  $ cli-zzc tpl:update NAME

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/tpl/update.ts](https://github.com/SoonerOrLater-NewBest/cli-zzc/blob/v0.0.2/src/commands/tpl/update.ts)_

## `cli-zzc transform:base64 FILEPATH`

任意文件转换base64编码

```
USAGE
  $ cli-zzc transform:base64 FILEPATH

OPTIONS
  -h, --help   show CLI help
  -w, --write  将base64数据写入文件（同输入文件路径）
```

_See code: [src/commands/transform/base64.ts](https://github.com/SoonerOrLater-NewBest/cli-zzc/blob/v0.0.2/src/commands/transform/base64.ts)_

## `cli-zzc transform:watermark WATERMARK IMGPATH`

图片批量添加水印

```
USAGE
  $ cli-zzc transform:watermark WATERMARK IMGPATH

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -w, --path=path  [default: /saveImg/] 保存路径用//包裹（默认在同目录下的/saveImg/中）
```

_See code: [src/commands/transform/watermark.ts](https://github.com/SoonerOrLater-NewBest/cli-zzc/blob/v0.0.2/src/commands/transform/watermark.ts)_
<!-- commandsstop -->
