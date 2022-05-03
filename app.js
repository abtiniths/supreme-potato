const path = require('path');
const { Users, Tasks } = require("./models");

// express engine/confg
const express = require('express');
const app = express();



//routers
const authRouter = require('./routes/auth')
const taskRouter = require('./routes/task')

// dotenv
require('dotenv').config();
let port = process.env.PORT
let host = process.env.HOST

// global async
;(async () => {
    await Users.sequelize.sync({force:true});
    await Tasks.sequelize.sync({force: true});
})();



// expres middleware && static files
app.use( express.json() );
app.use( express.urlencoded({ extended: true}))
app.use('/static', express.static(path.join(__dirname, 'public')));








//routes
app.use('/auth', authRouter)
app.use('/task', taskRouter)






app.listen(port, host, () => {
    console.log(`Server is listening ${host}:${port}`)
});