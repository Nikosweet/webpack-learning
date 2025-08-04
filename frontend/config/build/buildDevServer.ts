import type { Configuration as DevServerConfiguration } from "webpack-dev-server"
import path from "path"
import { BuildOptions } from "./types/types"
export function buildDevServer(options: BuildOptions): DevServerConfiguration {
  return  {
            open: true,
            port: options.port,
            historyApiFallback: true,
            hot: true
          }
}