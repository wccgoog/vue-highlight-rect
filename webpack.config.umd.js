const { merge } = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const baseConfig = require('./webpack.base.js')

module.exports = merge(baseConfig, {
  output: {
    filename: 'vue-highlight-rect.umd.js',
    library: {
      name: 'VueHighlightRect',
      type: 'umd',
      export: 'default'
    },
    globalObject: 'typeof self !== \'undefined\' ? self : this'
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false
          }
        },
        extractComments: false
      })
    ]
  }
})