const path = require('path');
module.exports = {
    entry: './index.js',
    output: {
        filename: 'Validate.js',
        path: path.resolve(__dirname, 'dist')
    },
};