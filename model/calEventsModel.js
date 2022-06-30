const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getCalEventsForMonth = async() => {
    try {
        const monEvent = await prisma.employee_calendar_events.findMany({

        })
    } catch(err){
        console.log("Error fetching calendar events")
    }
}