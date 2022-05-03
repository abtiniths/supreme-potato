const User = require('../../models/User')
const { StatusCodes } = require('http-status-codes')
const {BadRequestError} = require('../../errors')
const bcrypt = require('bcryptjs')

/*
if(!name || !email || !password){
    throw new BadRequestError('please provide name, email and password')
        }
        */

const register = async (req, res) => {
    
    const user = await User.create({ ...req.body })
    res.status(StatusCodes.CREATED).json({ user })
}

const login = async (req, res) => {
    res.send('login user')
}

module.exports = {
    register,
    login
}