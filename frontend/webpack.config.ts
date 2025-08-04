import webpack from 'webpack'
import { buildWebpack } from './config/build/buildWebpack'
import { BuildPaths } from './config/build/types/types'
import path from 'path'

type Env = {
  mode: 'production' | 'development',
  port: number;
  analyzer: boolean;
}

module.exports = (env: Env) => {
  const paths: BuildPaths = {
     output: path.resolve(__dirname, 'build'),
     entry: path.resolve(__dirname, 'src', 'index.tsx'),
     html: path.resolve(__dirname, 'public', 'index.html'),
  }
  const config: webpack.Configuration = buildWebpack({
    mode: env.mode,
    port: env.port ?? 3000,
    paths: paths,
    analyzer: env.analyzer
  })
  return config
}