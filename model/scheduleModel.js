const { PrismaClient } = require("@prisma/client");
// using `prisma` in your application to read and write data in DB
const prisma = new PrismaClient()

const createSchedules =async()=>{

    // const schedules = await prisma.schedule.createMany({
    
    // data:[
    //   {workCode: "working",startTime:"2022-06-13 09:00:00", endTime:"2022-6-13 17:00:00", privilegesId:12},
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
    // ]
// })
  // return schedules
}

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

createSchedules();
module.exports = getAllSchedulesByStore;
