const discordRpc = require('discord-rpc')
const config = require('./ConfigLoader.js')

const DEFAULT_CONFIG = {
    clientId: '384286107036155904',
    largeImageKey: 'spotify'
}

class DiscordRPC {
    constructor(config) {
        this.config = config || DEFAULT_CONFIG
        this.rpc = new discordRpc.Client({transport: 'ipc'})
        this.isConnected = false
        this.connect()
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
        if (this.isConnected === true) {
            return
        }
        console.log('[INFO] Connecting to Discord client...')          
        this.rpc.login(this.config.clientId || DEFAULT_CONFIG.clientId)
            .then(() => {
                console.log('[SUCCESS] Connected to Discord client!')
                this.isConnected = true
                process.send({
                    type: 'RPC_CONNECTION_FULFILLED',
                    payload: true
                })
            })
            .catch(e => {
                console.log('[ERR!] Failed to connect to Discord client!')                    
                this.isConnected = false
                process.send({
                    type: 'RPC_CONNECTION_REJECTED',
                    payload: e
                })
            })
        }
}

const DiscordRPCInstance = new DiscordRPC(config)

process.on('message', (action) => {
    switch (action.type) {
        case 'UPDATE_STATUS':
            return DiscordRPCInstance.updateStatus(action.payload)
        default:
            return console.error('No such action type found.')
    }
})