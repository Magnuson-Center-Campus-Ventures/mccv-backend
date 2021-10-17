import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import mongoose from 'mongoose';
import apiRouter from './router';

// initialize
const app = express();

// enable/disable cross origin resource sharing if necessary
app.use(cors());

// enable/disable http request logging
app.use(morgan('dev'));

// enable only if you want templating
app.set('view engine', 'ejs');

// enable only if you want static assets from folder static
app.use(express.static('static'));

// this just allows us to render ejs from the ../app/views directory
app.set('views', path.join(__dirname, '../src/views'));

// enable json message body for posting data to API
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', apiRouter);

// DB Setup
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/mcv';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
  console.log("Successfully connected to MongoDB")
}).catch(error=>{
  console.log("Unable to connect to MongoDB: "+error)
});
// set mongoose promises to es6 default
mongoose.Promise = global.Promise;

// default index route
app.get('/', (req, res) => {
  res.send('Welcome to Magnuson Campus Ventures');
});

// START THE SERVER
// =============================================================================
// const port = process.env.PORT || 9090;
const port = 80
app.listen(port);

console.log(`listening on: ${port}`);
