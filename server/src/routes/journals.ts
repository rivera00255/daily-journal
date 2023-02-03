import { Request, Response, Router } from "express";
import { readDB, writeDB } from "../dbController";
import { auth } from "../middleware/auth";
import Journal from "../model/Journal";

const handleId = (journals: Journal[]) => {
  return journals[journals.length - 1].id + 1;
};

const setJournals = (data: any) => writeDB("journals", data);

const createJournal = (req: Request, res: Response) => {
  try {
    let journals = readDB("journals");
    const timestamp = new Date().toISOString();
    const createdJournal: Journal = {
      id: handleId(journals),
      content: req.body.content,
      createdAt: timestamp,
      weather: {
        // status: req.body.weather.status,
        temperature: req.body.weather.temperature,
        precipitation: req.body.weather.precipitation,
      },
      location: req.body.location,
    };
    setJournals([...journals, createdJournal]);
    res.send(createdJournal);
  } catch (e) {
    res.status(500).send({ error: e });
  }
};

const getJournalList = (req: Request, res: Response) => {
  try {
    res.send(readDB("journals"));
  } catch (e) {
    res.send({ error: e });
  }
};

const getJournal = (req: Request, res: Response) => {
  try {
    const journals = readDB("journals");
    const journal = journals.find(
      (item: Journal) => item.id === Number(req.params.id)
    );
    if (!journal) throw new Error("Not Found");
    res.send(journal);
  } catch (e) {
    res.status(500).send({ error: e });
  }
};

const updateJournal = (req: Request, res: Response) => {
  try {
    const journals = readDB("journals");
    const journalIndex = journals.findIndex(
      (item: Journal) => item.id === Number(req.params.id)
    );
    if (journalIndex < 0) throw new Error("Not Found");
    const timestamp = new Date().toISOString();
    const updatedJournal = {
      ...journals[journalIndex],
      content: req.body.content,
      updatedAt: timestamp,
    };
    journals.splice(journalIndex, 1, updatedJournal);
    setJournals(journals);
    res.send(updatedJournal);
  } catch (e) {
    res.status(500).send({ error: e });
  }
};

const deleteJournal = (req: Request, res: Response) => {
  try {
    const journals = readDB("journals");
    const journalIndex = journals.findIndex(
      (item: Journal) => item.id === Number(req.params.id)
    );
    if (journalIndex < 0) throw new Error("Not Found");
    journals.splice(journalIndex, 1);
    setJournals(journals);
    res.send(req.params.id);
  } catch (e) {
    res.status(500).send({ error: e });
  }
};

const router = Router();
router.post("/", auth, createJournal);
router.get("/", getJournalList);
router.get("/:id", getJournal);
router.put("/:id", auth, updateJournal);
router.delete("/:id", auth, deleteJournal);
export default router;
