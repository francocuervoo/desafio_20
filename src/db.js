import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { PORT, MONGO_URI } = process.env;

export const mongoConnect = () => {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.once("open", () => {
    console.log, "Conectado a la base de datos";
  });
  mongoose.connection.on("error", (err) => {
    console.log(err);
  });
};
