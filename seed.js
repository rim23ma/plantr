const {db, Gardener, Plot, Vegetable} = require('./models');

const vegData = [
  {
    name: 'cucumber',
    color: 'green',
    planted_on: '2018-03-28'
  },
  {
    name: 'eggplant',
    color: 'violet',
    planted_on: '2018-04-05'
  }
]

const plotData = [
  {
    size: 7,
    shaded: true
  },
  {
    size: 10,
    shaded: false
  }
]
const gardenerData = [
  {
    name: 'Matti',
    age: 28
  },
  {
    name: 'Rimma',
    age: 18
  }
]


db.sync({ force: true })
  .then(() => {
    console.log('Data synced');
    let promiseVeg = Vegetable.bulkCreate(vegData, {returning: true});
    let promisegardener = Gardener.bulkCreate(gardenerData, {returning: true});
    let promiseplot = Plot.bulkCreate(plotData, {returning: true});
    return Promise.all([promiseVeg, promisegardener, promiseplot])
  })
  .then((result) => {
    const [vegs, gardeners, plots] = result;

    console.log('object keys', Object.keys(gardeners[0].__proto__))

    const [cucumber, eggplant] = vegs;


    const [matti, rimma] = gardeners;
    const [plot1, plot2] = plots;
    const promise1 = cucumber.setPlots([plot1, plot2]);
    const promise2 = eggplant.setPlots(plot1);
    const promise3 = plot1.setGardener(matti);
    const promise4 = plot2.setGardener(rimma);
    const promise5 = matti.setFavorite_vegetable(cucumber)
    const promise6 = rimma.setFavorite_vegetable(cucumber)

    return Promise.all([promise1, promise2, promise3, promise4, promise5, promise6])
  })
  .catch(err => {
    console.log('This failed miserable', err);

  })
  .finally(() => {
    db.close();
  });
