const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')

module.exports = merge(baseConfig, {
  output: {
    filename: 'vue-highlight-rect.esm.js',
    library: {
      type: 'module'
    },
    environment: {
      module: true
    }
  },
  experiments: {
    outputModule: true
  }
})