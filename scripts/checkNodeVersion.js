const semver = require('semver')
const NODE_VERSION = process.version
const SEMVER_MATCH = '8.x.x'

if (!semver.satisfies(semver.clean(NODE_VERSION), SEMVER_MATCH))
    console.error('[ERR] Node.js version not supported. Please update to 8.x.x')
else
    console.log('Node.js v' + SEMVER_MATCH + ' detected.')