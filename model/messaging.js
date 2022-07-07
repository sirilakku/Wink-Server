const { PrismaClient } = require("@prisma/client");
const { Socket } = require("socket.io");

const prisma = new PrismaClient();



const getCoworkers = async (storeId, userPrivilegeId) => {
  // console.log("getting coworkers for store", storeId);
  // console.log("getting coworkers for userPrivilegeId", userPrivilegeId);
  // if (userPrivilegeId === 1000 || userPrivilegeId === 1002) {
  //   console.log("getting coworkers for store", storeId);
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


  console.log("userbyname function", coWorkers);
  return coWorkers;
};

const createConversation = async (req) => {
  // console.log("creating conversation for sender", req.body.sender);
  // console.log("creating conversation for message", req.body.chat);
  // console.log("creating conversation for receiver", req.body.receiver);
  try {
    const conversation = await prisma.messages.create({
      data: {
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
    // console.log("this is conversation", conversation);
    return conversation;
  } catch (error) {
    res.status(500).send(error);
    console.log("error is", error);
  }
};

const getConversations = async (req) => {
  // console.log("getting conversations for user", req.body.user);
  try {
    const conversations = await prisma.messages.findMany({
      where: {
        sender: { in: [req.body.user, req.body.receiver] },
        store: req.body.store,
        receiver: { in: [req.body.user, req.body.receiver] },
      },
    });
    // console.log("this is conversations", conversations);
    return conversations;
  } catch (error) {
    res.status(500).send(error);
    console.log("error is", error);
  }
};

const getMessages = async (req) => {
  // console.log("getting conversations for user", req.user);
  try {
    const conversations = await prisma.messages.findMany({
      where: {
        sender: { in: [req.user, req.receiver] },
        store: req.store,
        receiver: { in: [req.user, req.receiver] },
      },
    });
    // console.log("this is conversations", conversations);
    return conversations;
    // io.emit("emitting messages", conversations);
  } catch (error) {
    res.status(500).send(error);
    console.log("error is", error);
  }
};

const updateMessages = async (req) => {
  // console.log("updating conversations for user", req.user);
  try {
    const conversations = await prisma.messages.updateMany({
      where: {
        sender: req.receiver,
        store: req.store,
        receiver: req.user,
      },
      data: {
        read_receits: true,
      },
    });

    return conversations;
  } catch (error) {
    res.status(500).send(error);
    console.log("error is", error);
  }
};

const getNotifications = async (req) => {
  // console.log("getting notifications for user", req.user);
  try {
    const notifications = await prisma.messages.findMany({
      where: {
        receiver: req.body.user,
        read_receits: false,
        store: req.body.store,
      },
    });
    // console.log("this is notifications", notifications.length);
    return notifications.length;
  } catch (error) {
    res.status(500).send(error);
    console.log("error is", error);
  }
};

module.exports = {
  getCoworkers,
  createConversation,
  getConversations,
  getMessages,
  updateMessages,
  getNotifications,
};
