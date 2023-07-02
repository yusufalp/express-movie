const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');

const indexRoutes = require('./routes/indexRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/views'));

app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname + '/public')));

app.use('/', indexRoutes);

app.listen(PORT);
console.log(`The server is listening on port ${PORT}`);