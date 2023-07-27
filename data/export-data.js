const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Job = require('../models/jobModel');

dotenv.config({ path: `${__dirname}/../config.env` });

const jobsObj = JSON.parse(
  fs.readFileSync(`${__dirname}/jobs-data.json`, 'utf-8')
);

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log('Conection with database made successfully.'));

const exportData = async () => {
  try {
    await Job.insertMany(jobsObj);

    console.log('Data exported to the database successfully');

    process.exit();
  } catch (err) {
    console.log(err);

    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Job.deleteMany({});

    console.log('Data deleted successfully');

    process.exit();
  } catch (err) {
    console.log(err);

    process.exit(1);
  }
};

if (!process.argv[2])
  console.log(
    'Please specify an argument to run the script. --export or --delete'
  );

if (process.argv[2] === '--export') exportData();
if (process.argv[2] === '--delete') deleteData();
