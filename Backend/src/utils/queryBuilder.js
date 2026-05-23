class QueryBuilder {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'select', 'search'];
    excludedFields.forEach(el => delete queryObj[el]);

    // Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt|in)\b/g, match => `$${match}`);

    let parsedQuery = JSON.parse(queryStr);

    // Text-based search
    if (this.queryString.search) {
      parsedQuery.$text = { $search: this.queryString.search };
    }

    this.query = this.query.find(parsedQuery);
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.select) {
      const fields = this.queryString.select.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  async paginate(model) {
    const page = parseInt(this.queryString.page, 10) || 1;
    const limit = parseInt(this.queryString.limit, 10) || 25;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    // To get total documents, we need to apply the same filter to countDocuments
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'select', 'search'];
    excludedFields.forEach(el => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt|in)\b/g, match => `$${match}`);
    let parsedQuery = JSON.parse(queryStr);

    if (this.queryString.search) {
      parsedQuery.$text = { $search: this.queryString.search };
    }

    const total = await model.countDocuments(parsedQuery);

    const pagination = {};
    const endIndex = page * limit;

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }

    if (skip > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    this.pagination = pagination;
    this.total = total;
    
    return this;
  }
}

module.exports = QueryBuilder;
