import mongoose from "mongoose";

export const connectData = () => {
  mongoose
    .connect(process.env.MONG_URI, {
      dbName: "Database",
      useNewUrlParser: true,
    })
    .then((c) => {
      console.log(`Database connected ${c.connection.host}`);
    })
    .catch((e) => {
      console.log(e);
    });
};
