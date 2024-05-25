let path = require('path')

module.exports = {
    entry: "./public/app.js",
    output: {
        filename: "app.js",
        path: path.resolve(__dirname, 'dist')
    },
    target: 'node',
    mode:"production"
}