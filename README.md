# Dependencies
This requires NodeJS 8.0.0 or higher which can be downloaded from [here](https://nodejs.org/en/download/) and Git which can be downloaded from [here](https://git-scm.com/).

For Linux users, follow these steps to install the dependencies for your distro [here](https://git-scm.com/download/linux) and [here](https://nodejs.org/en/download/package-manager/)

In CMD / Terminal or whatever the equivalent is of CMD for your operating system, run: `git clone https://github.com/WalshyDev/Discord-Spotify-RPC` then, move into the newly created directory by executing `cd Discord-Spotify-RPC` and then install all packages required by Discord-Spotify-RPC: `npm install` and let NPM install the packages.

# Modifying libraries
Sadly some libraries haven't been updated in a while. This means you'll have to edit some code of the libraries otherwise it will not work.

## Modifying node-spotify-webhelper
Edit `node_modules/node-spotify-webhelper/index.js`
You need to edit two lines in this file to make it work correctly.  
At line 15, change the current DEFAULT_PORT variable to 4381.  
Next, go to line 158 and change `https://%s:%d%s` to `http://%s:%d%s`

# How to run
Run `npm start` in console after the setup steps and boom! Rich Presence with your Spotify!

# Configuration

## Time setting (elapsed time)
By default the time option is `song-time` which will display the elapsed time as the current song time.

Available options  

| Option | Description |
| --- | --- |
| `overall` | This will set the elapsed time to the amount of time Spotify/this script has been running. |
| `song-time` | This will set the elapsed time to the current track position. Thanks to @mcao for PRing this. |
| `none` | Remove the elapsed time and just show the "Playing {track}\nBy {artist}" |

Just go to the config.json and change the "time" to any of these.
Example:
```json
{
    "time": "none"
}
```
Result:  
![none](https://bots.are-pretty.sexy/4eae08.png)

## Client ID
TODO: Document on how to make your own application and upload an asset

## Image and image text
If you want to have some text above the Spotify icon when you hover over it you can do this with a simple config option! You can also change the image easily now without having to edit the JS if you have made your own application.

You can now use the `largeImageKey` and `largeImageText` to change these values. **Note** If you have not made your own applicaiton do **not** change the `largeImageKey` this will result in just a black image.

Example of the new values:
```json
{
	"largeImageText": "Walshy is cool"
}
```
Result:  
![none](https://bots.are-pretty.sexy/be34ec.png)
