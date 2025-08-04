import { Configuration } from "webpack";
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/types";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";


export function buildPlugins({analyzer, paths}: BuildOptions): Configuration['plugins'] {

  const plugins: Array<HtmlWebpackPlugin | MiniCssExtractPlugin | BundleAnalyzerPlugin> = [
    new HtmlWebpackPlugin({template: paths.html}),
    new MiniCssExtractPlugin({filename: 'css/[name].[contenthash:8].css', chunkFilename: 'css/[name].[contenthash:8].css',}),
  ]

  if (analyzer) plugins.push(new BundleAnalyzerPlugin())

  return plugins
}