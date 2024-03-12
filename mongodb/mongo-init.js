db.auth(
  process.env.MONGO_INITDB_ROOT_USERNAME,
  process.env.MONGO_INITDB_ROOT_PASSWORD
);

db.getSiblingDB(process.env.M_DATABASE);

db.createUser({
  user: process.env.M_USERNAME,
  pwd: process.env.M_PASSWORD,
  roles: [
    {
      role: 'root',
      db: process.env.M_DATABASE,
    },
  ],
});
