const User = require("../../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../../errors");

// function to create user in db and create jwt token asigned to that user, also validate for proper user create & duplicate,  with errors
const register = async (req, res) => {
  const { name, email, password } = req.body;

  // { name,email,pwd} is required so eather leave this or change error later
  if (!name || !email || !password) {
    throw new BadRequestError("please provide name, email and password");
  }
  // unique is not a 'real' validation or whatever so testing for new option
  const duplicate = await User.findOne({ email }).exec();
  if (duplicate) {
    throw new BadRequestError("That Email adress is already registered");
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
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    const token = user.createJWT();
    // res.cookie('jwt', token, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
    //  res.status(StatusCodes.OK).json({ user: { name: user.name, role: user.role }, token });

    //testing putin token inside cookie
    //res.cookie('jwt', token, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
    // res.cookie('jwt', token, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
    res
      .status(StatusCodes.OK)
      .json({ user: { name: user.name, role: user.role }, token });
    //res.status(StatusCodes.OK).json({ roles, token });
  } catch (error) {
    throw new UnauthenticatedError("Invalid email or password");
  }
};

//stupid logout for test
const simpleLogout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(StatusCodes.OK).json({});
};

module.exports = {
  register,
  login,
  simpleLogout,
};
