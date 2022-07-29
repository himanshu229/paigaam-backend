const mongoose = require("mongoose");
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
