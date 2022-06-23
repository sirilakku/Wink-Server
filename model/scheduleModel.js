const { PrismaClient } = require("@prisma/client");
const moment = require("moment");
// using `prisma` in your application to read and write data in DB
const prisma = new PrismaClient();

const getUserSchedsByStore = async (storeId, userId, startDay, endDay) => {
  const my = await prisma.userprivileges.findMany({
    where: { Store_idStore: storeId, User_idUser: userId  },
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
    orderBy: { userprofile: { name: "asc" } },
  });
  // console.log('res', allEmployees)
  return my;
};
const getCoworkersSchedsByStore = async (storeId, userId, startDay, endDay) => {
  const exceptMine = await prisma.userprivileges.findMany({
    where: { Store_idStore: storeId,  User_idUser: { not: userId }, },
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
    orderBy: { userprofile: { name: "asc" } },
  });
  // console.log('res', allEmployees)
  return exceptMine;
};

const getMySchedulesFrom = async (storeId, myId, from) => {
  const onlyMy = await prisma.userprivileges.findMany({
    where: { Store_idStore: storeId, User_idUser: myId },
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
            select: { workcode: true, starttime: true, endtime: true },
          },
        },
      },
    },
  });
  // console.log(onlyMy)
  return onlyMy;
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

module.exports = {
  getUserSchedsByStore,
  getCoworkersSchedsByStore,
  getMySchedulesFrom,
  getSchedulesToSwap,
};
