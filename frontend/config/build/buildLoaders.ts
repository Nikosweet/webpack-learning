import { ModuleOptions } from "webpack";
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { BuildOptions } from "./types/types";
export function buildLoaders(option: BuildOptions): ModuleOptions['rules'] {
  return  [
            {
              test: /\.s[ac]ss?$/i,
              use: [
                MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: {
                    modules: {
                      localIdentName: '[name]_[local]__[hash:base64:5]',
                      exportLocalsConvention: 'camelCaseOnly',
                      namedExport: true,
                      exportOnlyLocals: false,
                    },
                    importLoaders: 2,
                  }
                },
                'sass-loader'
                ],
            },
            {
              test: /\.tsx?$/,
              use: {
                loader: 'ts-loader',
                options: {
                  transpileOnly: true
                }
              },
              exclude: /node_modules/,
            },
          ]
}