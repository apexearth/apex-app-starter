module.exports = (entry, target = 'web') => {
    const Visualizer           = require('webpack-visualizer-plugin')
    const MiniCssExtractPlugin = require("mini-css-extract-plugin")

    return {
        target,
        context: __dirname,
        entry: [
            'babel-polyfill',
            entry
        ],
        output: {
            path: __dirname + "/build",
            filename: "bundle.js"
        },
        mode: process.env.NODE_ENV === "production" ? "production" : "development",
        watchOptions: {poll: 1000, aggregateTimeout: 300},
        module: {
            rules: [
                {test: /\.js$/, use: 'babel-loader'},
                {test: /\.jsx$/, use: 'babel-loader'},
                {test: /\.css/, use: 'css-loader'},
                {
                    test: /\.less$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'less-loader'
                    ]
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    use: [
                        'url-loader?limit=10000',
                        'img-loader'
                    ]
                },
            ]
        },
        plugins: [
            new Visualizer(),
            new MiniCssExtractPlugin({
                filename: "bundle.css",
            })
        ],
        devServer: {
            contentBase: 'www',
            historyApiFallback: {
                index: 'index.html'
            }
        }
    }
}