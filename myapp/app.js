//安装了nodemon插件实现热更新，npm start启动
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
// 允许来自所有域名的请求
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json())

const userRouter = require('./routes/users.js')
// 将 /api/users 路径下的请求交给 userRouter 处理
app.use('/api', userRouter);
// const indexRouter = require('./routes/index')
// app.use('/',indexRouter)
app.listen(3018, () => {
    console.log('api server running at http://127.0.0.1:3018')
})