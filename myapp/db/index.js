//数据库连接文件
const mysql = require('mysql');

// 创建数据库连接池
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '000000',
    database: 'user',
    port: 3306 ,// 指定连接端口号
    timezone:"SYSTEM"
});

// 查询函数
function query(sql, params, callback) {
    pool.query(sql, params, (error, results) => {
        if (error) {
            return callback(error);
        }
        callback(null, results);
    });
}

module.exports = {
    query
};