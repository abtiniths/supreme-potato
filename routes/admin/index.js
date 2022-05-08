const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const { StatusCodes } = require("http-status-codes");


//testing admin routes in seperate route/folder
router.get('/users', async (req, res, next) =>{
    try{
const users = await User.find()
res.status(StatusCodes.OK).json({ users });
    }catch(error){
next(error)
    }
})





module.exports = router