const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const { StatusCodes } = require("http-status-codes");
const {UnauthenticatedError,NotFoundError, BadRequestError} = require('../../errors')
const mongoose = require('mongoose')

//testing admin routes in seperate route/folder
router.get('/users', async (req, res, next) =>{
    try{
const users = await User.find()
res.status(StatusCodes.OK).json({count: users.length, users });
    }catch(error){
next(error)
    }
})

router.post('users/:id', async (req, res) => {
    const { params:{id:userId} } = req
    const user = await User.findByIdAndUpdate({_id:userId}, req.body, {new:true, runValidators:true})
    if(!user){
        throw new NotFoundError(`no user with id ${userId}`)
    }
    res.status(StatusCodes.OK).json({ user })

})

router.post('/update-user', async (req, res, next) => {
    try {
      const { id, role } = req.body;
  
      // Checking for id and roles in req.body
      if (!id || !role) {
        throw new UnauthenticatedError('Invalid authentication')
      }
  
      // Check for valid mongoose objectID
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UnauthenticatedError('Invalid authentication')
      }
  
      // Check for Valid role
      const rolesArray = Object.values(roles);
      if (!rolesArray.includes(role)) {
        throw new UnauthenticatedError('Invalid authentication')
      }
  
      // Admin cannot remove himself/herself as an admin
      if (req.user.id === id) {
        throw new BadRequestError('Admin cannot remove his own role as admin')
      }
  
      // Finally update the user
      const user = await User.findByIdAndUpdate(
        id,
        { role },
        { new: true, runValidators: true }
      );
      res.status(StatusCodes.OK).send(`user ${user.name} updated!`)
      
    } catch (error) {
      next(error);
    }
  });
 




module.exports = router