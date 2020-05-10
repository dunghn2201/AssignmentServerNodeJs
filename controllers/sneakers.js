const Sneaker = require("../models/sneakers");

//get tất cả sản phẩm
const getSneakers = function (req, res) {
  Sneaker.find()
    .lean()
    .exec(function (error, data) {
      res.render("Dashboard", {
        sneakerList: data.reverse(),
        title: "Home Page",
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
        log(error);
      }
    });
};

//get 1 sản phẩm
const getSneaker = function (req, res) {
  Sneaker.findById(req.params.id)
    .lean()
    .exec((err, doc) => {
      if (!err) {
        res.render("Edit", {
          Sneaker: doc,
          script3: "edit.js",
          link1:
            "https://unpkg.com/bootstrap-material-design@4.1.1/dist/css/bootstrap-material-design.min.css",
          link6: "https://unpkg.com/popper.js@1.12.6/dist/umd/popper.js",
          link7:
            "https://unpkg.com/bootstrap-material-design@4.1.1/dist/js/bootstrap-material-design.js",
        });
      } else {
        res.redirect("/Dashboard");
        console.log(err);
      }
    });
};
//chỉnh sửa
const editSneaker = function (req, res) {
  Sneaker.updateOne(
    { _id: req.body._id },
    {
      $set: {
        nameSneaker: req.body.nameSneaker,
        size: req.body.size,
        material: req.body.material,
        price: Number(req.body.price).toLocaleString("en"),
        color: req.body.color,
        image: req.file.originalname,
      },
    },
    (err, doc) => {
      if (!err) {
        res.redirect("/Dashboard");
      } else {
        res.log("Edit Failed");
      }
    }
  );
};

const deleteSneaker = function (req, res) {
  Sneaker.deleteOne({ _id: req.params.id }, function (err, doc) {
    if (!err) {
      res.redirect("/Dashboard");
    } else {
      console.log(err);
    }
  });
};
module.exports = {
  getSneakers,
  getSneaker,
  deleteSneaker,
  editSneaker,
};
