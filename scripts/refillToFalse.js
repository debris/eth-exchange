// this is mongo shell script
// should be used like this:
// mongo db_name refillToFalse.js
//
// sets exchange needsRefill field to false
//

db.exchanges.update({}, {$set: {needsRefill: false}})
