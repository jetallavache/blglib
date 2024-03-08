db = db.getSiblingDB(process.env.M_DATABASE)

db.createUser({
  user: process.env.M_USERNAME,
  pwd: process.env.M_PASSWORD,
  roles: [
    {
      role: 'dbOwner',
      db: process.env.M_DATABASE,
    },
  ],
});