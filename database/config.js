const  Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'ingeBBDB'
  });


module.exports = sequelize