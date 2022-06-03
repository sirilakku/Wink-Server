const mySql = require("./mySql")

const userSchema = new mySql.Schema({
    userName : { type:String, required:true},
    password : {type:String,required:true},
    createdAt : {type: Date, default: new Date()}
})

const Employee = mySql.model ("User",userSchema)

const createEmp = async (newEmpData) => {
    const newEmp = await Employee.create (newEmpData)
    return newEmp;
  };
  
console.log("Employee created")

module.exports={createEmp}