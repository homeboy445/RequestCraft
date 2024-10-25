const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development', // Change to 'production' for production build
  entry: {
    popup: './src/app/index.tsx',
    background: './src/background/background.ts',
    contentScript: './src/content/contentScript.ts'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        type: "asset/resource",
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'popup.html',
      chunks: ['popup'],
      inject: 'body'
    }),
    new CopyWebpackPlugin({
        patterns: [
          { from:  path.resolve(__dirname, 'public/manifest.json'), to:  path.resolve(__dirname, 'dist') },
        //   { from: 'public/background.html', to: 'background.html' },
        //   { from: 'public/icon16.png', to: 'icon16.png' },
        //   { from: 'public/icon48.png', to: 'icon48.png' },
        //   { from: 'public/icon128.png', to: 'icon128.png' }
        ]
    })
  ],
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    hot: true, // Enable Hot Module Replacement
    open: true // Automatically open the browser
  },
};
