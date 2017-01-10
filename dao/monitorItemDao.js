/**
 * Created by admin on 2017/1/6.
 */
/*var logger = require('../log').logger;*/
var sqlite3 = require('sqlite3');
var process = require('child_process2');
var $monitorItemSql = require('./monitorItemSqlMapping');

var db = new sqlite3.Database('sqlite.db');


var options = {
    encoding: 'utf8',
    timeout: 0,
    maxBuffer: 200 * 1024,
    killSignal: 'SIGTERM',
    setsid: false,
    cwd: null,
    env: null
};

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
    add: function (req, res, next) {
        db.run($monitorItemSql.insert, [param.name, param.port, param.runCmd], function (err) {
            var result;
            if (!err) {
                result = {
                    code: 200,
                    msg: '增加成功'
                };
            }
            // 以json形式，把操作结果返回给前台页面
            jsonWrite(res, result);
        });
    },
    delete: function (req, res, next) {
        // delete by Id
        var id = +req.query.id;
        db.run($monitorItemSql.delete, id, function (err) {
            var result;
            if (!err) {
                result = {
                    code: 200,
                    msg: '删除成功'
                };
            } else {
                result = void 0;
            }
            jsonWrite(res, result);
        });
    },
    update: function (req, res, next) {
        // update by id
        // 为了简单，要求同时传name和age两个参数
        var param = req.body;
        if (param.name == null || param.port == null || param.runCmd == null) {
            jsonWrite(res, undefined);
            return;
        }
        db.run($monitorItemSql.update, [param.name, param.port, param.runCmd, param.id], function (err, result) {
            // 使用页面进行跳转提示
            if (result.affectedRows > 0) {
                result = {
                    code: 200,
                    msg: '更新成功'
                };
            } else {
                result = void 0;
            }
            jsonWrite(res, result);
        });

    },
    queryById: function (req, res, next) {
        var id = +req.query.id; // 为了拼凑正确的sql语句，这里要转下整数
        db.all($monitorItemSql.queryById, id, function (err, result) {
            jsonWrite(res, result);
        });
    },

    runService: function (req, res, next) {
        var id = +req.body.id;
        console.log(req.body);
        db.all($monitorItemSql.queryById, id, function (err, result) {
            if (err) {
                result = void 0;
                jsonWrite(res, result);
            } else {
                console.log(result);
                if (result.length == 0) {
                    result = {
                        code: 1,
                        msg: '找不到配置项，请检查配置表数据'
                    };
                    jsonWrite(res, result);
                } else {
                    var cmd = result[0].RUN_CMD;
                    if (cmd) {
                        process.exec(cmd, options, function (e, stdout, stderr) {
                            if (e) {
                                result = {
                                    code: 1,
                                    msg: '执行命令报错：' + e
                                };
                            } else {
                                result = {
                                    code: 200,
                                    msg: '操作成功'
                                };

                            }
                            jsonWrite(res, result);
                        });
                    } else {
                        result = {
                            code: 1,
                            msg: '请配置启动命令'
                        };
                        jsonWrite(res, result);
                    }
                }

            }
        });
    },
    queryAll: function (req, res, next) {
        db.all($monitorItemSql.queryAll, function (err, result) {
            if (err) {
                console.log(err);
            }
            jsonWrite(res, result);
        });
    },
    queryAllItem: function (callBack) {
        db.all($monitorItemSql.queryAll, function (err, result) {
            if (err) {
                console.log(err);
            }
            callBack(result);
        });
    }
};