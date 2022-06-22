
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
    orderBy:{userprofile:{name:'asc'}},
  });
  // console.log('res', allEmployees)
  return allEmployees;
};

const getMySchedulesFrom =async(storeId, myId, from)=>{
  const onlyMy = await prisma.userprivileges.findMany({
    where: { Store_idStore: storeId, User_idUser:myId },
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
              starttime: { gte: new Date(from) },
            },
            select: { workcode: true, starttime: true, endtime: true },
          },
        },
      },
    }
  });
  // console.log(onlyMy)
  return onlyMy;
}
module.exports =  {getAllSchedulesByStore, getMySchedulesFrom};
