const express = require("express");
const router = express.Router();
const getCalEventsForMonth = require("../../model/calEventsModel");

router.get("/events", async (req, res) => {
    
 const startOfHoliday = req.query.startOfHoliday
 const endOfHoliday = req.query.endOfHoliday

  //console.log("startOfHoliday endOfHoliday ", startOfHoliday, endOfHoliday);
  const monthHolidays = getCalEventsForMonth(startOfHoliday, endOfHoliday);
  const holidayData = await monthHolidays;
  res.json({ holidayData });
});

module.exports = router;
