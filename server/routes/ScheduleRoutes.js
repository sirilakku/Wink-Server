const getAllSchedulesByStore = require("../../model/scheduleModel");

let express = require("express");
let router = express.Router();

router.get("/store/:storeId", async (req, res) => {
  //All employee Schedule
  const storeId = req.params.storeId*1 ;
  const allSchedules = await getAllSchedulesByStore(storeId);

  res.json(allSchedules);
});


module.exports = router;
