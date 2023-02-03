import express, { json, urlencoded } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import journalRoutes from "./routes/journals";
import { login, saveUser } from "./routes/users";

const app = express();
const port = 8000;

dotenv.config();

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.use(urlencoded({ extended: true }));
app.use(json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.use("/journals", journalRoutes);

app.post("/users", saveUser);
app.post("/login", login);
