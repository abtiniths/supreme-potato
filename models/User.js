const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isEmail } = require("validator");
const { roles } = require("../utils/constants");
const { UnauthenticatedError } = require("../errors");

// need to decide about Schema design soon... embed or ref??

// testing diffrent ways to implement user roles

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlenght: 3,
    maxlength: 100,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
    validate: [isEmail, "Please provide a valid email"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlenght: 4,
    maxlength: 100,
  },
  role: {
    type: String,
    enum: [roles.admin, roles.worker, roles.client],
    default: roles.client,
  },
  //testing out two way reference between task and user to create a "many to many" relationship
  //find out best practice to store nosql data, scaleability? how to minimize filesize by writing the correct Schema structure from the getgo
  //what is the pros & cons with storin task and user with a two way referencing compared to one way?
  Task: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Task",
    },
  ],
});

// before user auth use bcrypt to hash pwd
UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  if (this.email === process.env.ADMIN_EMAIL.toLocaleLowerCase()) {
    this.role = roles.admin;
  }
  next();
});

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

// check if the user data  is the same as user db
UserSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email });
  if (!user) throw new UnauthenticatedError("Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new UnauthenticatedError("Invalid email or password");

  return user;
};

// create/asign jwt token to the user
UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name, role: this.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

// virtual testing, is virtual just data you can access without it gettin stored into the db, or is it more complex? leave this for now, to be able to test later
UserSchema.virtual("clientEmail").get(function () {
  return `${this.client} <${this.email}>`;
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
