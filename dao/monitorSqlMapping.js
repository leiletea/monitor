/**
 * Created by admin on 2017/1/6.
 */
var monitor = {
    insert: 'INSERT INTO MONITOR(ITEM_ID, STATE,CPU,MEMORY,DISK) VALUES(?,?,?,?,?)',
    update: 'UPDATE MONITOR SET ITEM_ID=?, STATE=?,CPU=?,MEMORY=?,DISK=? WHERE ID=?',
    delete: 'DELETE FROM MONITOR WHERE ID=?',
    queryById: 'SELECT * FROM MONITOR WHERE ID=?',
    queryAll: 'SELECT * FROM MONITOR',
    queryPage: 'SELECT m.ID id,m.ITEM_ID itemId,mi.name name,m.STATE state,m.CPU cpu,m.MEMORY memory,m.DISK disk FROM MONITOR m,MONITOR_ITEM mi where m.ITEM_ID = mi.id  order by m.id desc limit ? Offset ?',
    queryCount: 'SELECT COUNT(1) count  FROM MONITOR',
    queryTest: 'SELECT * FROM MONITOR ORDER BY ID limit ? Offset ?'
};
module.exports = monitor;