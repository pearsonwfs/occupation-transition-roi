import CopyPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { Configuration } from 'webpack';

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require('./package.json').dependencies;

const isDev = process.env.NODE_ENV === 'development';
const publicPath = `${process.env.PUBLIC_URL}/`;

const baseConfig: Configuration = {
  entry: path.join(__dirname, 'src', 'index'),
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  resolve: {
    alias: {
      assets: path.resolve(__dirname, 'src/assets'),
      components: path.resolve(__dirname, 'src/components'),
      utils: path.resolve(__dirname, 'src/utils'),
      hooks: path.resolve(__dirname, 'src/hooks'),
      constants: path.resolve(__dirname, 'src/constants'),
      styles: path.resolve(__dirname, 'src/styles'),
      screens: path.resolve(__dirname, 'src/screens'),
      requests: path.resolve(__dirname, 'src/requests'),
      apis: path.resolve(__dirname, 'src/redux/api'),
      '@typings': path.resolve(__dirname, './typings'),
      'styled-components': path.resolve(
        __dirname,
        'node_modules/styled-components'
      ),
      react: path.resolve(__dirname, 'node_modules/react'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'auto',
  },
  plugins: [
    new ModuleFederationPlugin({ name: 'occupationTransitionRoi',
      filename: 'remoteEntry.js',
      exposes: {
'./OccupationTransitionRoi': './src/apps/OccupationTransitionRoi/OccupationTransitionRoi',
// Insert your apps here
        './SampleApp': './src/apps/SampleApp/SampleApp',},
      shared: {
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
      templateParameters: {
        PUBLIC_URL: process.env.PUBLIC_URL ? publicPath : '/',
      },
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'env'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
  ],
};

const webpackDevConfig: Configuration = {
  ...baseConfig,
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 5001,
    historyApiFallback: true,
  },
};

const webpackProdConfig: Configuration = {
  ...baseConfig,
  mode: 'production',
  optimization: {
    minimize: true,
    splitChunks: {
      cacheGroups: {
        default: false,
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};

const webpackConfig = isDev ? webpackDevConfig : webpackProdConfig;

export default webpackConfig;
