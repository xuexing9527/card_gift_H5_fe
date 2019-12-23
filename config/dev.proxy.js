module.exports = {
  '/users/': {
    target: 'http://localhost:6698/',
    changeOrigin: true,
    // pathRewrite: {
    //   '^/root/': ''
    // }
  }
}
