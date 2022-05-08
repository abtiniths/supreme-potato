const User = require("../../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../../errors");
const USER_ROLES = require('../../database/USER_ROLES')



// function to create user in db and create jwt token asigned to that user, also validate for proper user create & duplicate,  with errors
const register = async (req, res) => {
    const { name, email, password } = req.body;

// { name,email,pwd} is required so eather leave this or change error later
    if(!name || !email || !password){
        throw new BadRequestError('please provide name, email and password')
        }
// unique is not a 'real' validation or whatever so lookin for new option   
    const duplicate = await User.findOne({ email }).exec()
    if(duplicate){
        throw new BadRequestError('That Email adress is already registered')
        }    

// create this user in db with all the data from req.body and .sign jwt token to it
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
//res.status(StatusCodes.CREATED).json({ 'Success': `New user ${email} created!` });

// send status code & json object
  res.status(StatusCodes.CREATED).json({ user, token });
};


  
// function to check for valid login information and asign it a jwt token & put the token inside a cookie
const login = async (req, res) => {
    //decide later to use mongoose static function inside model or just keep this
const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
// mongoose method with bcrypt to check that the hashed pwd matches the users
  const matched = await user.comparePassword(password)
  if (!matched) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
//asign token and put that token inside a cookie
  const token = user.createJWT();
  res.cookie('jwt', token, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
    //  res.status(StatusCodes.OK).json({ user: { name: user.name, role: user.role }, token });
   //testing putin token inside cookie
  //res.cookie('jwt', token, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
 // res.cookie('jwt', token, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

  res.status(StatusCodes.OK).json({ user: { name: user.name, role: user.role }, token });
 //res.status(StatusCodes.OK).json({ roles, token });
};


//stupid logout for test
const simpleLogout = async (req, res) => {
    res.cookie('jwt', '', {maxAge:1})
    res.status(StatusCodes.OK).json({ });
}









module.exports = {
  register,
  login,
  simpleLogout
};
