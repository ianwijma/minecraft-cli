const packageObject = require('package')(module);

module.exports = class PackageService {
    static getVersion() {
        return packageObject.version;
    }
}
