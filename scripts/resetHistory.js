// this is mongo shell script
// should be used like this:
// mongo db_name resetHistory.js
//
// it clears transactions history from database, reset balances && reset block number
// exchange should go back to it's previous state with next start

db.users.findAndModify({query: {}, update: { $set: {balance: 0, availableBalance: 0}}});
db.exchanges.findAndModify({query: {}, update: { $set: {expectedBalance: 0}}})
db.receipts.findAndModify({query: {}, update: { $set: {state: 'pending'}}});
db.blocks.remove({});

