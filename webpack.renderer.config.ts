import type { Configuration } from 'webpack';

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';
import path from 'path';

export const rendererConfig: Configuration = {
  mode: 'development',
  module: {
    rules,
  },
  entry: path.resolve(__dirname, "src/renderer/renderer.tsx"),
  plugins,
  resolve: {
    alias: {},
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.scss'],
    fallback: {
      "crypto": false,
      "stream": false,
      "os": false,
      "path": false,
      "fs": false,
      "vm": false
    },
  },
};
