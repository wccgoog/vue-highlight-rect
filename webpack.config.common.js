const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')

module.exports = merge(baseConfig, {
  output: {
    filename: 'vue-highlight-rect.common.js',
    library: {
      type: 'commonjs2'
    }
  }
})