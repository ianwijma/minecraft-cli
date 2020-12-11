const { resolve } = require('path');
const { ensureDirSync } = require('fs-extra');

exports.command = 'setup';
exports.command = 'Runs the setup for mccli';
exports.builder = {};
exports.handler = async function (argv) {
  const homedir = require('os').homedir();
  const settingdir = resolve(homedir, '')
};
