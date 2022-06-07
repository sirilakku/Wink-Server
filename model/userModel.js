//import { PrismaClient } from '@prisma/client';
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()


// let createUser = async(newUser) => {
//     const createdUser = await prisma.user.create({
//         data: {
//             username: newUser
//             //password:password
//           },
//     })
//     return createdUser
//  }
    
// let findUser =  async(username) =>{
//     console.log("User", id)
//     let findUser = await prisma.user.findUnique(username)
//     return (findUser)
    
// } 
let userByName = async (username) => {
    let userByName = await prisma.user.findUnique({
    where: {
      username : ""
          },
        })
        return userByName
    }
module.exports={userByName}