const conflictService = require('../services/conflictService');
const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const ApiResponse = require('../utils/apiResponse');

/** @route GET /api/v1/search?keyword=... */
exports.globalSearch = asyncHandler(async (req, res, next) => {
  const { keyword } = req.query;
  if (!keyword) return next(new ErrorResponse('Please provide a keyword', 400));
  const data = await conflictService.search(keyword);
  new ApiResponse(200, data, `Search results for "${keyword}"`).send(res);
});

/** @route GET /api/v1/search/conflicts?country=&region=&type=&status= */
exports.searchConflicts = asyncHandler(async (req, res) => {
  const { country, region, type, status } = req.query;
  const filter = {};
  if (country) filter.country = new RegExp(country, 'i');
  if (region)  filter.region  = new RegExp(region, 'i');
  if (type)    filter.type    = new RegExp(type, 'i');
  if (status)  filter.status  = status;

  const data = await require('../models/Conflict').find(filter).lean();
  new ApiResponse(200, data, 'Filtered conflicts fetched').send(res);
});

/** @route GET /api/v1/search/economic?inflation=&poverty=&gdp=&currency= */
exports.searchEconomic = asyncHandler(async (req, res) => {
  const data = await conflictService.searchEconomic(req.query);
  new ApiResponse(200, data, 'Economic search results').send(res);
});

/** @route GET /api/v1/search/sector?name= */
exports.searchSector = asyncHandler(async (req, res, next) => {
  const { name } = req.query;
  if (!name) return next(new ErrorResponse('Please provide a sector name', 400));
  const data = await conflictService.searchSector(name);
  new ApiResponse(200, data, `Sector "${name}" results`).send(res);
});

/** @route GET /api/v1/search/black-market?goods= */
exports.searchBlackMarket = asyncHandler(async (req, res, next) => {
  const { goods } = req.query;
  if (!goods) return next(new ErrorResponse('Please provide goods type', 400));
  const data = await conflictService.searchBlackMarket(goods);
  new ApiResponse(200, data, `Black market results for "${goods}"`).send(res);
});
