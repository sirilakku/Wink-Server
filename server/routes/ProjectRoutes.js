<<<<<<< HEAD
const {userByName, userByStoreID}  = require("../../model/userModel")
 
=======
const userByName = require("../../model/userModel");
>>>>>>> 509ae023fbcb5042bf67acf06e72e249988f0019

const jwt = require("jsonwebtoken");
let express = require("express");
const {
  welcome,
  login,
  monthlyCalendar,
  user,
} = require("../../model/functions");
let router = express.Router();

/* GET home page. */
router.get("/", welcome);

//router.get('/login', login)

router.get("/monthlyCalendar", monthlyCalendar);

// router.post("/login", async (req, res) => {
//   const user = req.body.username;
//   const password = req.body.password;

//   const username = await userByName(user);
//   if (
//     username.username === user &&
//     username.password === password &&
//     username.inactive === false
//   ) {
//     console.log("Hello username", username);
//     console.log("Hello password", password, username.password);
//     res.json({
//       firstname: username.firstname,
//       lastname: username.lastname,
//       username: username.username,
//       password: username.password,
//       inactive: username.inactive,
//       userID: username.idUser,
//     });
//   } else {
//     res.json({
//       message: "Invalid username or password",
//     });
//   }
// });

router.post("/login", async (req, res) => {
    const user = req.body.username
    const username = await userByName(user)
    //console.log('Hello username', username)
    console.log('Hello user', user)
    res.send(user.firstname)
})
  const user = req.body.username;
  const password = req.body.password;

  const username = await userByName(user);
  if (
    username.username === user &&
    username.password === password &&
    username.inactive === false
  ) {
    jwt.sign({ user }, "privatekey", { expiresIn: "900" }, (err, token) => {
      if (err) {
        console.log(err);
      }
      res.json({
        firstname: username.firstname,
        lastname: username.lastname,
        token: token,
    });
      
    });
  } else {
    res.sendStatus(401) ;
    console.log("ERROR: Could not log in");
  }
});

router.get('/userprofile', async(req, res) =>{
    const user = req.body.username
    //console.log('Hello user in userprofile', user)
    const userNProfile = await userByStoreID(user)
    console.log("user name with profile", userNProfile)
    res.send(userNProfile.firstname)
    
})

    module.exports = router;
