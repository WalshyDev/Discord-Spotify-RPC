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
It's relatively simple to make your own application to use for RPC. First of all, head to https://discordapp.com/developers/applications/me and click on the "New App" button.
![none](https://mikecao.me/i/2026c7.png)

Next, you'll want to give your application a title and upload a picture for it if you want. Please note that you cannot name it "Spotify" if you want it to show publically, as Discord has a blacklist on the names of popular applications for Rich Presence.
![none](https://mikecao.me/i/68bdd6.png)

Great job! You've made the application. Take note of the Client ID, you'll need it for the config file later.
![none](https://mikecao.me/i/c5a5b9.png)

Next, you'll want to click the button at the bottom that says "Enable Rich Presence".
![none](https://mikecao.me/i/68d3a8.png)

Great! Rich presence is enabled. Now, go to the assets section and upload an image as a "large" image. This will be the image that show up in the client when you use it for Rich Presence. Take note of the keys for the images! 
*Note: Discord-Spotify-RPC only supports large images right now!*
![none](https://mikecao.me/i/1a8448.png)

You can see your uploaded assets here, in case you need to edit them sometime in the future. You can have up to 150 of them!
![none](https://mikecao.me/i/731626.png)

Next, go to the config file and use the values from the application to fill it in.
```json
{
	"clientId": "Client ID goes here",
	"largeImageKey": "Large image key goes here"
}
```

You're good to go! Start the program, and enjoy your new Spotify Rich Presence!

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
![none](https://bots.are-pretty.sexy/be34ec.png/be34ec.png)
