var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var node_modules_dir = path.join(__dirname, 'node_modules');

var config = {
  entry: {
    app: './app/scripts/main.jsx',
    vendors: ['react', 'react-dom', 'react-router', 'history', 'react-router', 'redux',
      'react-redux', 'jquery', 'js-cookie', 'classnames',
      'react-addons-linked-state-mixin', 'react-radio-group']
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'app.js'
  },
  resolve: {
    root: [
      path.join(__dirname, 'node_modules'),
      path.join(__dirname, 'app'),
      path.join(__dirname, 'app/scripts'),
      path.join(__dirname, 'app/scripts/components')],
    alias: {
      'public': path.join(__dirname, '../public'),
      'bootstrap.css': node_modules_dir + '/bootstrap/dist/css/bootstrap.css'
    }
  },
  resolveLoader: {
    root: [
      path.join(__dirname, 'node_modules'),
    ]
  },
  module: {
    noParse: [],
    loaders: [
      { test: /\.jsx?$/, exclude: [node_modules_dir], loader: 'babel',
        query: { presets:[
          require.resolve('babel-preset-es2015'),
          require.resolve('babel-preset-react'),

          ] } },
       
           
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.(png|jpg|gif)$/, loader: 'url?limit=25000&name=images/[name].[ext]'},
      { test: /\.(xls|xlsx|csv)?$/, loader: 'file?name=[name].[ext]' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=fonts/[name].[ext]" },
      { test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000&name=fonts/[name].[ext]" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream&name=fonts/[name].[ext]" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml&name=fonts/[name].[ext]" }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new HtmlWebpackPlugin({
      title: '手机设备管理',
      filename: 'index.html',
      inject: 'body',
      favicon: '../public/images/icon.ico',
      hash: true
    }),
    new webpack.DefinePlugin({
      'systemname': '"mobilemanage"',
      'systemnamecn': '"手机设备管理"',
      'process.env.NODE_ENV': '"production"'
    }),
  ]
};

module.exports = config;
