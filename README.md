# Install
Download the zip, extract to a directory then open CMD in that directory and run `npm i` and let npm install the packages.

# Setup
Sadly some libs haven't been updated in a while to apply some fixes so you will need to edit 2 files in order for this to work.

## wintools
Edit the /lib/ps.js so line 11 has a maxBuffer. Here is the new line 11 `exec('wmic process list /format:csv', {maxBuffer: 2000*1024}, function (err, stdout, stderr) {`

# How to run
Run `npm start` in console after the setup steps and boom! Rich Presence with your Google Play Music desktop player
