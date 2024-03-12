// db.auth(
//   process.env.MONGO_INITDB_ROOT_USERNAME,
//   process.env.MONGO_INITDB_ROOT_PASSWORD
// );

db.getSiblingDB(process.env.M_DATABASE);

db.mycollection.insert([
  { name: 'test-collection' }
]);

db.createUser({
  user: process.env.M_USERNAME,
  pwd: process.env.M_PASSWORD,
  roles: [
    {
      role: 'readWrite',
      db: process.env.M_DATABASE,
    },
  ],
});


// db.createUser({
//   user: 'eddacris',
//   pwd: 'qiztuw-qiQhy4',
//   roles: [
//     {
//       role: 'readWrite',
//       db: 'blglib-db',
//     },
//   ],
// });