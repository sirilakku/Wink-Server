const scheduleByType = (data) => {
  const workScheds = data.filter(sched=>sched.workcode === 0);
  const vacScheds = data.filter(sched=>sched.workcode === 1);
  return {workScheds, vacScheds}
};
const formatSchedData = (data) => {
  console.log("res format", data)
    const res = [];
    data?.map((emp) => {
      const dataObj = {
        userId: emp.User_idUser,
        storeId: emp.Store_idStore,
        firstname: emp.user.firstname,
        lastname: emp.user.lastname,
        positionId: emp.userprofile.idUserProfile,
        position: emp.userprofile.name,
        schedules: emp.user.schedule,
        availability: emp.user.employee_sched_availability&&emp.user.employee_sched_availability[0] 
      };
      emp.user.inactive === false && res.push(dataObj);
    });
    return res;
  };
  const format = (data) => {
    const res = [];
    data?.map((emp) => {
      const dataObj = {
        userId: emp.User_idUser,
        storeId: emp.Store_idStore,
        firstname: emp.user.firstname,
        lastname: emp.user.lastname,
        positionId: emp.userprofile.idUserProfile,
        position: emp.userprofile.name,
        schedules: scheduleByType(emp.user.schedule),
        availability: emp.user.employee_sched_availability&&emp.user.employee_sched_availability[0] 
      };
      emp.user.inactive === false && res.push(dataObj);
    });
    return res;
  };

  // const format
 module.exports ={formatSchedData, format}