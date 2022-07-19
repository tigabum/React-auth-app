import { MongoClient } from "mongodb";

let client;

export const initializeDbConnection = async () => {
  client = await MongoClient.connect("mongodb+srv://tigmitiku:tigmit@cluster0.pvxe8.mongodb.net/local_library?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export const getDbConnection = (dbName) => {
  const db = client.db(dbName);
  return db;
};
