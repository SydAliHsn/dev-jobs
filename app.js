const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
let morgan;
if (process.env.NODE_ENV === 'development') morgan = require('morgan');

const jobRouter = require('./routes/jobsRoutes');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

const app = express();

app.use(cors({ origin: '*' }));

app.use(helmet());

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 169, // Limit each IP to 169 requests per `window` (here, per 60 minutes)
  standardHeaders: true,
});
app.use(limiter);

app.use(express.json({ limit: '18kb' }));

app.use(mongoSanitize());

app.use(xss());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(`${__dirname}/client/build`));
}

app.use('/api/v1/jobs', jobRouter);

// Handle request for non-existent routes
app.all('*', (req, res, next) => {
  next(new AppError('This path does not exist on the server.', 404));
});

app.use(globalErrorHandler);

module.exports = app;
