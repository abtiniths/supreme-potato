const path = require('path');


// express engine/confg
const express = require('express');
const app = express();



//routers
const authRouter = require('./routes/auth')
const taskRouter = require('./routes/task')

// dotenv
require('dotenv').config();
let port = process.env.PORT || 3000;
let host = process.env.HOST



// expres middleware && static files
app.use( express.json() );
app.use( express.urlencoded({ extended: true}))
app.use('/static', express.static(path.join(__dirname, 'public')));





//connectDB
const connectDB = require('./database/connection')


//routes
app.use('/auth', authRouter)
app.use('/task', taskRouter)






const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on ${host}:${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();