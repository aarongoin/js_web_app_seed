const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    mode: 'development',
    entry: {
        'js/app': './client/App.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader' ]
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'static/'),
        filename: '[name].bundle.js'
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: 'css/style.bundle.css' })
    ]
}