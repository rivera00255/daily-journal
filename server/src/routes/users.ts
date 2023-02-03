import { Request, Response } from "express";
import { readDB, writeDB } from "../dbController";
import User from "../model/Users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// const hashPassword = (password: string) => {
//   bcrypt.genSalt(saltRounds, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//       return hash;
//     });
//   });
// };

const setUsers = (data: any) => writeDB("users", data);

const findUser = (email: string) => {
  const users = readDB("users");
  const user = users.find((item: User) => item.email === email);
  return user ? true : false;
};

export const saveUser = async (req: Request, res: Response) => {
  try {
    if (!findUser(req.body.email)) {
      const users = readDB("users");
      const timestamp = new Date().toISOString();
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      const newUser: User = {
        email: req.body.email,
        password: hashedPassword,
        createdAt: timestamp,
      };
      setUsers([...users, newUser]);
      res.send(newUser);
    } else {
      res.status(400).send({ error: "이미 등록된 계정입니다." });
    }
  } catch (e) {
    res.status(500).send({ error: e });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const users = readDB("users");
    const user = await users.find(
      (item: User) => item.email === req.body.email
    );
    if (!user) res.status(401).send({ error: "사용자를 찾을 수 없습니다." });
    const matchesPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!matchesPassword)
      res.status(401).send({ error: "비밀번호가 일치하지 않습니다." });
    // const token = jwt.sign(user.email, "2w3e4r");
    const token = jwt.sign(
      {
        // exp: 60 * 60,
        data: user.email,
      },
      `${process.env.JWT_KEY}`
    );
    res.send({ user, token });
  } catch (e) {
    res.status(400).send({ error: e });
  }
};
