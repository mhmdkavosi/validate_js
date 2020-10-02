const path = require('path');
module.exports = {
    entry: './index.js',
    output: {
        filename: 'validation.js',
        path: path.resolve(__dirname, 'dist')
    },
};