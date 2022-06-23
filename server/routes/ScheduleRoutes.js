const {
  getAllSchedulesByStore,
  getMySchedulesFrom,
  getSchedulesToSwap,
} = require("../../model/scheduleModel");

let express = require("express");
let router = express.Router();
const moment = require("moment");

const formatSchedData = (data) => {
  const res = [];
  data?.map((emp) => {
    const dataObj = {
      userId: emp.User_idUser,
      firstname: emp.user.firstname,
      lastname: emp.user.lastname,
      positionId: emp.userprofile.idUserProfile,
      position: emp.userprofile.name,
      schedules: emp.user.schedule,
    };
    emp.user.inactive === false && res.push(dataObj);
  });
  return res;
};

router.get("/monthly", async (req,res) =>{
  const storeId = req.query.storeId * 1;
  const startOfMonth = req.query.firstDayOfMonth;
  const endOfMonth = moment(startOfMonth,"YYYY-MM-DD")
    .clone()
    .endOf("months")
    .format()
    console.log("period in month", new Date(startOfMonth), endOfMonth);

    // const allMonSchedules = await 
})


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

router.get("/shiftswap", async (req, res) => {
  const storeId = req.query.storeId * 1;
  const myId = req.query.myId*1;
  const from = req.query.from;
  const day = moment(from,"YYYY-MM-DD" ).clone().format();

  console.log("myschedule", storeId, myId, from);
  const scheduleData = await getMySchedulesFrom(storeId, myId, day);
  const mySchedules = formatSchedData(scheduleData)[0];
  const schedulesToSwap = await getSchedulesToSwap(storeId, myId, mySchedules.positionId, day);
  // console.log("a",schedulesToSwap)
  const othersSchedules = formatSchedData(schedulesToSwap)
  res.json({mySchedules:mySchedules,schedulestoSwap:othersSchedules})
});

router.post('/shiftswap', async (req,res)=>{
  const request = req.body;
  console.log("Shift swap request", request)
  res.status(200).json()
})
module.exports = router;
