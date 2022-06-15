const {
  getAllSchedulesByStore,
  getPositionsByStore,
} = require("../../model/scheduleModel");

let express = require("express");
let router = express.Router();

//Get all postions in store
router.get("/positions/store/:storeId", async (req, res) => {
  const storeId = req.params.storeId * 1;
  const allPositions = await getPositionsByStore(storeId);
  res.json({ positions: allPositions });
});

// //Get user schedule summary in a week period
// router.get('/userSummary/:previlegesId', async(req,res)=>{
  
// })

//Get all schedules in a period in a store
router.get("/week", async (req, res) => {
  //All employee Schedule
  //utc time
  const startDayofWeek = req.query.startDay;
  const storeId = req.query.storeId * 1;
  const allSchedules = await getAllSchedulesByStore(storeId, startDayofWeek);
  // console.log(allSchedules, allSchedules)

  res.json(allSchedules);
});


module.exports = router;
