
const { PrismaClient } = require("@prisma/client");
// using `prisma` in your application to read and write data in DB
const prisma = new PrismaClient();

const getAllSchedulesByStore = async (storeId, startDay, endDay) => {
  const allEmployees = await prisma.userprivileges.findMany({
    where: { Store_idStore: storeId },
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
            select: { workcode: true, starttime: true, endtime: true },
          },
        },
      },
    },
  });
  // console.log('res', res)
  return allEmployees;
};

// const getStoreHours = async (storeId) => {
//   // const storeHours = await prisma.storeopeninghours.findMany();
//   const storeHours = await prisma.storeopeninghours.findMany({
//     where: { Store_idStore: storeId },
//   });
//   return storeHours
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
module.exports =  getAllSchedulesByStore;
