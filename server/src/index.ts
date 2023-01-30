import express, { json, urlencoded } from "express";
import {
  createJournal,
  deleteJournal,
  getJournal,
  getJournalList,
  updateJournal,
} from "./routes/journals";

const app = express();
const port = 8000;

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.use(urlencoded({ extended: true }));
app.use(json());

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.post("/journals", createJournal);
app.get("/journals", getJournalList);
app.get("/journals/:id", getJournal);
app.put("/journals/:id", updateJournal);
app.delete("/journals/:id", deleteJournal);
