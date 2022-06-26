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
  } else if (storeId) {
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
    coWorkers = res
      .status(500)
      .send("You are not authorized to view this page");
  }

  console.log("userbyname function", coWorkers);
  return coWorkers;
};

const createConversation = async (req) => {
  console.log("creating conversation for sender", req.body.sender);
  console.log("creating conversation for message",req.body.chat);
  console.log("creating conversation for receiver", req.body.receiver);
  try {
    const conversation = await prisma.messages.create({
      
      data:  {
        
        sender: req.body.sender,
        receiver: req.body.receiver,
        chat: req.body.chat,
        user_id: req.body.sender,
        user_privilages: 1002,
        msg_timeStamp: new Date(),
        store: req.body.store,
        read_receits: false,
      },
  });
    console.log("this is conversation", conversation);
    return conversation;
  } catch (error) {
    res.status(500).send(error);
    console.log("error is", error);
  }
};

const getConversations = async (req) => {
  console.log("getting conversations for user", req.body.user_id);
  try {
    const conversations = await prisma.messages.findMany({
      where: {
        sender: req.body.User_idUser,
        store: req.body.Store_idStore,
      },
    });
    console.log("this is conversations", conversations);
    return conversations;
  } catch (error) {
    res.status(500).send(error);
    console.log("error is", error);
  }
}


module.exports = { getCoworkers, createConversation, getConversations };
