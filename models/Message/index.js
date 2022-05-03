
module.exports = (sequelize, DataTypes) => { 
 const Message = sequelize.define('message', {

    message_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    msg: {
        type: DataTypes.STRING,
    },     
       
})


return Message

}