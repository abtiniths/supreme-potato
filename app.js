const path = require('path');


// express engine/confg
const express = require('express');
const app = express();



// dotenv
require('dotenv').config();
let port = process.env.PORT
let host = process.env.HOST





// expres middleware && static files
app.use( express.json() );
app.use( express.urlencoded({ extended: true}))
app.use('/static', express.static(path.join(__dirname, 'public')));















app.listen(port, host, () => {
    console.log(`Server is listening ${host}:${port}`)
});