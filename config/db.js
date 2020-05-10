const mongoose = require("mongoose");
MONGO_URI =
  "mongodb+srv://Dunghn:Kh0ngluibuoc@cluster0-ya1rv.mongodb.net/dbSneakerFpoly2792?retryWrites=true&w=majority";
const connectDB = async () => {
  const conn = await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  console.log(`MongoDB Connected: ${conn.connection.host}`);
};
module.exports = connectDB;
