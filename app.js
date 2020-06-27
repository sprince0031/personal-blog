require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({limit: '16mb', extended: true}));
app.use(express.json());
app.use(cors());

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });
const dbConnection = mongoose.connection;
dbConnection.once('open', () => {
  console.log('MongoDB connection established successfully!');
});

const rootRouter = require('./routes/root');
const postsRouter = require('./routes/posts');
const adminRouter = require('./routes/admin');

app.use('', rootRouter);
app.use('/posts', postsRouter);
app.use('/admin', adminRouter)

app.use(function(req, res, next){
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('404');
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: '404, Not found!' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('404, Not found!');
});


app.listen(port, function() {
  console.log("Server started on port 3000");
});
