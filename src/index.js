const PackageService = require('./services/package.service');
const yargs = require('yargs');

async function boostrap() {
  yargs
    .commandDir('commands')
    .version(PackageService.getVersion())
    .help();

  yargs.parse();
}
boostrap();
