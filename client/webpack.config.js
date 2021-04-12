const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode : process.env.NODE_ENV || 'development',
  devtool: 'source-map',
  entry: resolve('./src/index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(css|sass)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: "[name]__[local]--[hash:base64:10]"
              },
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ],
        include: /\/components\/.*\.(css|sass)$/
      },
      {
        test: /\.(css|sass)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ],
        exclude: /\/components\/.*\.(css|sass)$/
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.sass']
  },
  output: {
    path: resolve('./dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        template : resolve('./src/index.html')
    })
  ],
  devServer: {
    contentBase: resolve('./dist'),
  },
};

function resolve(dir) {
  return path.resolve(__dirname, dir);
}
