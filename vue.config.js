module.exports = {
  devServer: {
    proxy: {
      '/': {
        target: 'http://192.168.11.144',
        changeOrigin: true
      }
    }
  }
};
