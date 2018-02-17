const fs = require('fs');
const path = require('path');

const config = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../.babelrc')));

require('babel-core/register')(config);

require.extensions['.scss'] = () => undefined;

require('./server');