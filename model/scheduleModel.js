const { PrismaClient } = require("@prisma/client");
// using `prisma` in your application to read and write data in DB
const prisma = new PrismaClient();

const getUserSchedsByStore = async (storeId, userId, startDay, endDay) => {
  try {
    const my = await prisma.userprivileges.findMany({
      where: { Store_idStore: storeId, User_idUser: userId },
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
                archived: false,
              },
            },
            employee_sched_availability: {
              where: { Store_idStore: storeId },
            },
          },
        },
      },
      orderBy: { userprofile: { name: "asc" } },
    });
    // console.log("res", my);
    return my;
  } catch (err) {
    console.log("Error to get my schedules", err);
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
                archived: false,
              },
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
    console.log("Error to get cowerkers' schedules ", err);
  }
};

const createSched = async (
  User_idUser,
  Store_idStore,
  starttime,
  endtime,
  workcode,
  archived
) => {
  try {
    const data = await prisma.schedule.create({
      data: {
        User_idUser,
        Store_idStore,
        starttime,
        endtime,
        workcode,
        archived,
      },
    });
    // console.log("response", data);
    return data;
  } catch (err) {
    console.log("Error to create schedule", err);
  }
};

const editSched = async (
  User_idUser,
  Store_idStore,
  starttime,
  endtime,
  workcode,
  idSchedule,
  archived
) => {
  try {
    const data = await prisma.schedule.update({
      where: { idSchedule },
      data: {
        User_idUser,
        Store_idStore,
        starttime: new Date(starttime),
        endtime: new Date(endtime),
        workcode,
        archived,
      },
    });
    // console.log("response", data);
    return data;
  } catch (err) {
    console.log("Error to edit/archive schedule", err);
  }
};

module.exports = {
  getUserSchedsByStore,
  getCoworkersSchedsByStore,
  createSched,
  editSched,
};
