import webpack from 'webpack';
import 'webpack-dev-server'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { BuildOptions } from './types/types';

export function buildWebpack(options: BuildOptions): webpack.Configuration {
  return {
      mode: options.mode ?? 'development',
      entry: options.paths.entry,
      output: {
        path: options.paths.output,
        filename: '[name].[contenthash].js',
        clean: true
      },
      plugins: buildPlugins(options),
      module: {
        rules: buildLoaders(options),
      },
      resolve: buildResolvers(options),
      devtool: 'inline-source-map',
      devServer: buildDevServer(options),
      performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
      }
    }
}