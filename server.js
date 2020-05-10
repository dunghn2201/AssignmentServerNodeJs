const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const PORT = process.env.PORT || 3000;
const Routes = require("./routes/handlers");
const apiRoutes = require("./routes/api");
const bodyParser = require("body-parser");
const path = require("path");

//Cấu hình cảnh báo hiển thị người cho người dùng
const flash = require("connect-flash");
app.use(flash());

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //parse application/json

// cấu hình thư mục public và upload image
const publicPath = path.resolve(__dirname, "public");
const uploadUsersFile = path.resolve(__dirname, "./public/assets/images/users");
const uploadSneakersFile = path.resolve(
  __dirname,
  "./public/assets/images/sneakers"
);
app.use(express.static(publicPath));
app.use(express.static(uploadSneakersFile));
app.use(express.static(uploadUsersFile));

//cấu hình mongodb
const connectDB = require("./config/db");
connectDB();

//cấu hình form gửi đi
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//cấu hình express handlebars
app.engine(
  "hbs",
  exphbs({
    extname: "hbs", // Tên đuôi file (VD: .hbs)
    defaultView: "main", //Tên layout mặc định
    layoutsDir: __dirname + "/views/layouts/", //Đường dẫn chứa layout mặc định
  })
);
app.set("view engine", "hbs");

//Điều hướng trong trang
app.use(Routes);
app.use(apiRoutes);
app.get("*", (req, res) => {
  res.render("Error404", {
    title: "404 - Page not found",
    layout: "main",
    script3: "error-404",
  });
});
//Khởi chạy server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
