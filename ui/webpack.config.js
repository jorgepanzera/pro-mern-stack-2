const path = require('path')

const config = {
    entry: './src/App.tsx',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'app.bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.ts(x)?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
}

module.exports = config
