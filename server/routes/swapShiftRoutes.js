const {
  getMySchedulesFrom,
  getSchedulesToSwap,
  createSwapShiftReq,
} = require("../../model/swapShiftModel");
const formatSchedData = require("../utilities/function");
let express = require("express");
let router = express.Router();
const moment = require("moment");

router.get("/swapShiftRequest", async (req, res) => {
  try {
    const storeId = req.query.storeId * 1;
    const myId = req.query.myId * 1;
    const from = req.query.from;
    const day = moment(from, "YYYY-MM-DD").clone().format();

    console.log("myschedule", storeId, myId, from);
    const scheduleData = await getMySchedulesFrom(storeId, myId, day);
    const mySchedules = formatSchedData(scheduleData)[0];
    console.log("a", scheduleData);
    const schedulesToSwap = await getSchedulesToSwap(
      storeId,
      myId,
      mySchedules.positionId,
      day
    );
    const othersSchedules = formatSchedData(schedulesToSwap);
    res.json({ mySchedules: mySchedules, schedulestoSwap: othersSchedules });
  } catch (err) {
    console.log("Error in swapShiftRequest");
  }
});

router.post("/swapShiftRequest", async (req, res) => {
  try {
    const request = req.body;
    console.log("Shift swap request", request);
    const { userId, storeId, reason, swapAvailableId, scheduleId } = req.body;
    await createSwapShiftReq(
      userId,
      storeId,
      reason,
      swapAvailableId,
      scheduleId
    );

    res.status(200).json("success");
  } catch (err) {
    console.log("error in swapShiftRequest", err);
  }
});

module.exports = router;
