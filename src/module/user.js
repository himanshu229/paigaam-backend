const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { passwordValidator } = require("../helper");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
      require: true,
      minlength: [10, "Your number is Incorrect"],
      maxlength: [10, "Your number is Incorrect"],
      validate: {
        validator: async function (phoneNumber) {
          const user = await this.constructor.findOne({ phoneNumber });
          if (user) {
            if (this.id === user.id) {
              return true;
            }
            return false;
          }
          return true;
        },
        message: (props) => `${props.value} this is already register.`,
      },
    },
    password: {
      type: String,
      require: true,
    },
    confirmPassword: {
      type: String,
    },
    tokens: [
      {
        token: {
          type: String,
          require: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

//method we use with instance
userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, `${process.env.TOKEN_KEY}`);
    this.tokens = this.tokens.concat({
      token,
    });
    //when token generate sign in time then remove it
    await this.save();
    return token;
  } catch (err) {
    throw err;
  }
};
userSchema.pre("save", async function (next) {
  if (this.tokens.length === 0) {
    const isValidator = passwordValidator(this.password, this.confirmPassword);
    if (isValidator.value) {
      next(new Error(isValidator.message));
    }
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 12);
      this.confirmPassword = undefined;
    }
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
