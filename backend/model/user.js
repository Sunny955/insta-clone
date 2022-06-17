const mongoose = require("mongoose");

const userSchema = mongoose.model("User", {
  name: {
    type: "String",
    required: true,
  },
  email: {
    type: "String",
    required: true,
  },
  password: {
    type: "String",
    required: true,
  },
});

module.exports = userSchema;
