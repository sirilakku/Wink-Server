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

    console.log(
      `Shift swap request on store id: ${storeId}, user id: ${myId}, from:${from}`
    );
    const scheduleData = await getMySchedulesFrom(storeId, myId, day);
    const schedulesToSwap = await getSchedulesToSwap(
      storeId,
      myId,
      mySchedules.positionId,
      day
    );
    const othersSchedules = formatSchedData(schedulesToSwap);
    const mySchedules = formatSchedData(scheduleData)[0];
    res.json({ mySchedules: mySchedules, schedulestoSwap: othersSchedules });
  } catch (err) {
    console.log("Error to get schedules for swap shift request");
  }
});

router.post("/swapShiftRequest", async (req, res) => {
  try {
    console.log("Shift swap request", req,body);
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
    console.log("Error to create swap shift request", err);
  }
});

module.exports = router;