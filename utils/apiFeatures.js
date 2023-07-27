module.exports = class {
  constructor(query, queryObj) {
    this.query = query;
    this.queryObj = queryObj;
  }

  filter = function () {
    const excludedFields = ['limit', 'page', 'sort', 'fields', 'q'];
    const queryObj = { ...this.queryObj };

    excludedFields.forEach(el => delete queryObj[el]);

    const queryStr = JSON.stringify(queryObj);

    const formattedQueryObj = JSON.parse(
      queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
    );

    this.query.find(formattedQueryObj);

    return this;
  };

  keyWordSearch = function () {
    if (this.queryObj.q) {
      this.query.find({ $text: { $search: this.queryObj.q } });
    }

    return this;
  };

  paginate = function () {
    if (this.queryObj.page) {
      const page = this.queryObj.page || 1;
      const limit = this.queryObj.limit || 100;
      const skip = (page - 1) * limit;

      this.query.skip(skip).limit(limit);
    } else {
      this.query.limit(100);
    }

    return this;
  };

  selectFields = function () {
    if (this.queryObj.fields) {
      const fields = this.queryObj.fields.split(',').join(' ');

      this.query.select(fields);
    } else {
      this.query.select('-__v');
    }
    return this;
  };
};
