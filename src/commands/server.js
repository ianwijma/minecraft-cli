exports.command = 'server <command>';
exports.desc = 'Create and manage servers'
exports.builder = function (yargs) {
    return yargs.commandDir('server')
}
exports.handler = function (argv) {}
