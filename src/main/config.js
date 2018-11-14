let FS = require('fs');
let Path = require('path');

let dirConfig = Path.join(__dirname, '../../config.json');

let config = JSON.parse(FS.readFileSync(dirConfig, 'utf8'));

module.exports = config;