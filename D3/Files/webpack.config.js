//Pieter Venter u23896257
const path = require("path");

module.exports = {
    entry: "./front_end/src/index.js",
    output: {
        path: path.resolve("front_end/public"),
        filename: "bundle.js"
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg|jpg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/images', 
                            publicPath: 'assets/images'
                        },
                    },
                ],
            }
        ]
    }
}