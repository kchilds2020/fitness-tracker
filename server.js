require('dotenv/config');
const express = require('express');
const path = require('path');
const cors = require('cors');
const users = require('./api/user');
const workouts = require('./api/workouts');
const routes = require('./routes/routing')
let bodyParser = require('body-parser');
const mongoose =require('mongoose');
const PORT = process.env.PORT || 5000;
let session = require('express-session');
var MemoryStore = require('memorystore')(session)

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
})); 

app.use(express.json());
app.use(cors());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { 
      secure: false, 
      maxAge: 1000 * 60 * 60 * 2,
      httpOnly: false,
      path: '/'
    },
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    })
}));

app.use(express.static(path.join(__dirname,'client/build')));

app.use(users);
app.use(workouts)
app.use(routes);
 //app.use(express.static(path.join(__dirname,'client/build')));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false
  });




app.listen(PORT, () => {console.log(`**SERVER STARTED**  PORT: ${PORT}`);})