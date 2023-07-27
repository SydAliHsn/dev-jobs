const Job = require('../models/jobModel');
const ApiFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { countDocuments } = require('../models/jobModel');

exports.getJobs = catchAsync(async (req, res, next) => {
  const queryObj = { ...req.query };

  const apiFeatures = new ApiFeatures(Job.find(), queryObj);

  let { query } = apiFeatures.filter().keyWordSearch().selectFields();

  // Getting the total document from the query before pagination so we get the total number of jobs for the given query without the pagination
  const total = await Job.countDocuments(query);

  // Pagination had to be done separately for the above reason
  query = apiFeatures.paginate().query;
  const jobs = await query;

  const results = jobs.length;

  res.status(200).json({ status: 'success', total, results, jobs });
});

exports.getJob = catchAsync(async (req, res, next) => {
  const job = await Job.findById(req.params.id);

  if (!job) return next(new AppError('No Job found with this ID!', 400));

  res.status(200).json({ status: 'success', job });
});
