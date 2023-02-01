import { Request, Response } from "express";
import { readDB, writeDB } from "../dbController";
import Journal from "../model/Journal";

const handleId = (journals: Journal[]) => {
  return journals[journals.length - 1].id + 1;
};

const setJournals = (data: any) => writeDB(data);

export const createJournal = (req: Request, res: Response) => {
  try {
    let journals = readDB();
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

export const getJournalList = (req: Request, res: Response) => {
  try {
    res.send(readDB());
  } catch (e) {
    res.send({ error: e });
  }
};

export const getJournal = (req: Request, res: Response) => {
  try {
    const journals = readDB();
    const journal = journals.find(
      (item: Journal) => item.id === Number(req.params.id)
    );
    if (!journal) throw Error("Not Found");
    res.send(journal);
  } catch (e) {
    res.status(500).send({ error: e });
  }
};

export const updateJournal = (req: Request, res: Response) => {
  try {
    const journals = readDB();
    const journalIndex = journals.findIndex(
      (item: Journal) => item.id === Number(req.params.id)
    );
    if (journalIndex < 0) throw Error("Not Found");
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

export const deleteJournal = (req: Request, res: Response) => {
  try {
    const journals = readDB();
    const journalIndex = journals.findIndex(
      (item: Journal) => item.id === Number(req.params.id)
    );
    if (journalIndex < 0) throw Error("Not Found");
    journals.splice(journalIndex, 1);
    setJournals(journals);
    res.send(req.params.id);
  } catch (e) {
    res.status(500).send({ error: e });
  }
};
