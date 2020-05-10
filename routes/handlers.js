const express = require("express");
const router = express.Router();
const User = require("../models/users");
const controllerUser = require("../controllers/users");
const controllerSneaker = require("../controllers/sneakers");
const multer = require("multer");
const path = require("path");
//import controller
const session = require("express-session");
const Passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

//cấu hình Passport
router.use(
  session({
    secret: "fpoly2792", //thuôc tính bắt buộc
    resave: true,
    saveUninitialized: true,
    // cookie: {
    //   maxAge: 1000 * 60 * 5,
    // },
    //cookie sẽ tồn tại trong 5 phút, nếu xóa dòng code sau thì cookie sẽ hết hạn sau khi đóng trinh duyệt
  })
);

//2 hàm khởi tạo passport
router.use(Passport.initialize());
router.use(Passport.session());

//chứng thực thông tin đăng nhập trên mongoDB
Passport.use(
  new LocalStrategy(
    //email, password là name của thẻ input trong form login, nếu k khai báo mặc định sẽ là username, password
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      User.findOne({ email: email, password: password }, function (err, user) {
        console.log(user);
        if (err) {
          console.log(err);
        }
        if (user) {
          //thành công sẽ trả về true với giá trị user
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    }
  )
);

//sau khi chứng thức thành công passport sẽ gọi hàm .serializeUser() vói tham số user giá trị đã lưu bên trên
//chọn thuộc tính email của user để ghi vào cookie
Passport.serializeUser((user, done) => {
  done(null, user.email);
});

//biến cookieID chính là giá trị user.email bên trên
Passport.deserializeUser((cookieID, done) => {
  User.findOne({ email: cookieID }, function (err, user) {
    if (err) {
      console.log(err);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
});

//khai báo phương thức xác thực đăng nhập sau
const isAuthenticated = function (request, response, next) {
  if (request.isAuthenticated()) return next();
  response.redirect("/"); //nếu chưa đăng nhập sẽ quay về trang login
};

//cấu hình multer
const Sneaker = require("../models/sneakers");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/assets/images/sneakers");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/assets/images/users");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  //kiểm tra file upload có phải là hình ảnh hay không
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 5, //giới hạn filezize=5MB
  },
});

const upload1 = multer({
  storage: storage1,
  //kiểm tra file upload có phải là hình ảnh hay không
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 5, //giới hạn filezize=5MB
  },
});

router.get("/", controllerUser.getSignIn);
router.post(
  "/Sign-In",
  Passport.authenticate("local", {
    successRedirect: "/Dashboard",
    failureRedirect: "/",
  })
);

router.get("/Sign-Up", controllerUser.getSignUp);
router.post("/Sign-Up", upload1.single("avatar"), controllerUser.postSignUp);
//Crud Sneaker
router.get("/Dashboard", isAuthenticated, controllerSneaker.getSneakers);
router.get("/Edit/:id", isAuthenticated, controllerSneaker.getSneaker);
router.post(
  "/Edit",
  isAuthenticated,
  upload.single("image"),
  controllerSneaker.editSneaker
);
router.get("/Delete/:id", isAuthenticated, controllerSneaker.deleteSneaker);

//Crud User
router.get("/Users", isAuthenticated, controllerUser.getUsers);
router.get("/Profile/:id", isAuthenticated, controllerUser.getUser);
router.post(
  "/Profile",
  isAuthenticated,
  upload1.single("avatar"),
  controllerUser.editUser
);
router.get("/DeleteUser/:id", isAuthenticated, controllerUser.deleteUser);

/* Handle Logout */
router.get("/Sign-Out", function (req, res) {
  req.logout();
  res.redirect("/");
});

//phương thức uploadfile + insert dữ liệu vào mongodb
router.post("/upload", isAuthenticated, upload.single("image"), (req, res) => {
  let sneaker = new Sneaker({
    nameSneaker: req.body.nameSneaker,
    size: req.body.size,
    material: req.body.material,
    price: Number(req.body.price).toLocaleString("en"),
    color: req.body.color,
    image: req.file.originalname, //chỉ lấy tên file upload
  });
  sneaker.save((err) => {
    if (err) {
      console.log(err);
      return;
    } else {
      res.redirect("/Dashboard");
    }
  });
});

module.exports = router;
