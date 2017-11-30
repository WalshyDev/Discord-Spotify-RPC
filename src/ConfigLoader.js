const fs = require('fs')
const path = require('path')
const CONFIG_PATH = path.join(process.cwd(), './config.json')

const configFileExists = fs.existsSync(CONFIG_PATH)

const configFile = configFileExists && fs.readFileSync(CONFIG_PATH, 'utf8', (err, contents) => {
    let config
    try {
        config = JSON.parse(contents)
        return config
    } catch (e) {
        console.log('Invalid JSON. Please check your config.json.')
        process.exit(1)
    }
}) || undefined

module.exports = configFile
