// db = db.getSiblingDB(process.env.M_DATABASE)

// db.createUser({
//   user: process.env.M_USERNAME,
//   pwd: process.env.M_PASSWORD,
//   roles: [
//     {
//       role: 'dbOwner',
//       db: process.env.M_DATABASE,
//     },
//   ],
// });

db.getSiblingDB('admin').auth(
  process.env.MONGO_INITDB_ROOT_USERNAME,
  process.env.MONGO_INITDB_ROOT_PASSWORD
);

db.createUser({
  user: process.env.M_USERNAME,
  pwd: process.env.M_PASSWORD,
  roles: [
    "readWrite"
  ],
});
