const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    trim: true,
  },
  email: {
    unique: true,
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  avatar: {
    type: String,
    trim: true,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
