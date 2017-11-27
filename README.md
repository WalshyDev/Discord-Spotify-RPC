# Install
Download the zip, extract to a directory then open CMD in that directory and run `npm i` and let npm install the packages.

# Setup
Sadly some libs haven't been updated in a while to apply some fixes so you will need to edit 2 files in order for this to work.

## wintools
Edit the /lib/ps.js so line 11 has a maxBuffer. Here is the new line 11 `exec('wmic process list /format:csv', {maxBuffer: 2000*1024}, function (err, stdout, stderr) {`

## node-spotify-webhelper
You need to edit 2 lines here, line 15 the DEFAULT_PORT var, change the value to 4381. Next go to line 158 and change the `https://%s:%d%s` to `http://%s:%d%s`

With them 2 files edited you should be good to go.

# How to run
Run `npm start` in console after the setup steps and boom! Rich Presence with your Spotify!