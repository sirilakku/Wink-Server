let express = require('express');
const { welcome, login, monthlyCalendar} = require('../../model/functions');
let router = express.Router();
let database = require('../../model/mySql')


/* GET home page. */
router.get('/', welcome);

router.get('/login', login)

 router.get('/monthlyCalendar', monthlyCalendar)

// router.post('/login', ()=>{

// })

module.exports = router;
