import fs from "fs";
import { resolve } from "path";

const basePath = resolve();
const filePath = {
  journals: resolve(basePath, "src/db/journals.json"),
  users: resolve(basePath, "src/db/users.json"),
};

export const readDB = (target: string) => {
  try {
    return target === "journals"
      ? JSON.parse(fs.readFileSync(filePath.journals, "utf-8"))
      : JSON.parse(fs.readFileSync(filePath.users, "utf-8"));
  } catch (e) {
    console.log(e);
  }
};

export const writeDB = (target: string, data: any) => {
  try {
    return target === "journals"
      ? fs.writeFileSync(filePath.journals, JSON.stringify(data))
      : fs.writeFileSync(filePath.users, JSON.stringify(data));
  } catch (e) {
    console.log(e);
  }
};
