const { passwordValidator } = require("../../helper");
const { User } = require("../../module");
const bcrypt = require("bcryptjs");

const loginUser = async (parent, args) => {
  const isValidator = passwordValidator(args.user.password);
  const users = await User.findOne({
    phoneNumber: args.user.phoneNumber,
  });
  if (!users) {
    throw new Error("User does not exist!");
  }
  if (isValidator.value) {
    throw new Error(isValidator.message);
  }
  const isEqual = await bcrypt.compare(args.user.password, users.password);
  if (!isEqual) {
    throw new Error("Password is incorrect...");
  }
  const token = await users.generateAuthToken();
  return { isAuth: true, token: token, tokenExpiration: 1 };
};

const createuser = async (parent, args) => {
  try {
    const user = new User({
      phoneNumber: args.user.phoneNumber,
      password: args.user.password,
      firstName: args.user.firstName,
      lastName: args.user.lastName,
      confirmPassword: args.user.confirmPassword,
    });
    await user.save();
    return { message: "User has been registered...", isLogin: true };
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
