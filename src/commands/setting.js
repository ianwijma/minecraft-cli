exports.command = 'setting <command>';
exports.desc = 'Manage mccli (minecraft-cli)'
exports.builder = function (yargs) {
    return yargs.commandDir('setting')
}
exports.handler = function (argv) {}
