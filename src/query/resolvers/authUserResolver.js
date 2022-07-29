const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { passwordValidator } = require("../../helper/passwordValidate");
const { User } = require("../../module");

const loginUser = async (parent, args) => {
  const user = await User.findOne({
    phoneNumber: args.user.phoneNumber,
  });
  if (!user) {
    throw new Error("User does not exist!");
  }
  const isEqual = await bcrypt.compare(args.user.password, user.password);

  if (!isEqual) {
    throw new Error("Password is incorrect!");
  }
  const token = await jwt.sign(
    { userId: user.distinct, email: user.email },
    "somesupersecreatekey",
    {
      expiresIn: "1h",
    }
  );
  return { ...user._doc, token: token, tokenExpiration: 1 };
};

const createuser = async (parent, args) => {
  const passwordValidate = passwordValidator(
    args.user.password,
    args.user.confirmPassword
  );

  try {
    const hashedpassword = await bcrypt.hash(args.user.password, 12);
    const user = new User({
      phoneNumber: args.user.phoneNumber,
      password: hashedpassword,
      firstName: args.user.firstName,
      lastName: args.user.lastName,
    });
    if (passwordValidate.value) {
      throw new Error(passwordValidate.message);
    }
    const result = await user.save();
    return { ...result._doc };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  Mutation: {
    createUser: createuser,
    loginUser: loginUser,
  },
};
