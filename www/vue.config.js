module.exports = {
  devServer: {
    proxy: {
      '/reservations' : {
        target: 'http://localhost:3000'
      }
    }
  }
}
