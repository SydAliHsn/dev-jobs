const express = require('express');

const jobsController = require('../controllers/jobController');

const router = express.Router();

router.route('/').get(jobsController.getJobs);

router.route('/:id').get(jobsController.getJob);

module.exports = router;
