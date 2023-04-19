import mongoose from "mongoose";

export const connectData = () => {
  mongoose
    .connect(process.env.MONG_URI, {
      dbName: "Database",
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("Database connected");
    })
    .catch((e) => {
      console.log(e);
    });
};
