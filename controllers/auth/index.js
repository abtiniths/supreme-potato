const User = require("../../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../../errors");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("please provide name, email and password");
  }
  const duplicate = await User.findOne({ email }).exec();
  if (duplicate) {
    throw new BadRequestError("That Email adress is already registered");
  }

  const user = await User.create({ ...req.body });
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({ user, token });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    const token = user.createJWT();

    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });
    // secure: true
    res
      .status(StatusCodes.OK)
      .json({ user: { name: user.name, role: user.role }, token });
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
