const mongoose = require('mongoose');
const slugify = require('slugify');

const NestedSchema = new mongoose.Schema({
  content: String,
  items: [String],
});

const jobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Please provide the company name'],
  },

  logo: String,

  logoBackground: String,

  position: {
    type: String,
    required: [true, 'Please provide the job position'],
  },

  slug: String,

  postedAt: String,

  description: String,

  contract: {
    type: String,
    enum: {
      values: ['Part Time', 'Full Time', 'Freelance'],
      message: 'Contract can only be Part Time, Full Time or Freelance',
    },
  },

  location: String,

  apply: String,

  website: String,

  requirements: NestedSchema,

  role: NestedSchema,
});

///////////// Creating indexes for full text search ////////////////
// Note: this code should be executed in the mongoDB Shell
jobSchema.index({
  company: 'text',
  position: 'text',
  description: 'text',
  'requirements.items': 'text',
  'requirements.content': 'text',
  'role.items': 'text',
  'role.content': 'text',
});

jobSchema.pre('save', function (next) {
  this.slug = slugify(this.position, { lower: true });

  next();
});

jobSchema.pre('insertMany', function (next, docs) {
  docs.forEach(el => (el.slug = slugify(el.position, { lower: true })));

  next();
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
