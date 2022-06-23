const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// const getCoworkers = async (storeId) => {
//   console.log("getting coworkers for store", storeId);
//   const allEmployees = await prisma.userprivileges.findMany({
//     where: { Store_idStore: storeId, },

//   });
//   console.log("this is coworkers", allEmployees)
//   // console.log('res', res)
//   return allEmployees;
// };

const getCoworkers = async (storeId, userPrivilegeId) => {
  console.log("getting coworkers for store", storeId);
  console.log("getting coworkers for userPrivilegeId", userPrivilegeId);
  if (userPrivilegeId === 1000 || userPrivilegeId === 1002) {
    console.log("getting coworkers for store", storeId);
    try {
      let coWorkers = await prisma.userprivileges.findMany({
        where: {
          Store_idStore: storeId,
        },
        include: {
          userprofile: {
            select: {
              name: true,
            },
          },
          user: {
            select: {
              firstname: true,
              lastname: true,
            },
          },
        },
      });
      return coWorkers;
    } catch (error) {
      res.status(500).send(error);
    }
  } else if (storeId){
    try {
      let coWorkers = await prisma.userprivileges.findMany({
        where: {
          Store_idStore: storeId,
          UserProfile_idUserProfile: { in: [1002, 1000] },
        },
        include: {
            userprofile: {
              select: {
                name: true,
              },
            },
            user: {
              select: {
                firstname: true,
                lastname: true,
              },
            },
          },
      });
      return coWorkers;
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    coWorkers = res.status(500).send("You are not authorized to view this page");
  }

  console.log("userbyname function", coWorkers);
  return coWorkers;
};
module.exports = { getCoworkers };
