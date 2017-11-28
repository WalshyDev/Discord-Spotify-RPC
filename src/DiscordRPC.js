const discordRpc = require('discord-rpc')

const DEFAULT_CONFIG = {
    clientId: '384286107036155904',
    largeImageKey: 'spotify'
}

class DiscordRPC {

    constructor(config) {
        this.config = config || DEFAULT_CONFIG
        this.rpc = new discordRpc.Client({transport: 'ipc'})
        this.isConnected = false
    }

    updateStatus(track) {
        if (this.isConnected) {
            console.log('[INFO] Setting track', track)
            this.rpc.setActivity({
                details: `Playing ${track.name}`,
                state: `by ${track.artist}`,
                instance: false,
                largeImageKey: this.config.largeImageKey || DEFAULT_CONFIG.largeImageKey
            })
        } else {
            console.log('[ERR!] Cannot update RPC when disconnected!')
        }
    }

    connect() {
        return new Promise((resolve, reject) => {
            if (this.isConnected === true) {
                return resolve()
            }
            console.log('[INFO] Connecting to Discord client...')            
            this.rpc.login(this.config.clientId || DEFAULT_CONFIG.clientId)
                .then(() => {
                    console.log('[SUCCESS] Connected to Discord client!')
                    this.isConnected = true
                    return resolve()
                })
                .catch(e => {
                    console.log('[ERR!] Failed to connect to Discord client!')                    
                    this.isConnected = false
                    return reject(e)
                })
        })
    }

    disconnect() {
        if (this.isConnected) {
            console.log('[INFO] Disconnecting from Discord client...')
            return this.rpc.destroy()
                .then(() => {
                    this.isConnected = false                    
                    console.log('[SUCCESS] Disconnected Discord client.')
                })
        } else {
            return new Promise(() => {})            
        }
    }

}

module.exports = DiscordRPC
