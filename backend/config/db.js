const mongoose = require("mongoose");

const DBConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully!!", conn.connection.host);
  } catch (err) {
    console.log("Failed to connect to the database!!", err);
    process.exit(1);
  }
};

module.exports = DBConnect;
