const express = require('express');
const { engine } = require ('express-handlebars');
const path = require('path');
const morgan = require('morgan');
var methodOverride = require('method-override')
const app = express();
const port = 3000;

const route = require('./routes/index.js');
const db = require('./config/db');
const SortMiddleware = require('./app/middlewares/SortMiddleware.js');

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
    sum: (a,b) => a+b,
    sortable: (field, sort) => {

      const sortType = field === sort.column ? sort.type : 'default';

      const icons = {
        default: 'https://cdn-icons-png.flaticon.com/512/1251/1251670.png?w=826&t=st=1681877939~exp=1681878539~hmac=ef63365ea0c54e3e28cc39e13326846785998995ae372bb0cd44d57d6dcab3e7',
        asc: 'https://cdn-icons-png.flaticon.com/512/120/120870.png?w=826&t=st=1681880768~exp=1681881368~hmac=7881268e871fc3a6b0577cf937e003d1c9a09165bfadfd6175eea7e222a278a4',
        desc: 'https://cdn-icons-png.flaticon.com/512/130/130864.png?w=826&t=st=1681880820~exp=1681881420~hmac=3eb0b0f280344e8532051d55451c10d8b8fddd5af5afe1c7947894c937de3717'
      }

      const types = {
        default: 'desc',
        asc: 'desc',
        desc: 'asc'
      }

      const icon = icons[sortType];
      const type = types[sortType];

      return `<a href="?_sort&column=${field}&type=${type}"> 
      <img width="16px" src="${icon}" alt="sort">
      </a>`;
    }
  }
}));
app.set('view engine', 'hbs');
app.set("views", path.join(__dirname, 'resource', 'views'));

//Custom middleware
app.use(SortMiddleware);

//routes init
route(app);

//127.0.0.1 - localhost
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`)
})