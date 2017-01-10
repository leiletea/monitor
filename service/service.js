/**
 * Created by admin on 2016/12/28.
 */

var db = undefined;
var cp = require('child_process2');
var sqlite3 = require('sqlite3');
var monitorDao = require("../dao/monitorDao");
var monitorItemDao = require("../dao/monitorItemDao");

var options = {
    encoding: 'utf8',
    timeout: 0,
    maxBuffer: 200 * 1024,
    killSignal: 'SIGTERM',
    setsid: false,
    cwd: null,
    env: null
};

function monitor() {
    this.id = 0;
    this.name = "";
    this.state = "0";
    this.cpu = "";
    this.memory = "";
    this.disk = "";
}

function monitorItem() {
    this.id = 0;
    this.name = "";
    this.port = "0";
    this.runCmd = "";
}


function doMonitor() {
    monitorItemDao.queryAllItem(function (result) {
        for (var i = 0; i < result.length; i++) {
            console.log(result[i]);
            writeProcessInfo2DB(result[i]);
        }
    });
}

function writeProcessInfo2DB(monitorItem) {
    var pid = "", result;
    var cmd = "lsof -i :" + monitorItem.port;
    cp.exec(cmd, options, function (error, stdout, stderr) {
        result = parseProcess(stdout, [1]);

        pid = result[0];
        if (pid == undefined) {
            //失败记录写入到表中
            var m = new monitor();
            m.itemId = monitorItem.id;
            monitorDao.add(m);
            //执行启动命令
            runCmd(monitorItem.runCmd);
            return;
        }
        cmd = "top -b-p " + pid + " -n 1";
        cp.exec(cmd, options, function (e, stdout, stderr) {
            if (e) {
                console.error("exec error: ${error}");
                return;
            }
            result = parseProcess(stdout, [0, 8, 9]);
            console.log(result);
            //写入数据到db
            var m = new monitor();
            m.itemId = monitorItem.id;
            m.state = 1;
            m.cpu = result[1];
            m.memory = result[2];
            monitorDao.add(m);
        });
    });
}

function runCmd(cmd) {
    cp.exec(cmd, options, function (e, stdout, stderr) {
        if (e) {
            console.log("exec cmd error:" + e);
        } else {
            console.log("exec cmd success:" + cmd);
        }
    });
}

function parseProcess(data, indexArr) {
    var temp = data.toString(), lines = temp.split(/(\r?\n)/g);
    var length = lines.length;
    var str;
    var result = [];
    for (var i = length - 1; i >= 0; i--) {
        str = lines[i].trim();
        if (str != "") break;
    }
    if (str != "") {
        var values = str.split(" ");
        values = removeEmptyItem(values);
        for (i = 0; i < indexArr.length; i++) {
            result[i] = values[indexArr[i]];
        }
    }
    return result;
}

function removeEmptyItem(arr) {
    var newArr = [];
    var j = 0;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] != "") {
            newArr[j] = arr[i];
            j++
        }
    }
    return newArr;
}


setInterval(function () {
    doMonitor();
    console.log(123);
}, 10 * 60 * 1000);

exports.doMonitor = doMonitor;