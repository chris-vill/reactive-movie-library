const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode : process.env.NODE_ENV || 'development',
  devtool: 'source-map',
  entry: pathResolve('./src/index.js'),
  watchOptions: {
    poll: true,
    ignored: /node_modules/
  },
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
              sourceMap: true,
              implementation: require('sass')
            }
          }
        ],
        include: /\/(components|pages)\/.*\.(css|sass)$/
      },
      {
        test: /\.(css|sass)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              implementation: require('sass')
            }
          }
        ],
        exclude: /\/(components|pages)\/.*\.(css|sass)$/
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.sass'],
    alias: {
      "@styles": pathResolve('src/styles/'),
      "@components": pathResolve('src/components/'),
      "@hooks": pathResolve('src/hooks/'),
      "@pages": pathResolve('src/pages/'),
      "@context": pathResolve('src/context/'),
      "@assets": pathResolve('assets/'),
      "@core": pathResolve('src/core/')
    }
  },
  output: {
    path: pathResolve('./dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        template : pathResolve('./src/index.html')
    })
  ],
  devServer: {
    contentBase: pathResolve('./dist'),
  },
};

function pathResolve(dir) {
  return path.resolve(__dirname, dir);
}
