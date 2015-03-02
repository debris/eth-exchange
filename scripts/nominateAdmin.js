// this is mongo shell script
// should be used like this:
// mongo db_name nominateAdmin.js
//
// it nominates ONE user to be admin

//db.users.findAndModify({query: {}, update: { $set: {role: "admin"}}})
db.users.update({}, {$set: { role: 'admin' }}, {multi: true})

