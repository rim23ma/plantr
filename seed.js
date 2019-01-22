const db = require('./models');

db.sync({ force: true })
  .then(() => {
    console.log('Data synced');
  })
  .catch(err => {
    console.log('This failed miserable', err);
  })
  .finally(() => {
    db.close();
  });
