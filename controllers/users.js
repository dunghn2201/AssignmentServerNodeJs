//Sign in
const User = require("../models/users");
const getUsers = function (req, res) {
  User.find({})
    .lean()
    .exec(function (error, data) {
      res.render("Users", {
        userList: data.reverse(),
        title: "Users",
        style: "datatable.css",
        script1: "dashboard1.js",
        script3: "datatable.js",
        link6: "https://code.jquery.com/jquery-3.3.1.js",
        link7: "https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js",
        link8:
          "https://cdn.datatables.net/1.10.20/js/dataTables.bootstrap4.min.js",
        link1:
          "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.css",
        link2:
          "https://cdn.datatables.net/1.10.20/css/dataTables.bootstrap4.min.css",
      });
      // console.log(data);
      if (error) {
        console.log(error);
        throw err;
      }
    });
};

const getUser = function (req, res) {
  User.findById(req.params.id)
    .lean()
    .exec((err, doc) => {
      if (!err) {
        res.render("Profile", {
          User: doc,
          title: "Profile",
        });
      }
    });
};
//chỉnh sửa
const editUser = function (req, res) {
  // bcrypt.hash(password);
  User.updateOne(
    { _id: req.body._id },
    {
      $set: {
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        password: req.body.password,
        avatar: req.file.originalname,
      },
    },
    (err, doc) => {
      if (!err) {
        res.redirect("/Users");
      } else {
        res.redirect("/Users");
        console.log(err);
        throw err;
      }
    }
  );
};
const deleteUser = function (req, res) {
  User.deleteOne({ _id: req.params.id }, function (err, doc) {
    if (!err) {
      res.redirect("/Users");
    } else {
      console.log(err);
      throw err;
    }
  });
};

const getSignIn = (req, res) => {
  res.render("Sign-In", {
    style: "login.css",
    link1:
      "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.slim.min.js",
    link2:
      "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css",
    link3:
      "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js",
    link4: "https://use.fontawesome.com/releases/v5.8.2/css/all.css",
  });
};
const postSignIn = (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      if (user.password == req.body.password) {
        res.render("Dashboard", {
          title: "Home Page",
          style: "datatable.css",
          script1: "dashboard1.js",
          script3: "datatable.js",
          link6: "https://code.jquery.com/jquery-3.3.1.js",
          link7:
            "https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js",
          link8:
            "https://cdn.datatables.net/1.10.20/js/dataTables.bootstrap4.min.js",
          link1:
            "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.css",
          link2:
            "https://cdn.datatables.net/1.10.20/css/dataTables.bootstrap4.min.css",
        });
      } else {
        res.render("Sign-In", {
          style: "login.css",
          link1:
            "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.slim.min.js",
          link2:
            "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css",
          link3:
            "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js",
          link4: "https://use.fontawesome.com/releases/v5.8.2/css/all.css",
        });
      }
    } else {
      res.render("Sign-In", {
        style: "login.css",
        link1:
          "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.slim.min.js",
        link2:
          "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css",
        link3:
          "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js",
        link4: "https://use.fontawesome.com/releases/v5.8.2/css/all.css",
      });
    }
  });
};
//Sign-Up
const getSignUp = (req, res) => {
  res.render("Sign-Up", {
    title: "Profile",
    style: "signup.css",
    style2: "login.css",
    script2: "signup.js",
    link5: "https://fonts.googleapis.com/css?family=Kaushan+Script",
    link6:
      "https://cdn.jsdelivr.net/jquery.validation/1.15.1/jquery.validate.min.js",
  });
};
const postSignUp = (req, res) => {
  const fullName = req.body.fullName;
  const email = req.body.email;
  const phone = req.body.phone;
  const address = req.body.address;
  const avatar = req.file.originalname;
  const password = req.body.password;
  const password2 = req.body.password2;

  if (password != password2) {
    console.log("Password do not match");
  } else {
    let newUser = new User({
      email: email,
      fullName: fullName,
      phone: phone,
      address: address,
      password: password,
      avatar: avatar,
    });

    newUser.save((err) => {
      if (err) {
        console.log(err);
        throw err;
      } else {
        res.redirect("/Dashboard");
      }
    });
  }
};
module.exports = {
  getUsers,
  getUser,
  editUser,
  deleteUser,
  getSignIn,
  getSignUp,
  postSignIn,
  postSignUp,
};
