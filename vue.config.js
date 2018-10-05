module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.11.144',
        changeOrigin: true
      }
    }
  }
};
