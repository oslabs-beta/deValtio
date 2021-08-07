const path = require('path');

module.exports = {
    mode: 'development',
    entry: ['./src/frontend/index.tsx'],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', 'jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.ts(x)?$/,
                loader: 'ts-loader',
                exclude: /(node_modules)/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                exclude: /(node_modules)/
            }
        ]
    }
}