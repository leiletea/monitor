/**
 * Created by admin on 2017/1/6.
 */
var sqlite3 = require('sqlite3');
var $monitorSql = require('./monitorSqlMapping');

var db = new sqlite3.Database('sqlite.db');

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

module.exports = {
    add: function (data) {
        db.run($monitorSql.insert, [data.itemId, data.state, data.cpu, data.memory, data.disk], function (err, result) {
            if (result) {

            } else {
                
            }
        });
    },

    queryAll: function (req, res, next) {
        db.all($monitorSql.queryAll, function (err, result) {
            if (err) {
                console.log(err);
            }
            jsonWrite(res, result);
        });
    },
    queryPage: function (req, res, next) {
        var param = req.query || req.params;
        var ps = param.ps;
        var cp = param.cp;
        if (!ps) ps = 20;
        if (!cp)  cp = 1;
        var offset = ps * (cp - 1);

        var data = {cp: cp, total: 0};

        db.all($monitorSql.queryCount, function (err, result) {
            if (result) {
                data.total = Math.ceil(result[0].count);
            }
        });
        console.log("offset:" + offset);
        db.all($monitorSql.queryPage, [ps, offset], function (err, result) {
            if (err) {
                console.log(err);
            }
            data.items = result;
            jsonWrite(res, data);

        });
    }
};