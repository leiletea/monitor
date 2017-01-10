/**
 * Created by admin on 2017/1/6.
 */
var monitorItem = {
    insert: 'INSERT INTO MONITOR_ITEM(NAME,PORT,RUN_CMD) VALUES(?,?,?)',
    update: 'UPDATE MONITOR_ITEM SET NAME=?, PORT=?,RUN_CMD=? WHERE ID=?',
    delete: 'DELETE FROM MONITOR_ITEM WHERE ID=?',
    queryById: 'SELECT * FROM MONITOR_ITEM WHERE ID=?',
    queryAll: 'SELECT mi.ID id,mi.NAME name,mi.PORT port,mi.RUN_CMD runCmd FROM MONITOR_ITEM mi',
    queryPage: 'SELECT * FROM MONITOR_ITEM LIMIT ? OFFSET ?'
};
module.exports = monitorItem;