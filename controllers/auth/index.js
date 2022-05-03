const {Users} = require('../../models')
const { StatusCodes } = require('http-status-codes')
const {BadRequestError} = require('../../errors')


const register = async (req, res) => {
    const { username,email,password } = req.body;
    if(!username || !email || !password){
throw new BadRequestError('please provide name, email and password')
    }
    const user = await Users.create({
        username,
        email,
        password
    })
    res.status(StatusCodes.CREATED).json({ user })
}

const login = async (req, res) => {
    res.send('login user')
}

module.exports = {
    register,
    login
}