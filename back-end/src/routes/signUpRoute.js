import { getDbConnection } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
require("dotenv").config();

export const signUpRoute = {
  path: "/api/signup",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;

    var db = getDbConnection("react-db-auth");
    console.log("before databse")
    var user = await db.collection("users").findOne({ email });

    if (user) res.sendStatus(409);
    console.log("user is here:", user)

    const hashedPassword = await bcrypt.hash(password, 10);

    const initialInfo = {
      hairColor: "",
      isVerfied: false,
    };

    const result = await db.collection("users").insertOne({
      email,
      hashedPassword,
      initialInfo,
    });

    const { insertedId } = result;
    // console.log("id from database", insertedId)

    jwt.sign(
      {
        id: insertedId,
        email,
        initialInfo,
        isVerfied: false,
      },
      `${process.env.JWT_KEY}`,
      {expiresIn: '2d'},
      (err, token) => {
        if (err) {
            // console.log("error inside token", err)
          return res.sendStatus(500).send(err);
        } else {
            // console.log("token from server", token)
          return res.sendStatus(200).json({ token });
        }
      }
    );
  },
};
