var express = require('express');
var router = express.Router();
/*var logger = require('../log').logger;*/
var monitorDao = require('../dao/monitorDao');
var services = require('../service/service');


router.get('/queryPage', function (req, res, next) {
    monitorDao.queryPage(req, res, next);
});

router.get('/', function (req, res, next) {
    res.render('monitor');
});


router.get('/queryAll', function (req, res, next) {
    monitorDao.queryAll(req, res, next);
});

module.exports = router;
