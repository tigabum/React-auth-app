import { getDbConnection } from "../db";
import bcrypt from "bcrypt";
export const signUpRoute = {
  path: "/api/signup",
  method: "Post",
  handler: async (req, res) => {
    const { email, password } = req.body;

    var db = getDbConnection("react-db-auth");
    var user = db.collection("users").findOne({ email });

    if (email) res.sendStatus(409);

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
  },
};
