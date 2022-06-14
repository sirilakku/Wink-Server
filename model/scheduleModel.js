const { PrismaClient } = require("@prisma/client");
// using `prisma` in your application to read and write data in DB
const prisma = new PrismaClient();
prisma.messages
const createSchedules = async () => {
  const schedules = await prisma.schedule.create({
  data:
    {workcode: 0,starttime:"2022-06-13 09:00:00", endtime:"2022-6-13 17:00:00", User_idUser:5, Store_idStore:3},
  //   {workCode: "working",startTime:"2022-06-14 09:00:00", endTime:"2022-6-14 17:00:00", privilegesId:12},
  //   {workCode: "working",startTime:"2022-06-15 09:00:00", endTime:"2022-06-15 09:00:00", privilegesId:12},
  //   {workCode: "working",startTime:"2022-06-16 09:00:00", endTime:"2022-06-14 09:00:00", privilegesId:12},
  //   {workCode: "working",startTime:"2022-06-13 09:30:00", endTime:"2022-06-13 13:00:00", privilegesId:15},
  //   {workCode: "working",startTime:"2022-06-14 10:00:00", endTime:"2022-06-14 17:00:00", privilegesId:15},
  //   {workCode: "working",startTime:"2022-06-16 09:00:00", endTime:"2022-06-14 09:00:00", privilegesId:15},
  //   {workCode: "working",startTime:"2022-06-14 09:00:00", endTime:"2022-06-14 17:00:00", privilegesId:17},
  //   {workCode: "working",startTime:"2022-06-16 09:00:00", endTime:"2022-06-16 12:00:00", privilegesId:17},
  //   {workCode: "working",startTime:"2022-06-13 09:00:00", endTime:"2022-06-13 17:00:00", privilegesId:23},
  //   {workCode: "working",startTime:"2022-06-15 09:00:00", endTime:"2022-06-15 17:00:00", privilegesId:23},
  //   {workCode: "vacation",startTime:"2022-06-15 00:00:00", endTime:"2022-06-25 23:59:59", privilegesId:74},
  //   {workCode: "working",startTime:"2022-06-26 13:00:15", endTime:"2022-06-26 17:00:00", privilegesId:74},
  
  })
  return schedules
};
// createSchedules()

const getPositionsByStore = async (storeId) => {
  const allPositions = await prisma.userprivileges.findMany({
    where: { Store_idStore: storeId },
    select: { userprofile: { select: { name: true } } },
  });
  const res = [];
  allPositions.map((position) => {
    res.push(position.userprofile.name);
  });
  const duplicateRemoved = Array.from(new Set(res));
  // console.log(duplicateRemoved);
  return duplicateRemoved;
};


const getAllSchedulesByStore = async (storeId) => {
  const allEmployees = await prisma.userprivileges.findMany({
    where: { Store_idStore: storeId },
    select: {
      User_idUser: true,
      idUserPrivileges: true,
      userprofile: { select: { name: true } },
      user: { select: { firstname: true, lastname: true } },
    },
  });
  //   console.log("result", allEmployees);

  const res = [];
  allEmployees.map((emp) => {
    const dataObj = {
      userId: emp.User_idUser,
      position: emp.userprofile.name,
      firstname: emp.user.firstname,
      lastname: emp.user.lastname,
    };
    res.push(dataObj);
  });
  //   console.log(res);
  return res;
};

// const getStoreHours = async (storeId) => {
//   // const storeHours = await prisma.storeopeninghours.findMany();
//   const storeHours = await prisma.storeopeninghours.findMany({
//     where: { Store_idStore: 1 },
//   });
//   console.log("store hours", storeHours);
// };

// const getUserSummaryData = async (previlegesId) => {
//   const mySummaryData = await prisma.userprivileges.findUnique({
//     where: { idUserPrivileges: previlegesId },
//     select: {
//       User_idUser: true,
//       idUserPrivileges: true,
//       userprofile: { select: { name: true } },
//       user: { select: { firstname: true, lastname: true } },
//     },
//   });
//   return mySummaryData;
// };
module.exports = { getAllSchedulesByStore, getPositionsByStore };
