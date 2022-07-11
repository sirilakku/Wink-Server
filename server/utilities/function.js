const formatSchedData = (data) => {
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

 module.exports =formatSchedData