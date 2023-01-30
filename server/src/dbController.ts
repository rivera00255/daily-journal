import fs from "fs";
import { resolve } from "path";

const basePath = resolve();
const filePath = resolve(basePath, "src/db/db.json");

export const readDB = () => {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch (e) {
    console.log(e);
  }
};

export const writeDB = (data: any) => {
  try {
    return fs.writeFileSync(filePath, JSON.stringify(data));
  } catch (e) {
    console.log(e);
  }
};
