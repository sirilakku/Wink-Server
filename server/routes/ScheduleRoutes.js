const {
  getUserSchedsByStore,
  getCoworkersSchedsByStore,
  createSched,
  editSched,
} = require("../../model/scheduleModel");

const formatSchedData = require("../utilities/function");
let express = require("express");
let router = express.Router();
const moment = require("moment");

router.get("/monthly", async (req, res) => {
  try {
    const storeId = req.query.storeId * 1;
    const userId = req.query.userId * 1;
    const startDayOfMonth = req.query.startOfMonth;
    const endOfMonth = moment(startDayOfMonth, "YYYY-MM-DD")
      .clone()
      .endOf("month")
      .format();
    console.log("period in month", new Date(startDayOfMonth), endOfMonth);
    const monthlySchedule = await getUserSchedsByStore(
      storeId,
      userId,
      startDayOfMonth,
      endOfMonth
    );
    console.log("monthlySchedule", monthlySchedule);
    const monthlyUserData = formatSchedData(monthlySchedule);
    res.status(200).json({ mySchedules: monthlyUserData });
  } catch (err) {
    res.status(err.statusCode).json("Error to get monthly schedules", err);
  }
  //console.log("monthlyUserData",monthlyUserData)
});

//Get all schedules in a period in a store
router.get("/weekly", async (req, res) => {
  try {
    //All employee Schedule
    const storeId = req.query.storeId * 1;
    const userId = req.query.userId * 1;
    const startDayofWeek = req.query.startDay;
    const endDayofWeek = moment(startDayofWeek)
      .clone()
      .add(1, "weeks")
      .utc()
      .format();
    console.log("period", startDayofWeek, endDayofWeek);

    const userSchedules = getUserSchedsByStore(
      storeId,
      userId,
      startDayofWeek,
      endDayofWeek
    );
    const coworkersSchedules = getCoworkersSchedsByStore(
      storeId,
      userId,
      startDayofWeek,
      endDayofWeek
    );
    const userData = await userSchedules;
    const coworkersData = await coworkersSchedules;
    // console.log('scheds', userData, coworkersData)
    const weekUserData = formatSchedData(userData);
    const weekCoworkersData = formatSchedData(coworkersData);
    res.json({
      mySchedules: weekUserData,
      coworkersSchedules: weekCoworkersData,
    });
  } catch (err) {
    res.json("Error to get weekly schedules", err);
  }
});

router.get("/daily", async (req, res) => {
  try {
    //All emplyees schedules
    const storeId = req.query.storeId * 1;
    const userId = req.query.userId * 1;
    const day = req.query.day;

    const startDay = moment(day, "YYYY-MM-DD").clone().startOf("day").format();
    const endDay = moment(day, "YYYY-MM-DD").clone().endOf("day").format();
    console.log("getting data from " + startDay + "to" + endDay);

    const userSchedules = getUserSchedsByStore(
      storeId,
      userId,
      startDay,
      endDay
    );
    const coworkersSchedules = getCoworkersSchedsByStore(
      storeId,
      userId,
      startDay,
      endDay
    );
    const userData = await userSchedules;
    const coworkersData = await coworkersSchedules;
    // console.log('scheds', userData, coworkersData)
    const dayUserData = formatSchedData(userData);
    const dayCoworkersData = formatSchedData(coworkersData);
    res.json({
      mySchedules: dayUserData,
      coworkersSchedules: dayCoworkersData,
    });
  } catch (err) {
    res.json("Error to get daily schedules", err);
  }
});

router.post("/scheduling", async (req, res) => {
  try {
    console.log("creating schedule with", req.body);
    const {
      User_idUser,
      Store_idStore,
      starttime,
      endtime,
      workcode,
      archived,
    } = req.body;
    await createSched(
      User_idUser,
      Store_idStore,
      starttime,
      endtime,
      workcode,
      archived
    );

    res.status(200).json({ message: "success" });
  } catch (err) {
    res.json("Error to create schedule", err);
  }
});

router.patch("/scheduling", async (req, res) => {
  try {
    console.log("Editing schedule to", req.body);
    const {
      User_idUser,
      Store_idStore,
      starttime,
      endtime,
      workcode,
      idSchedule,
      archived,
    } = req.body;
    await editSched(
      User_idUser,
      Store_idStore,
      starttime,
      endtime,
      workcode,
      idSchedule,
      archived
    );

    res.status(200).json({ message: "success" });
  } catch (err) {
    res.json("Error to edit/delete schedule", err);
  }
});

module.exports = router;
