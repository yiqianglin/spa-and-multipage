const path = require('path');
const argv = require('yargs').argv;


const { projectType } = argv;
const activityEntry =  require('./getEntries').entry;
const appEntry = { 'app/app.entry': path.join(__dirname, '../src/js/app/app.entry.js')};
const entry = projectType === 'app' ? appEntry : activityEntry;


const config = {
	entry: entry,
	dev: {
		env: {
			NODE_ENV: JSON.stringify('development')
		},
		port: 3004,
		hostName: 'localhost',
		autoOpenBrowser: true,
		assetsPublicPath: '/'
	},
	proxy: []

}

module.exports = config;