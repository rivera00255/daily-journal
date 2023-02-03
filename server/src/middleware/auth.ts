import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) throw new Error("Token is missing");
    const user = jwt.verify(token, `${process.env.JWT_KEY}`);
    if (!user) throw new Error("Unauthorization");
    return next();
  } catch (e) {
    console.log(e);
    res.status(401).send({ error: "Unauthorization" });
  }
};
