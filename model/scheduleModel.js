const moment = require("moment");
const { PrismaClient } = require("@prisma/client");
// using `prisma` in your application to read and write data in DB
const prisma = new PrismaClient();

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

const getAllSchedulesByStore = async (storeId, startDayofWeek) => {
  const endDayofWeek = moment(startDayofWeek).clone().add(6, "days").format();
  console.log("period", startDayofWeek, endDayofWeek);

  const allEmployees = await prisma.userprivileges.findMany({
    where: { Store_idStore: storeId },
    include: {
      userprofile: { select: { name: true } },
      user: {
        select: {
          firstname: true,
          lastname: true,
          schedule: {
            where: {
              Store_idStore: storeId,
              endtime: { gte: new Date(startDayofWeek) },
              starttime: { lte: new Date(endDayofWeek) },
            },
          },
        },
      },
    },
  });

  const res = [];
  allEmployees.map((emp) => {
    const dataObj = {
      userId: emp.User_idUser,
      firstname: emp.user.firstname,
      lastname: emp.user.lastname,
      position: emp.userprofile.name,
      schedules: emp.user.schedule,
    };
    emp?.user.schedule.length != 0 && res.push(dataObj);
  });
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
