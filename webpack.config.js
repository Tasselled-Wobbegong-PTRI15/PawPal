const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


module.exports = {
    entry: './client/index.js', 
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
      },
      mode: process.env.NODE_ENV,
      module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {    
                    presets: [
                        '@babel/preset-env', // transpile modern JS (arrow function, class syntax, template literals etc.) to JavaScript that is compatible with older browsers
                        '@babel/preset-react', // transpile JSX and other React-specific syntax to JavaScript 
                    ],
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
            title: 'main',
            template: './client/index.html'
        })
      ],
      devServer: {
        static:{
            publicPath: '/build',
            directory: path.resolve(__dirname, 'build'),
        },
        port: 8080,
        proxy:  [
            {
                context: ['/api'],
                target: 'http//localhost:3000',
            },
        ],
    }
}