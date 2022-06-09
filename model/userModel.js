//import { PrismaClient } from '@prisma/client';
const { PrismaClient, Prisma } = require('@prisma/client');

const user = require('@prisma/client')

// using `prisma` in your application to read and write data in DB
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
      username : username,
          },
        })
        return userByName
    }

let userByStoreID = async(username) => {

// let userData = await prisma.user.count({
//   where : {
//     username : username,
//     },
// })
//  console.log("Result is ", userData)
//  return userData
//let usern = username
const result = await prisma.$queryRaw`SELECT idUser,username FROM user`

  //const result = await prisma.$queryRaw`SELECT * FROM user WHERE user.idUser = {username}`
  // let result = await prisma.user.$queryRaw `select * from user` ({where : {user.idUser : username} IN (${Prisma.join(usernameByProID)})});

  // let queryForProfileId = await prisma.user.$queryRaw `select UserProfile_idUserProfile from userprivileges`
  // let usernameByProID = await prisma.user.$queryRaw `select userprofile.name from userprofile WHERE username IN (${Prisma.join(queryForProfileId)})`;
  return result
}



module.exports={userByName, userByStoreID}