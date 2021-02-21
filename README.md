minecraft-cli
=============

Minecraft&#39;s CLI tool managing servers and clients

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/minecraft-cli.svg)](https://npmjs.org/package/minecraft-cli)
[![Downloads/week](https://img.shields.io/npm/dw/minecraft-cli.svg)](https://npmjs.org/package/minecraft-cli)
[![License](https://img.shields.io/npm/l/minecraft-cli.svg)](https://github.com/ianwijma/minecraft-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g minecraft-cli
$ mccli COMMAND
running command...
$ mccli (-v|--version|version)
minecraft-cli/0.0.1 linux-x64 node-v15.8.0
$ mccli --help [COMMAND]
USAGE
  $ mccli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`mccli hello [FILE]`](#mccli-hello-file)
* [`mccli help [COMMAND]`](#mccli-help-command)

## `mccli hello [FILE]`

describe the command here

```
USAGE
  $ mccli hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ mccli hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/ianwijma/minecraft-cli/blob/v0.0.1/src/commands/hello.ts)_

## `mccli help [COMMAND]`

display help for mccli

```
USAGE
  $ mccli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_
<!-- commandsstop -->
