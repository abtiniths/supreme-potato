//const sequelize = require('../database/config');

const  Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'ingeBBDB'
  });


const Task = require('./task');
const User = require('./User');
const Message = require('./Message');


const Tasks = Task(sequelize,Sequelize.DataTypes);
const Users = User(sequelize,Sequelize.DataTypes);
const Messages = Message(sequelize,Sequelize.DataTypes);



Users.belongsToMany(Tasks, { through: Messages });
Tasks.belongsToMany(Users, { through: Messages });
Users.hasMany(Messages);
Messages.belongsTo(Users);
Tasks.hasMany(Messages);
Messages.belongsTo(Tasks);


module.exports = {
    Tasks,
    Users,
    Messages
    }