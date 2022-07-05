const { PrismaClient } = require("@prisma/client");
// using `prisma` in your application to read and write data in DB
const prisma = new PrismaClient();

const getUserSchedsByStore = async (storeId, userId, startDay, endDay) => {
  try {
    const my = await prisma.userprivileges.findMany({
      where: { Store_idStore: storeId, User_idUser: userId },
      select: {
        User_idUser: true,
        userprofile: { select: { name: true } },
        user: {
          select: {
            firstname: true,
            lastname: true,
            inactive: true,
            schedule: {
              where: {
                Store_idStore: storeId,
                endtime: { gte: new Date(startDay) },
                starttime: { lte: new Date(endDay) },
              },
              // select: { workcode: true, starttime: true, endtime: true },
            },
            employee_sched_availability: {
              where: { Store_idStore: storeId },
            },
          },
        },
      },
      orderBy: { userprofile: { name: "asc" } },
    });
    console.log("res", my);
    return my;
  } catch (err) {
    console.log("error to get user's schedules", err);
  }
};
const getCoworkersSchedsByStore = async (storeId, userId, startDay, endDay) => {
  try {
    const exceptMine = await prisma.userprivileges.findMany({
      where: { Store_idStore: storeId, User_idUser: { not: userId } },
      select: {
        User_idUser: true,
        Store_idStore: true,
        userprofile: { select: { name: true } },
        user: {
          select: {
            firstname: true,
            lastname: true,
            inactive: true,
            schedule: {
              where: {
                Store_idStore: storeId,
                endtime: { gte: new Date(startDay) },
                starttime: { lte: new Date(endDay) },
              },
              // select: { workcode: true, starttime: true, endtime: true },
            },
            employee_sched_availability: {
              where: { Store_idStore: storeId },
            },
          },
        },
      },
      orderBy: { userprofile: { name: "asc" } },
    });
    // console.log('res', allEmployees)
    return exceptMine;
  } catch (err) {
    console.log("error to get cowerkers' schedules ", err);
  }
};

const getMySchedulesFrom = async (storeId, myId, from) => {
  try {
    const onlyMy = await prisma.userprivileges.findMany({
      where: { Store_idStore: storeId, User_idUser: myId },
      select: {
        User_idUser: true,
        Store_idStore: true,
        userprofile: { select: { idUserProfile: true, name: true } },
        user: {
          select: {
            firstname: true,
            lastname: true,
            inactive: true,
            schedule: {
              where: {
                Store_idStore: storeId,
                starttime: { gte: new Date(from) },
              },
            },
          },
        },
      },
    });
    // console.log(onlyMy)
    return onlyMy;
  } catch (err) {
    console.log("error to get user schedules", err);
  }
};

const getSchedulesToSwap = async (storeId, myId, positionId, from) => {
  try {
    const data = await prisma.userprivileges.findMany({
      where: {
        Store_idStore: storeId,
        UserProfile_idUserProfile: positionId,
        User_idUser: { not: myId },
      },
      select: {
        User_idUser: true,
        userprofile: { select: { idUserProfile: true, name: true } },
        user: {
          select: {
            firstname: true,
            lastname: true,
            inactive: true,
            schedule: {
              where: {
                Store_idStore: storeId,
                starttime: { gte: new Date(from) },
              },
              select: {
                idSchedule: true,
                workcode: true,
                starttime: true,
                endtime: true,
              },
            },
          },
        },
      },
    });
    // console.log("getSchedules to swap ", data)
    const takenOutEmpty = data.filter((e) => e.user.schedule.length !== 0);
    // console.log("filtered", takenOutEmpty )
    return takenOutEmpty;
  } catch (err) {
    console.log("error to get Schedules to Swap", err);
  }
};
const createSched = async (
  User_idUser,
  Store_idStore,
  starttime,
  endtime,
  workcode
) => {
  const data = await prisma.schedule.create({
    data: {
      User_idUser,
      Store_idStore,
      starttime,
      endtime,
      workcode,
    },
  });
  // console.log("response", data);
  return data;
};

const editSched = async (
  User_idUser,
  Store_idStore,
  starttime,
  endtime,
  workcode,
  idSchedule
) => {
  const data = await prisma.schedule.update({
    where: { idSchedule },
    data: {
      User_idUser,
      Store_idStore,
      starttime: new Date(starttime),
      endtime: new Date(endtime),
      workcode,
    },
  });
  // console.log("response", data);
  return data;
};

// const createSchedAvail = async()=>{
//   const data = await prisma.employee_sched_availability.createMany({
//     data:[{
//       isFulltime:true,
//       availHrsinWeek:40,
//       User_idUser:5,
//       Store_idStore:1,
//     },{
//       isFulltime:true,
//       availHrsinWeek:40,
//       User_idUser:6,
//       Store_idStore:1,
//     },{
//       isFulltime:true,
//       availHrsinWeek:35,
//       User_idUser:9,
//       Store_idStore:1,
//     },{
//       isFulltime:true,
//       availHrsinWeek:40,
//       User_idUser:14,
//       Store_idStore:1,
//     },{
//       isFulltime:true,
//       availHrsinWeek:30,
//       User_idUser:15,
//       Store_idStore:1,
//     },{
//       isFulltime:true,
//       availHrsinWeek:35,
//       User_idUser:11,
//       Store_idStore:1,
//     },{
//       isFulltime:true,
//       availHrsinWeek:40,
//       User_idUser:16,
//       Store_idStore:1,
//     },{
//       isFulltime:true,
//       availHrsinWeek:40,
//       User_idUser:18,
//       Store_idStore:1,
//     },{
//       isFulltime:false,
//       availHrsinWeek:20,
//       User_idUser:19,
//       Store_idStore:1,
//     },{
//       isFulltime:true,
//       availHrsinWeek:30,
//       User_idUser:3,
//       Store_idStore:1,
//     },{
//       isFulltime:true,
//       availHrsinWeek:40,
//       User_idUser:4,
//       Store_idStore:1,
//     },{
//       isFulltime:true,
//       availHrsinWeek:30,
//       User_idUser:2,
//       Store_idStore:1,
//     },{
//       isFulltime:true,
//       availHrsinWeek:40,
//       User_idUser:20,
//       Store_idStore:1,
//     },{
//       isFulltime:true,
//       availHrsinWeek:40,
//       User_idUser:23,
//       Store_idStore:1,
//     },{
//       isFulltime:false,
//       availHrsinWeek:15,
//       User_idUser:26,
//       Store_idStore:1,
//     },{
//       isFulltime:true,
//       availHrsinWeek:40,
//       User_idUser:27,
//       Store_idStore:1,
//     },{
//       isFulltime:true,
//       availHrsinWeek:30,
//       User_idUser:17,
//       Store_idStore:1,
//     },{
//       isFulltime:false,
//       availHrsinWeek:20,
//       User_idUser:13,
//       Store_idStore:1,
//     },{
//       isFulltime:false,
//       availHrsinWeek:10,
//       User_idUser:22,
//       Store_idStore:1,
//     },{
//       isFulltime:false,
//       availHrsinWeek:25,
//       User_idUser:5,
//       Store_idStore:2,
//     },]

//   })
//   return data
// }
// createSchedAvail()

module.exports = {
  getUserSchedsByStore,
  getCoworkersSchedsByStore,
  getMySchedulesFrom,
  getSchedulesToSwap,
  createSched,
  editSched,
};
