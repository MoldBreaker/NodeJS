const express = require('express');
const { engine } = require ('express-handlebars');
const path = require('path');
const morgan = require('morgan');
var methodOverride = require('method-override')
const app = express();
const port = 3000;

const route = require('./routes/index.js');
const db = require('./config/db');

app.use(methodOverride('_method'))
//Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

//HTTP logger
// app.use(morgan('combined'))

//templ;ate engine
app.engine('hbs', engine({
  extname: '.hbs',
  helpers: {
    sum: (a,b) => a+b
  }
}));
app.set('view engine', 'hbs');
app.set("views", path.join(__dirname, 'resource', 'views'));

//routes init
route(app);

//127.0.0.1 - localhost
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`)
})