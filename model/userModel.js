//import { PrismaClient } from '@prisma/client';
const { PrismaClient, Prisma } = require('@prisma/client');

const user = require('@prisma/client')

// using `prisma` in your application to read and write data in DB
const prisma = new PrismaClient()

let userByName = async (username) => {
    let userByName = await prisma.user.findUnique({
    where: {
      username : username,
          },
        })
        return userByName
    }


module.exports= userByName