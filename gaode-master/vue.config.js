const {
  defineConfig
} = require('@vue/cli-service')
// vue.config.js (Vue CLI 4)
// module.exports = {
//   devServer: {
//     before: app => {
//       app.use(cors())
//     }
//   }
// }
// module.exports = {
//   devServer: {
//     proxy: {
//       '/get': {
//         target: 'http://192.168.100.202:9999',
//         changeOrigin: true,
//         pathRewrite: {
//           '^/get': '/get'
//         }
//       }
//     }
//   }
// }