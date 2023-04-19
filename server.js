import { app } from "./app.js";
import { connectData } from "./Data/database.js";
connectData();
app.listen(process.env.PORT, () => {
  console.log(
    `server is running on : ${process.env.PORT} in ${process.env.NODE_ENV} Mode `
  );
});
