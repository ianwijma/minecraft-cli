exports.command = 'client <command>';
exports.desc = 'Create and manage clients'
exports.builder = function (yargs) {
    return yargs.commandDir('client')
}
exports.handler = function (argv) {}
