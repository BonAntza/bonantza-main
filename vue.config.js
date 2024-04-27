module.exports = {
  configureWebpack: {
    externals: {
      './scripts/generateSalt.js': 'commonjs ./scripts/generateSalt.js'
    }
  },
};