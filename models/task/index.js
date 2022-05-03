
module.exports = (sequelize, DataTypes) => { 
 const Task = sequelize.define('task', {

    task_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        defaultValue: "TASK",
    },
    done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
   
   
   
       
       
})


return Task

}