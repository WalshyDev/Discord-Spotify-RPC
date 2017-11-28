# Install

This requires NodeJS 8.0.0 or higher which can be downloaded from [here](https://nodejs.org/en/download/) and Git which can be downloaded from [here](https://git-scm.com/).

Download the zip, extract to a directory then open CMD in that directory and run `npm i` and let npm install the packages.

# Setup
**As of 1.2.0, we are using @mcao's updated node-spotify-webhelper so no edits should need to be made. If it doesn't work still please follow the old instructions in v1.1.0.**

# How to run
Run `npm start` in console after the setup steps and boom! Rich Presence with your Spotify!

# Configure

## Time option (elapsed time)
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
