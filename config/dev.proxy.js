module.exports = {
  '/root/': {
    target: 'http://gift.cbuyok.com:6698/',
    changeOrigin: true,
    pathRewrite: {
      '^/root/': ''
    }
  }
}
