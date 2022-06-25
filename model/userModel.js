//import { PrismaClient } from '@prisma/client';
const { PrismaClient, Prisma } = require("@prisma/client");

const user = require("@prisma/client");

// using `prisma` in your application to read and write data in DB
const prisma = new PrismaClient();

let userByName = async (username) => {
  let userByName = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  console.log("userbyname function", userByName);
  return userByName;
};

let userStoreSelections = async (id) => {
  // console.log("userstore selection id", id);
  let userStores = await prisma.userprivileges.findMany({
    where: {
      User_idUser: id,
    },
    include: {
      store: {
        select: {
          name: true,
          timeZone: true,
          province: true,
        },
      },
      userprofile: {
        select: {
          name: true,
        },
      },
    },
  });
  // console.log("userstore selection", userStores);
  return userStores;
};

module.exports = { userByName, userStoreSelections };
