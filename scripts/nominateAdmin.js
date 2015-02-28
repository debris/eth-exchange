// this is mongo shell script
// should be used like this:
// mongo db_name nominateAdmin.js
//
// it nominates ALL users to admins

db.users.findAndModify({query: {}, update: { $set: {role: "admin"}}})

