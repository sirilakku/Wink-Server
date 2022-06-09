
let express = require('express');
let router = express.Router();


router.get('/schedule', async(req, res) =>{
    //All employee Schedule
    //StoreID
})
router.get('/userSchedule/:storeId/:userId', async(req, res) =>{
    // userID, storeID
    const storeId = req.params.storeId
    let userId = req.params.userId
    let schedule = await prisma.$queryRaw`SELECT * FROM schedule WHERE UserId=${userId} AND storeID = ${storeId}`
    res.send(schedule)
    
})
router.get('/coworkerSchedule', async(req, res) =>{
    // Co-workers Schedule
    
})

module.exports = router;