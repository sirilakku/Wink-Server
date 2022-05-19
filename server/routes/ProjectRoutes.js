var express = require('express');
const { welcome } = require('../../model/functions');
var router = express.Router();


/* GET home page. */
router.get('/', welcome);

module.exports = router;
