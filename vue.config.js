module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://teola.digitalcenter.cn/TEConsoleEX-Test',
        changeOrigin: true
      }
    }
  }
};
