// this is mongo shell script
// should be used like this:
// mongo db_name resetHistory.js
//
// it clears transactions history from database, reset balances && reset block number
// exchange should go back to it's previous state with next start

db.users.update({}, {$set: { balance: 0, availableBalance: 0 }}, { multi: true })
db.receipts.update({}, {$set: { state: 'pending' }}, { multi: true })
db.exchanges.findAndModify({query: {}, update: { $set: {expectedBalance: 0}}})
db.blocks.remove({});

