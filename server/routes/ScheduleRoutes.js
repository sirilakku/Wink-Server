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
router.get("/store/:storeId", async (req, res) => {
  //All employee Schedule
  const storeId = req.params.storeId * 1;
  const allSchedules = await getAllSchedulesByStore(storeId);

  res.json(allSchedules);
});


module.exports = router;
