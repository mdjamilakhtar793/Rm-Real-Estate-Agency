import mongoose from "mongoose";
const connectDatabase = () => {
  mongoose.connect(process.env.DB_URI).then((data) => {
    console.log(`MongoDb Connected With Server : ${data.connection.host}`);
  });
};

export default connectDatabase;
