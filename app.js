const path = require('path');
const cookieParser = require('cookie-parser')

// express engine/confg
const express = require('express');
const app = express();

// error handler midddleware
const notFoundMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');

//connectDB
const connectDB = require('./database/connection')
const authUser = require('./middlewares/authentication')


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
app.use(cookieParser())


//routes
app.use('/auth', authRouter)
app.use('/task',authUser, taskRouter)


//connect error middleware to our app
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);



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