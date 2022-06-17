const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const postSchema = mongoose.model("Post", {
  title: {
    type: "String",
    required: true,
  },
  body: {
    type: "String",
    required: true,
  },
  photo: {
    type: "String",
    default: "no photo for now",
  },
  postedBy: {
    type: ObjectId,
    ref: "User",
  },
});

module.exports = postSchema;
