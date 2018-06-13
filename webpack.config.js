const path = require('path');
module.exports = {
    mode: 'development',
    entry: {
        app: './client/App.js'
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'static/js'),
        filename: '[name].bundle.js'
    }
}