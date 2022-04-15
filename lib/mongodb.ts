import { connect, connection } from "mongoose";

const mongoDB = process.env.MONGODB_URI as string;
connect(mongoDB);
const db = connection;

export default db;
