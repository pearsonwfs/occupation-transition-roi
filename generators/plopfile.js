const bootstrap = require('./bootstrap');
const addNewApp = require('./addNewApp');

module.exports = function(plop) {
  bootstrap(plop)
  addNewApp(plop)
}
