const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const express = require("express");
const app = express();
const server = require("http").createServer(app);
app.use(cors());
let io = require("./io/index");
io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// error handler midddleware
const notFoundMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");

//auth middlewares
const { adminAuth } = require("./middlewares/rolesAuth");
const authUser = require("./middlewares/authentication");

//connectDB
const connectDB = require("./database/connection");

//routers
const authRouter = require("./routes/auth");
const taskRouter = require("./routes/task");
const adminRouter = require("./routes/admin");

// dotenv
require("dotenv").config();
let port = process.env.PORT || 3000;
let host = process.env.HOST;

// express middleware && static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.static("public"));
app.use(cookieParser());

//routes
app.use("/auth", authRouter);
app.use("/task", authUser, taskRouter);
app.use("/admin", authUser, adminAuth, adminRouter);

//connect error middleware to our app
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    server.listen(port, () =>
      console.log(`🚀🚀🚀 Server is listening on  🚀🚀🚀 ${host}:${port}...✓`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
