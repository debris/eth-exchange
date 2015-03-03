// this is mongo shell script
// should be used like this:
// mongo db_name refillToTrue.js
//
// sets exchange needsRefill field to true 
//

db.exchanges.update({}, {$set: {needsRefill: true}})
