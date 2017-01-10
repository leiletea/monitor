var express = require('express');
var router = express.Router();
/*var logger = require('../log').logger;*/
router.get('/', function (req, res, next) {
    res.render('index');
});
module.exports = router;
