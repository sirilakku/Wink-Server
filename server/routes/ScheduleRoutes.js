const {
  getUserSchedsByStore,
  getCoworkersSchedsByStore,
  getMySchedulesFrom,
  getSchedulesToSwap,
  createSched,
  editSched
} = require("../../model/scheduleModel");

let express = require("express");
let router = express.Router();
const moment = require("moment");

const formatSchedData = (data) => {
  const res = [];
  data?.map((emp) => {
    const dataObj = {
      userId: emp.User_idUser,
      storeId: emp.Store_idStore,
      firstname: emp.user.firstname,
      lastname: emp.user.lastname,
      positionId: emp.userprofile.idUserProfile,
      position: emp.userprofile.name,
      schedules: emp.user.schedule,
      availability: emp.user.employee_sched_availability&&emp.user.employee_sched_availability[0] 
    };
    emp.user.inactive === false && res.push(dataObj);
  });
  return res;
};


//middleware to check admin
const restrictTo = async(req,res,next)=>{
  console.log("req",req.user)
  next()
}


router.get("/monthly", async (req, res) => {
  const storeId = req.query.storeId * 1;
  const userId = req.query.userId * 1;
  const startDayOfMonth = req.query.startOfMonth;
  const endOfMonth = moment(startDayOfMonth, "YYYY-MM-DD")
    .clone()
    .endOf("month")
    .format();
  console.log("period in month", new Date(startDayOfMonth), endOfMonth);
  // console.log(" end period in month",  endOfMonth);

  const monthlySchedule = getUserSchedsByStore(
    storeId,
    userId,
    startDayOfMonth,
    endOfMonth
  );
  const userData = await monthlySchedule;
  const monthlyUserData = formatSchedData(userData);
  res.json({ mySchedules: monthlyUserData });
  // console.log("monthlyUserData",monthlyUserData)
});

//Get all schedules in a period in a store
router.get("/week", async (req, res) => {
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
  console.log('scheds', userData, coworkersData)
  const weekUserData = formatSchedData(userData);
  const weekCoworkersData = formatSchedData(coworkersData);
  res.json({
    mySchedules: weekUserData,
    coworkersSchedules: weekCoworkersData,
  });
});

router.get("/day", async (req, res) => {
  //All emplyees schedules
  const storeId = req.query.storeId * 1;
  const userId = req.query.userId * 1;
  const day = req.query.day;

  const startDay = moment(day, "YYYY-MM-DD").clone().startOf("day").format();
  const endDay = moment(day, "YYYY-MM-DD").clone().endOf("day").format();
  console.log("getting data from " + startDay + "to" + endDay);

  const userSchedules = getUserSchedsByStore(storeId, userId, startDay, endDay);
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
  res.json({ mySchedules: dayUserData, coworkersSchedules: dayCoworkersData });
});

router.get("/shiftswap", async (req, res) => {
  const storeId = req.query.storeId * 1;
  const myId = req.query.myId * 1;
  const from = req.query.from;
  const day = moment(from, "YYYY-MM-DD").clone().format();

  console.log("myschedule", storeId, myId, from);
  const scheduleData = await getMySchedulesFrom(storeId, myId, day);
  const mySchedules = formatSchedData(scheduleData)[0];
  const schedulesToSwap = await getSchedulesToSwap(
    storeId,
    myId,
    mySchedules.positionId,
    day
  );
  // console.log("a",schedulesToSwap)
  const othersSchedules = formatSchedData(schedulesToSwap);
  res.json({ mySchedules: mySchedules, schedulestoSwap: othersSchedules });
});

router.post("/shiftswap", async (req, res) => {
  const request = req.body;
  console.log("Shift swap request", request);
  res.status(200).json();
});



router.post("/scheduling",restrictTo, async (req, res) => {
  try {
    const { User_idUser, Store_idStore, starttime, endtime, workcode,archived } =
      req.body;
    // console.log("creating schedule with", req.body);
    await createSched(User_idUser, Store_idStore, starttime, endtime, workcode,archived);

    res.status(200).json({ message: "success" });
  } catch (err) {
    console.log("error while creating schedule", err);
  }
});
router.patch("/scheduling", async (req, res) => {
  try {
    const { User_idUser, Store_idStore, starttime, endtime, workcode , idSchedule,archived} =
      req.body;
    console.log("editing schedule to", req.body);
    await editSched(User_idUser, Store_idStore, starttime, endtime, workcode, idSchedule,archived);

    res.status(200).json({ message: "success" });
  } catch (err) {
    console.log("error while creating schedule", err);
  }
});




module.exports = router;
