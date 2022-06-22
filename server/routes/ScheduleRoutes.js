const {
  getAllSchedulesByStore,
  getMySchedulesFrom,
} = require("../../model/scheduleModel");

let express = require("express");
let router = express.Router();
const moment = require("moment");

const formatSchedData = (data) => {
  const res = [];
  data.map((emp) => {
    const dataObj = {
      userId: emp.User_idUser,
      firstname: emp.user.firstname,
      lastname: emp.user.lastname,
      position: emp.userprofile.name,
      schedules: emp.user.schedule,
    };
    emp.user.inactive === false && res.push(dataObj);
  });
  return res;
};
//Get all schedules in a period in a store
router.get("/week", async (req, res) => {
  //All employee Schedule
  const storeId = req.query.storeId * 1;
  const startDayofWeek = req.query.startDay;
  const endDayofWeek = moment(startDayofWeek, "YYYY-MM-DD")
    .clone()
    .endOf("week")
    .format();
  console.log("period", new Date(startDayofWeek), endDayofWeek);

  const allSchedules = await getAllSchedulesByStore(
    storeId,
    startDayofWeek,
    endDayofWeek
  );

  const weekSchedData =formatSchedData(allSchedules);

  res.json(weekSchedData);
});

router.get("/day", async (req, res) => {
  //All emplyees schedules
  const storeId = req.query.storeId * 1;
  const day = req.query.day;

  const startDay = moment(day, "YYYY-MM-DD").clone().startOf("day").format();
  const endDay = moment(day, "YYYY-MM-DD").clone().endOf("day").format();
  console.log("getting data from " + startDay + "to" + endDay);
  const dayScheds = await getAllSchedulesByStore(storeId, startDay, endDay);
  const daySchedsData =formatSchedData(dayScheds);
  res.json(daySchedsData);
});

router.get("/mySchedules", async (req, res) => {
  const storeId = req.query.storeId * 1;
  const myId = req.query.myId*1;
  const from = req.query.from;
  const day = moment(from,"YYYY-MM-DD" ).clone().format();

  console.log("myschedule", storeId, myId, from);
  const scheduleData = await getMySchedulesFrom(storeId, myId, day);
  const mySchedules = formatSchedData(scheduleData)[0];
  res.json(mySchedules)
});

module.exports = router;
