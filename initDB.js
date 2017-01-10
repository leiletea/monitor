/**
 * Created by admin on 2017/1/6.
 */
var db = undefined;
var sqlite3 = require('sqlite3');

db = new sqlite3.Database('sqlite.db');
function initDB() {
    db = new sqlite3.Database('sqlite.db', function () {
        db.run("create table MONITOR(ID INTEGER PRIMARY KEY AUTOINCREMENT,ITEM_ID INT,STATE VARCHAR(2),CPU VARCHAR(20),MEMORY VARCHAR(20),DISK VARCHAR(20))");
        db.run("CREATE TABLE MONITOR_ITEM(ID INTEGER PRIMARY KEY AUTOINCREMENT,NAME VARCHAR(20),PORT VARCHAR(20),RUN_CMD VARCHAR(1000))", function (err) {
            initData();
        });
    });
}

function initData() {


    var monitorItems = [
        {name: "tomcat", port: "9981", runCmd: "/home/apache-tomcat-8.0.35/bin/startup.sh"},
        {
            name: "weth",
            port: "8545",
            runCmd: "/data/Dapp/bin/weth --datadir /mydata/Dapp/bin/data_0b4032be4e54857312bac66dca9fe2d0_123 --logfile /mydata/Dapp/bin/log_0b4032be4e54857312bac66dca9fe2d0_123 --genesis /mydata/Dapp/bin/genesis_block_0b4032be4e54857312bac66dca9fe2d0_123.json --networkid 123 --port 30303 --rpcport 8545 --rpcaddr 10.135.57.107 --ipcapi admin,db,eth,debug,miner,net,shh,txpool,personal,web3 --genblock 1 --ipcpath /mydata/Dapp/bin/data_0b4032be4e54857312bac66dca9fe2d0_123/weth.ipc --rpc"
        },
        {name: "demo", port: "8888", runCmd: "/data/Dapp/admin_restart.sh"}
    ];
    for (var i in monitorItems) {
        writeMonitorItem(monitorItems[i]);
    }


    var monitors = [
        {item_id: 2, state: "1", cpu: "1.8", memory: "20"},
        {item_id: 2, state: "1", cpu: "1.9", memory: "20"},
        {item_id: 1, state: "1", cpu: "2.0", memory: "20"},
        {item_id: 1, state: "1", cpu: "2.1", memory: "20"},
        {item_id: 2, state: "1", cpu: "2.2", memory: "20"},
        {item_id: 1, state: "1", cpu: "2.3", memory: "20"},
        {item_id: 1, state: "1", cpu: "2.4", memory: "20"},
        {item_id: 1, state: "1", cpu: "2.5", memory: "20"},
        {item_id: 2, state: "1", cpu: "2.6", memory: "20"},
        {item_id: 1, state: "1", cpu: "2.7", memory: "20"}
    ];
    /*for (var i in monitors) {
     writeMonitor(monitors[i]);
     }*/

}


//写入数据
function writeMonitor(data) {
    //写入数据到DB
    db.run("INSERT INTO MONITOR(ITEM_ID, STATE,CPU,MEMORY,DISK) VALUES(?,?,?,?,?)", [data.item_id, data.state, data.cpu, data.memory, data.disk],
        function (err) {
            console.log(err);
        }
    );
}

//写入数据
function writeMonitorItem(data) {
    //写入数据到DB
    db.run("INSERT INTO MONITOR_ITEM(NAME,PORT,RUN_CMD) VALUES(?,?,?)", [data.name, data.port, data.runCmd],
        function (err) {
            console.log(err);
        }
    );
}
initDB();

