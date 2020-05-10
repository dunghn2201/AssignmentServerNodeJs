const User = require("../.././models/users");
const getUsers = async (req, res) => {
  try {
    let usersData = await User.find().select("-__v");
    res.send(usersData);
    // return res
    //   .status(200)
    //   .json({ status: true, msg: "Successfully", user: usersData });
  } catch (error) {
    console.log(error);
    // return res.status(200).json({ status: false, msg: "Error" });
  }
};

const getUserById = async (req, res) => {
  try {
    let usersData = await User.findById(req.params.id).select("-password -__v");
    // res.send(usersData);
    return res
      .status(200)
      .json({ status: true, msg: "Successfully", user: usersData });
  } catch (error) {
    return res.status(200).json({ status: false, msg: "Error" });
  }
};
// const getUserByEmail = async (req, res) => {
//   try {
//     // let usersData = await User.findOne({ email: req.query.id }).select(
//     //   "-password -__v"
//     // );
//     let usersData = await User.findOne(req.query).select("-password -__v");
//     return res.status(200).json({ status: true, data: usersData });
//   } catch (error) {
//     return res.status(400).json({ status: false, message: "Error" });
//   }
// };

const createAccount = async (req, res) => {
  try {
    let usersData = await User.create(req.body);
    // res.send(usersData);
    return res
      .status(200)
      .json({ status: true, msg: "Successfully", user: usersData });
  } catch (error) {
    return res.status(200).json({ status: false, msg: "Error" });
  }
};
const updateAccount = async (req, res) => {
  try {
    let usersData = await User.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        password: req.body.password,
      },

      // req.body,

      {
        new: true,
      }
    );
    // res.send(usersData);
    return res
      .status(200)
      .json({ status: true, msg: "Successfully", user: usersData });
  } catch (error) {
    return res.status(200).json({ status: false, msg: "Error" });
  }
};
const removeAccount = async (req, res) => {
  try {
    let usersData = await User.findByIdAndRemove(req.params.id);
    // res.send(usersData);
    return res
      .status(200)
      .json({ status: true, msg: "Successfully", user: usersData });
  } catch (error) {
    return res.status(200).json({ status: false, msg: "Error" });
  }
};

module.exports = {
  getUsers,
  getUserById,
  //   getUserByEmail,
  createAccount,
  updateAccount,
  removeAccount,
};
