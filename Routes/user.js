const express = require("express");
const route = express.Router();
const bcrypt = require('bcryptjs');
const User = require("../Models/user");
const authFile = require("../Services/authentication");


// route.get("/", (req,res) =>
// {
//     return res.send("Welcome to MovieBooking Web App")
// });

route.post("/Signup", async (req,res) =>
{
    try {
    var salt = bcrypt.genSaltSync(10);
    // console.log(req.body.password , req.body.confirmpassword);
    var hash = bcrypt.hashSync(req.body.password, salt);
    var hash2 = bcrypt.hashSync(req.body.confirmpassword, salt);
    const letters = /^[a-zA-z ]*$/;

    const userData = {
        name : req.body.name,
        useremail : req.body.useremail,
        password : hash,
        confirmpassword : hash2
    }

    if(userData.password !== userData.confirmpassword)
    {
        console.log("Confirm Password and Password is Mismatch");
        return res.status(500).send("Confirm Password and Password is Mismatch");
    }
    else if(!userData.name.match(letters))
    {
        console.log("Username Must Contain only alphabets");
        return res.status(500).send("Username Must Contain only alphabets");
    }
    else if(!(userData.name && userData.useremail))
    {
        console.log("Fill all blanks");
        return res.status(500).send("Fill all blanks");
    }

    await User.create(userData);

    console.log("SignUp Complete");
    return res.send("SignUp Complete");
    
    } catch (error) {
        console.log(error);
    }
})

route.post("/resetpassword/:userid" , authFile.authenticationChecker ,async (req,res) =>
{
    try {
        const id = req.params.userid;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    var hash2 = bcrypt.hashSync(req.body.confirmpassword, salt);
    const passwordChange = {
        password : hash,
        confirmpassword : hash2
    }

    if(passwordChange.password !== passwordChange.confirmpassword)
    {
        return res.status(500).send("Confirm Password and Password is Mismatch");
    }

    await User.findByIdAndUpdate(id, passwordChange,
    {
        new : true,
        runValidators : true
    })
    return res.send("Password Successfully change");
    } catch (error) {
        console.log(error);
    }
})

route.delete("/deleteaccount/:usersid", authFile.authenticationChecker,async (req,res) =>
{
    try {
        const id  = req.params.usersid;

    if(!id)
    {
        return res.send("keep eneter the Id")
    }
    const userId = await User.findByIdAndDelete(id);

    if(!userId)
    {
        return res.status(500).send("User not exist");
    }
    return res.send("Account Successfully delete");
    } catch (error) {
        console.log(error);
    }
})


route.post("/Login", async (req,res) =>
{
    try {
        const user = await User.findOne({useremail : req.body.useremail})

    if(!user)
    {
        console.log("User not found Check Email");
        return res.status(500).send("User not found Check Email");
    }

    // console.log(req.body.password);

    const check =  bcrypt.compareSync(req.body.password, user.password); // true

    // console.log(check);
    if(!check)
    {
        console.log("Password not match");
        return res.status(500).send("Password is Wrong");
    }

    const token = authFile.gentoken(user._id);

    console.log("Successfully");
    return res.send({token : token,
    userid:user._id});
    }catch (error) {
        console.log(error);
    }
})  
    


route.post("/userdata" ,authFile.authenticationChecker, async(req,res) =>
{
    try {
        const user ={
            useremail : req.body.useremail
        }
        const data = await User.findOne({useremail : user.useremail});
        console.log(data);

        return res.send(data);  
    } catch (error) {
        console.log(error);
    }
})


module.exports = route;