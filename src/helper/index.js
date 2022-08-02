const PASSWORD_LENGTH_1 = 8;
const PASSWORD_LENGTH_2 = 16;
var REGEX_PASSWORD = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const passwordValidator = (password, confirmPassword) => {
  if (
    password.length < PASSWORD_LENGTH_1 ||
    password.length > PASSWORD_LENGTH_2
  ) {
    return {
      value: true,
      message: "Password should be more than 8 and less than 16",
    };
  }
  if (!REGEX_PASSWORD.test(password)) {
    return {
      value: true,
      message:
        "Password should be uppercase, lowercase, numeric and special character",
    };
  }
  if (confirmPassword) {
    if (!REGEX_PASSWORD.test(confirmPassword)) {
      return {
        value: true,
        message:
          "Password should be uppercase, lowercase, numeric and special character",
      };
    }
    if (password !== confirmPassword) {
      return {
        value: true,
        message: "Password is not matching",
      };
    }
  }
  return {
    value: false,
  };
};

exports.passwordValidator = passwordValidator;
