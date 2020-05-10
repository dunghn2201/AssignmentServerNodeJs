const express = require("express");
const router = express.Router();
const userControllerAPI = require("../controllers/api/usersController");
const sneakerControllerAPI = require("../controllers/api/sneakersController");

//User API
router.get("/api/users", userControllerAPI.getUsers);
// router.get("/api/users/:id", userControllerAPI.getUserById);
// // router.get("/api/user", userControllerAPI.getUserByEmail);
// router.post("/api/user/add", userControllerAPI.createAccount);
// router.post("/api/user/update/:id", userControllerAPI.updateAccount);
// router.delete("/api/users/:id", userControllerAPI.removeAccount);

//Sneaker API
router.get("/api/sneakers", sneakerControllerAPI.getSneakers);
router.get("/api/sneaker/:id", sneakerControllerAPI.getSneaker);
router.put("/api/sneaker/edit/:id", sneakerControllerAPI.editSneaker);
router.delete("/api/sneaker/delete/:id", sneakerControllerAPI.deleteSneaker);

module.exports = router;
