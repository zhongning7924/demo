var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var node_modules_dir = path.join(__dirname, 'node_modules');
var config = {
  entry: ['./app/scripts/main.jsx'],
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'app.js'
  },
  resolve: {
    root: [
      path.join(__dirname, 'node_modules'),
      path.join(__dirname, 'app'),
      path.join(__dirname, 'app/scripts'),
      path.join(__dirname, 'app/scripts/components'),
    ],
    alias: {
      'bootstrap.css': node_modules_dir + '/bootstrap/dist/css/bootstrap.css',
      // third-partys
      'public': path.join(__dirname, '../public'),
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
        query: {
          presets:[
            // not use 'react, es2015' because of importing third-party folder: public
            require.resolve('babel-preset-es2015'),
            require.resolve('babel-preset-react'),
          ],
          env: {
            // for react hot module replacement
            development: {
              plugins: [
                [require.resolve('babel-plugin-react-transform'), {
                  transforms: [{
                    transform: 'react-transform-hmr',
                    imports: ['react'],
                    locals: ['module']
                  }, {
                    transform: 'react-transform-catch-errors',
                    imports: ['react', 'redbox-react']
                  }]
                }]
              ]
            }
          }
        }
      },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.(png|jpg|gif)$/, loader: 'url?limit=25000'},
      { test: /\.(xls|xlsx|csv)$/, loader: 'url?limit=8&mimetype=application/vnd.ms-excel' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.(woff|woff2)$/, loader:'url?prefix=font/&limit=5000' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '手机设备管理',
      filename: 'index.html',
      inject: 'body',
      // favicon: '../public/images/icon.ico',
      hash: true
    }),
    new webpack.DefinePlugin({
      'systemname': '"mobilemanage"',
      'systemnamecn': '"手机设备管理"',
      'disablepathauth': 'true',
    }),
    new webpack.ProvidePlugin({
    React: "react"
    }),
  ],
  // devServer: {
    
  // },
};

module.exports = config;
