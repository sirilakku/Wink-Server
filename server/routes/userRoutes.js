var express = require("express");
var router = express.Router();
const { userStoreSelections } = require("../../model/userModel");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// Get user store selections
router.post("/storeselection", async (req, res) => {
  console.log("req.id is", req.body);
  try {
    console.log("getting stores for id", req.body.id);
    const stores = await userStoreSelections(req.body.id);
    res.send(stores);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
