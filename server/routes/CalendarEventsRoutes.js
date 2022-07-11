const express = require("express");
const router = express.Router();
const {getCalEventsForMonth, addEvent} = require("../../model/calEventsModel");

router.get("/events", async (req, res) => {
    
 const startOfHoliday = req.query.startOfHoliday
 const endOfHoliday = req.query.endOfHoliday

  //console.log("startOfHoliday endOfHoliday ", startOfHoliday, endOfHoliday);
  const monthHolidays = getCalEventsForMonth(startOfHoliday, endOfHoliday);
  const holidayData = await monthHolidays;
  res.json({ holidayData });
});

router.post("/createEvents", async (req,res) =>{
  const eventDate = req.query.eventDate
  const eventName = req.query.eventName

  const newEvent = addEvent(eventDate,eventName)
  const addedEvent = await newEvent
  res.json({addedEvent})
})
module.exports = router;
