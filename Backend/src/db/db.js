import database from 'better-sqlite3';

let db;
try{
  db = new database('src/db/data.sqlite');
}catch (e){
  console.error("Error initializing database! ", e)
  throw e
}

export default db;