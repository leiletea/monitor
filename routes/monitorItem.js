/**
 * Created by admin on 2017/1/6.
 */

var express = require('express');
var router = express.Router();
/*var logger = require('../log').logger;*/
var monitorItemDao = require('../dao/monitorItemDao');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('monitorItem');
});

// 增加用户
router.post('/addMonitorItem', function (req, res, next) {
    monitorItemDao.add(req, res, next);
});

router.get('/add', function (req, res, next) {
    res.render("addMonitorItem");
});

router.get('/queryAll', function (req, res, next) {
    monitorItemDao.queryAll(req, res, next);
});

router.get('/query', function (req, res, next) {
    monitorItemDao.queryById(req, res, next);
});

router.get('/delete', function (req, res, next) {
    monitorItemDao.delete(req, res, next);
});

router.get('/queryById', function (req, res, next) {
    monitorItemDao.queryById(req, res, next);
});

router.post('/update', function (req, res, next) {
    monitorItemDao.update(req, res, next);
});

router.post('/runService', function (req, res, next) {
    monitorItemDao.runService(req, res, next);
});

module.exports = router;