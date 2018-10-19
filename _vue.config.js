module.exports = {
  devServer: {
    proxy: {
      'App/': {
        target: 'http://teola.digitalcenter.cn/TEConsoleEX-Test',
        changeOrigin: true
      }
    }
  }
};
