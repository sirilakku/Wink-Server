const userByName  = require("../../model/userModel")

let express = require('express');
const { welcome, login, monthlyCalendar, user} = require('../../model/functions');
let router = express.Router();

/* GET home page. */
router.get('/', welcome);

 //router.get('/login', login)

router.get('/monthlyCalendar', monthlyCalendar)

router.post("/login", async (req, res) => {
    const user = req.body.username

    const username = await userByName(user)

    console.log('Hello username', username)
    console.log('Hello user', user)
    res.send(user.firstname)
})

module.exports = router;
