const jwt = require("jsonwebtoken");
const User = require("../model/user");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      error: "You must be signed in",
    });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) {
      return res.status(401).json({
        error: "You must be signed in",
      });
    }

    const { _id } = payload;
    const Userdata = await User.findById(_id);
    req.user = Userdata;
    next();
  });
};
