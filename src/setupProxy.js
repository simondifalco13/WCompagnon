const { createProxyMiddleware } = require("http-proxy-middleware")
module.exports = function (app) {
  console.log("Starting proxy middleware")
  app.use(
    "/api",
    createProxyMiddleware({
      target: process.env.BACK_URL,
      changeOrigin: true,
      secure: false
    })
  )
}