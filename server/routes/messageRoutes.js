var express = require("express");
var router = express.Router();
const { getCoworkers } = require("../../model/messaging");

router.post("/coworkers", async (req, res) => {
    console.log("req.id is", req.body);
    try {
      console.log("getting stores for id", req.body.storeId);
      const coworkers = await getCoworkers(req.body.storeId, req.body.userPrivilegeId);
      console.log("this is coworkers", coworkers)
      res.send(coworkers);
    } catch (error) {
      res.send(error);
    }
  });



module.exports = router;