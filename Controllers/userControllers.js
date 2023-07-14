const users = require("../models/userSchema");
const moment = require("moment")

// create user
exports.userpost = async (req, res) => {
    const { firstname, email, mobile, gender, status } = req.body;

    if (!firstname || !email || !mobile || !gender || !status) {
        res.status(400).json({ error: "All Input Is required" });
    }

    try {
        const preuser = await users.findOne({ email: email });
        if (preuser) {
            res.status(400).json({ error: "This user already exist in our databse" });
        }else{
            const dateCreate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

            const userData = new users({
                firstname, email, mobile, gender, status ,datecreated:dateCreate
            });

            await userData.save();
            res.status(200).json(userData);
        }
    } catch (error) {
        res.status(400).json(error);
        console.log("catch block error")
    }
}

// get all users
exports.getUsers = async(req,res)=>{

    try {
        const usersData = await users.find()

        res.status(200).json(usersData)
    } catch (error) {
        res.status(400).json(error);
        console.log("catch block error")
    }
}

// get single user
exports.getSingleuser = async(req,res)=>{
    const {id} = req.params;

    try {
        const singleUserData = await users.findOne({_id:id});

        res.status(200).json(singleUserData);
    } catch (error) {
        res.status(400).json(error);
        console.log("catch block error")
    }
}

// delete user
exports.deleteuser = async(req,res)=>{
    const {id} = req.params;

    try {
        const deleteUserData = await users.findByIdAndDelete({_id:id});

        res.status(200).json(deleteUserData);
    } catch (error) {
        res.status(400).json(error);
        console.log("catch block error")
    }
}

// update user

exports.updateUser = async(req,res)=>{
    const {id} = req.params;
    const { firstname, email, mobile, gender, status } = req.body;

    try {
        const dateUpdate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

        const updateUserdata = await users.findByIdAndUpdate({_id:id},{
            firstname, email, mobile, gender, status ,dateUpdated:dateUpdate
        },{new:true});

        await updateUserdata.save();

        res.status(200).json(updateUserdata)
    } catch (error) {
        res.status(400).json(error);
        console.log("catch block error")
    }
}