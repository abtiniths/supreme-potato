const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { isEmail } = require('validator')

// need to decide about Schema design soon... embed or ref??

const UserSchema = new mongoose.Schema({
    
    name:{
        type: String,
        required:[true, 'Please provide name'],
        minlenght: 3,
        maxlength: 100,
    },
    email:{
        type: String,
        required:[true, 'Please provide email'],
        unique: true,
        validate: [isEmail, 'Please provide a valid email'],
        lowercase: true,
    },
    password:{
        type: String,
        required:[true, 'Please provide password'],
        minlenght: 4,
        maxlength: 100,
    },
    role: {
        type: String,
        default: 'client',
        enum: ['client', 'worker', 'admin'],
      },
});

// before user auth use bcrypt to hash pwd
UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
    next();
})
// create/asign jwt token to the user
UserSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id, name: this.name, role: this.role }, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_LIFETIME,
    });
};
// check if the user data pwd is the same as user db pwd
UserSchema.methods.comparePassword = async function (checkPassword) {
const isMatch = await bcrypt.compare(checkPassword, this.password)
return isMatch
};

// virtual testing
UserSchema.virtual("clientEmail").get(function () {
    return `${this.client} <${this.email}>`
});



module.exports = mongoose.model('User', UserSchema);