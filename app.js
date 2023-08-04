const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
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
  max: 1000, // Limit each IP to 1000 requests per `window` (here, per 60 minutes)
  standardHeaders: true,
});
app.use(limiter);

app.use(express.json({ limit: '18kb' }));

app.use(mongoSanitize());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use('/api/v1/jobs', jobRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

// Handle request for non-existent routes
app.all('*', (req, res, next) => {
  next(new AppError('This path does not exist on the server.', 404));
});

app.use(globalErrorHandler);

module.exports = app;
