const nodeSpotifyWebhelper = require('node-spotify-webhelper')

const DEFAULT_CONFIG = {
    port: 4381,
    protocol: 'http'
}

class SpotifyWebHelper {

    constructor(config) {
        this.config = config || DEFAULT_CONFIG
        this.spotify = new nodeSpotifyWebhelper.SpotifyWebHelper(config)
    }

    getTrackInfo() {
        return new Promise((resolve, reject) => {
            this.spotify.getStatus((err, res) => {
                if (err) {
                    return reject(err)
                }
                if (!res.track.track_resource || !res.track.artist_resource) {
                    return reject('[ERR!] Track info invalid', res.track)
                } else {
                    return resolve({
                        name: res.track.track_resource.name,
                        artist: res.track.artist_resource.name,
                    })
                }
            })
        })
    }

    getPlayingStatus() {
        return new Promise((resolve, reject) => {
            this.spotify.getStatus((err, res) => {
                if (err) {
                    return reject(err)
                }
                if (res.playing) {
                    return resolve()
                } else {
                    return reject('[INFO] Not playing anything')
                }
            })
        })
    }
    
}

module.exports = SpotifyWebHelper
