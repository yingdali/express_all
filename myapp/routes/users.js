
const express = require('express');
const bodyParser = require('body-parser');
const db = require('../db');
const router = express.Router();
router.use(bodyParser.json());
//带分页查询
function getUsersByPage(page, limit, callback) {
    const offset = (page - 1) * limit;
    //page 参数表示要获取哪一页的数据，limit 参数指示每页要显示多少条数据，callback 则是在查询完成后将被调用以返回结果。
    //函数首先计算出 offset 值，即从第几条记录开始查询，然后执行一条 SELECT 查询语句从 user 表中选择从 offset 开始的 limit 条记录。
    //在成功检索到结果后，该函数再次执行一条 SELECT 语句来计算 user 表中的总记录数，以便于计算总页数。
    db.query('SELECT * FROM user LIMIT ?, ?', [offset, limit], (error, results) => {
        //SELECT * FROM user LIMIT ?, ? 是一条 SQL 查询语句，用于从 user 表中选择一定数量的行，并跳过指定数量的行。

        //其中，LIMIT 子句用于限制查询结果集的大小，而 ? 则是占位符，表示在运行查询时将被实际的值替换。在该查询语句中，第一个 ? 代表要跳过的记录数（即偏移量），而第二个 ? 则表示要获取的记录数（即每页显示的记录数）。这两个参数会根据具体情况进行计算并传递给查询语句作为参数。

        //使用占位符可以避免在 SQL 查询中直接拼接变量所带来的安全隐患和 SQL 注入攻击风险，同时还能提高查询性能和可读性。此外，使用占位符还可以避免在查询中出现语法错误或数据类型不匹配等问题。
        if (error) return callback(error);
        // console.log('111', results);
        //查询总页数total
        const query = "SELECT COUNT(*) AS total FROM user";
        db.query(query, (error, countResults) => {
            if (error) return callback(error);
            const total = countResults[0].total;
            callback(null, results, total);
        });
    });
}
router.get('/users', (req, res) => {
    //如果用户传了页数，页码 
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    // console.log('limit',page,limit);
    getUsersByPage(page, limit, (error, results, total) => {
        if (error) {
            return res.status(500).json({
                error
            });
        } else {
            res.json({
                msg: "请求成功",
                ok: true,
                total: total,
                results
            })
        }
    });
});


// 获取指定 name 的用户
function getUserByName(name, callback) {
    db.query('SELECT * FROM user WHERE name = ?', [name], callback);
}
router.get('/user/:name', (req, res) => {
    const name = req.params.name;
    getUserByName(name, (error, results) => {
        if (error) {
            return res.status(500).json({
                error
            });
        }
        if (results.length === 0) {
            return res.status(404).json({
                error: 'Not found'
            });
        }
        res.json(results[0]);
    });
});

// 添加一个用户
function addUser(name, address, dob, callback) {
    db.query('INSERT INTO user SET ?', {
        name,
        address,
        dob
    }, callback);
}
router.post('/user', (req, res) => {
    const {
        name,
        address,
        dob
    } = req.body.params;
    console.log('add', name, address, dob);
    if (!name || !address || !dob) {
        return res.status(400).json({
            error: 'Name, address,dob are required'
        });
    }
    addUser(name, address, dob, (error, results) => {
        if (error) {
            console.log('500erro' + error);
            return res.status(500).json({
                message: error,
                code: 1
            });
        }
        res.status(200).json({
            message: '添加成功',
            code: 0
        });
    });
});

// 更新指定 id 的用户
function updateUserById(id, name, address, dob, callback) {
    db.query('UPDATE user SET ? WHERE id = ?', [{
        name,
        address,
        dob
    }, id], callback);
}
router.put('/user/:id', (req, res) => {
    const id = req.params.id;
    const {
        name,
        address,
        dob
    } = req.body.params;
    if (!name || !address || !dob) {
        return res.status(400).json({
            error: 'Name, address,dob are required'
        });
    }
    updateUserById(id, name, address, dob, (error, results) => {
        if (error) {
            return res.status(500).json({
                message: error,
                code: 1
            });
        }
        // if (results.affectedRows === 0) {
        //     return res.status(404).json({
        //         error: 'Not found'
        //     });
        // }
        const user = {
            id,
            address,
            dob
        };
        res.status(200).json({
            message: '修改成功',
            code: 0,
            data: user
        });

    });
});

// 删除指定 id 的用户
function deleteUserById(id, callback) {
    db.query('DELETE FROM user WHERE id = ?', [id], callback);
}
router.delete('/user/:id', (req, res) => {
    const id = req.params.id;
    deleteUserById(id, (error, results) => {
        if (error) {
            console.log('delete', error);
            return res.status(500).json({
                message: '删除失败',
                code: 1
            });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({
                error: 'Not found'
            });
        }
        res.status(200).json({
            message: '删除成功',
            code: 0
        });
        // res.sendStatus(204);
    });
});

module.exports = router;