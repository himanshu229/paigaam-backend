const passwordValidator = (password, confirmPassword) => {
  var rgxpassword = new RegExp(password, "g");
  if (password.length < 8) {
    return {
      value: true,
      message: "Password length should be 8",
    };
  }
  if (confirmPassword) {
    if (password.length !== confirmPassword.length) {
      return {
        value: true,
        message: "Password not matching",
      };
    }
    if (!rgxpassword.test(confirmPassword)) {
      return {
        value: true,
        message: "Password not matching",
      };
    }
  }
  return {
    value: false,
  };
};

exports.passwordValidator = passwordValidator;
