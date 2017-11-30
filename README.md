# Discord-Spotify-RPC
Rich Presence support for Spotify 

## Install
Download the latest release from the 'Releases' tab

## Configuration
The configuration file lives in `config.json`

Currently there are two options you can configure.
```json
{
  "clientId": "<client_id_goes_here>",
  "largeImageKey": "<image_resource_name_goes_here>"	
}
```
### Getting your own `clientId`
It's relatively easy to get your own `clientId` to use Discord Rich Presence.

1. Head to https://discordapp.com/developers/applications/me and click on the "New App" button.
![none](https://mikecao.me/i/2026c7.png)

2. Give your application a title and upload a picture for it if you want. **Please note that you cannot name it "Spotify" if you want it to show publically, as Discord has a blacklist on the names of popular applications for Rich Presence.**
![none](https://mikecao.me/i/68bdd6.png)

3. Copy down the Client ID, and paste it into `clientId` in `config.json`
![none](https://mikecao.me/i/c5a5b9.png)

4. Enable Rich Presence by clicking on the "Enable Rich Presence" button.
![none](https://mikecao.me/i/68d3a8.png)

5. Go to assets and upload a 'Large' image. Give it a name, and copy this name into the `largeImageKey` in `config.json`. This image will be displayed in Rich Presence. 
*Note: Discord-Spotify-RPC only supports large images right now!* 
![none](https://mikecao.me/i/1a8448.png)

6. You're good to go! Start the program, and enjoy your new Spotify Rich Presence!

## Developement

### Requirements
- node: `>=v8.0.0`

```sh
# clone the repo
git clone <repo-link>

# go inside the folder
cd Discord-Spotify-RPC

# install dependencies
npm i

# run!
npm start
```

### Building
To build the binaries for `macos`, `linux` and `win32` just run:
```sh
npm run build
```

Three binaries will be built into the `build/` folder, and the `config.json` will be also copied inside this folder.
