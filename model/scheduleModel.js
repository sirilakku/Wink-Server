const { PrismaClient } = require("@prisma/client");
// using `prisma` in your application to read and write data in DB
const prisma = new PrismaClient();


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
module.exports = getAllSchedulesByStore;
