const { resolve } = require('path');
const { homedir } = require('os');
const { ensureDirSync, ensureFileSync } = require('fs-extra');

module.exports = class LocationService {

  async getSettingDir() {
    const dir = resolve( homedir(), '.mccli' );
    await ensureDirSync( dir );
    return dir;
  }

  async getDownloadCacheDir() {
    const dir = resolve( await this.getSettingDir(), 'cache' );
    await ensureDirSync( dir );
    return dir;
  }

  async getSettingFile() {
    const dir = await this.getSettingDir();
    const file = resolve( dir, 'setting.yml' );
    await ensureFileSync( file );
    return file;
  }

}
