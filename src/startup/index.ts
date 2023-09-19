import database from "../config/database";

export default async function startup() {
    await database.init();
  }