var express = require("express");
var router = express.Router();
const { getCoworkers, createConversation, getConversations } = require("../../model/messaging");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.post("/coworkers", async (req, res) => {
  console.log("req.id is", req.body);
  try {
    console.log("getting stores for id", req.body.storeId);
    const coworkers = await getCoworkers(
      req.body.Store_idStore,
      req.body.UserProfile_idUserProfile
    );
    console.log("this is coworkers", coworkers);
    res.send(coworkers);
  } catch (error) {
    res.send(error);
  }
});



router.post("/createconversation", async (req, res) => {
  console.log("req.body is", req.body);
  try {
    console.log("creating conversation for id", req.body.sender);
    const conversation = await createConversation(req);

    console.log("this is conversation", conversation);

    res.json(conversation);
  } catch (error) {
    res.send(error);
    console.log("error is", error);
  }
});

router.post("/getconversation", async (req, res) => {
  console.log("req.body is", req.body);
  try {
    
    console.log("getting conversation for id", req.body.sender);
    const conversation = await getConversations(req);
    console.log("this is conversation", conversation);
    res.json(conversation);
  } catch (error) {
    res.send(error);
    console.log("error is", error);
  }
}
);

module.exports = router;
