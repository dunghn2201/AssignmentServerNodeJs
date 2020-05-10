const Sneaker = require("../.././models/sneakers");

const getSneakers = async (req, res) => {
  try {
    // let usersData = await User.find().select("-password");
    let sneakersData = await Sneaker.find().select("-__v");
    res.send(sneakersData);
    // return res.status(200).json({ status: true, data: sneakersData });
  } catch (error) {
    console.log(error);
    // return res.status(200).json({ status: false, msg: "Error" });
  }
};

const getSneaker = async (req, res) => {
  try {
    let sneakerData = await Sneaker.findById(req.params.id);
    res.send(sneakerData);
    // return res.status(200).json({ status: true, data: sneakerData });
  } catch (error) {
    console.log(err);
  }
};

const editSneaker = async (req, res) => {
  try {
    let sneaker = await Sneaker.findById(req.params.id);
    sneaker.set(req.body);
    let sneakerData = await sneaker.save();
    res.send(sneakerData);
    // return res.status(200).json({ status: true, data: sneakerData });
  } catch (error) {
    console.log(err);
  }
};

const deleteSneaker = async (req, res) => {
  try {
    let sneakerData = await Sneaker.deleteOne({ _id: req.params.id });
    res.send(sneakerData);
    // return res.status(200).json({ status: true, data: sneakerData });
  } catch (error) {
    console.log(err);
  }
};

module.exports = {
  getSneakers,
  getSneaker,
  editSneaker,
  deleteSneaker,
};
