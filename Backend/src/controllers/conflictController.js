const conflictService = require('../services/conflictService');
const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const ApiResponse = require('../utils/apiResponse');

// ── Helper ────────────────────────────────────────────────────────────────────
const paginated = (res, result, message = 'Fetched successfully') => {
  new ApiResponse(200, result.data, message, {
    count: result.count, total: result.total, pagination: result.pagination,
  }).send(res);
};

// ─────────────────────────────────────────────────────────────────────────────
// BASIC CRUD
// ─────────────────────────────────────────────────────────────────────────────

/** @route GET /api/v1/conflicts */
exports.getAllConflicts = asyncHandler(async (req, res) => {
  const result = await conflictService.getAllConflicts(req.query);
  paginated(res, result, 'Conflicts fetched successfully');
});

/** @route GET /api/v1/conflicts/:conflictId */
exports.getConflictById = asyncHandler(async (req, res, next) => {
  const conflict = await conflictService.getConflictById(req.params.conflictId);
  if (!conflict) return next(new ErrorResponse('Conflict not found', 404));
  new ApiResponse(200, conflict, 'Conflict fetched successfully').send(res);
});

/** @route POST /api/v1/conflicts */
exports.createConflict = asyncHandler(async (req, res) => {
  const conflict = await conflictService.createConflict(req.body);
  new ApiResponse(201, conflict, 'Conflict created successfully').send(res);
});

/** @route PUT /api/v1/conflicts/:conflictId */
exports.replaceConflict = asyncHandler(async (req, res, next) => {
  const conflict = await conflictService.replaceConflict(req.params.conflictId, req.body);
  if (!conflict) return next(new ErrorResponse('Conflict not found', 404));
  new ApiResponse(200, conflict, 'Conflict replaced successfully').send(res);
});

/** @route PATCH /api/v1/conflicts/:conflictId */
exports.updateConflict = asyncHandler(async (req, res, next) => {
  const conflict = await conflictService.updateConflict(req.params.conflictId, req.body);
  if (!conflict) return next(new ErrorResponse('Conflict not found', 404));
  new ApiResponse(200, conflict, 'Conflict updated successfully').send(res);
});

/** @route DELETE /api/v1/conflicts/:conflictId */
exports.deleteConflict = asyncHandler(async (req, res, next) => {
  const conflict = await conflictService.deleteConflict(req.params.conflictId);
  if (!conflict) return next(new ErrorResponse('Conflict not found', 404));
  new ApiResponse(200, {}, 'Conflict soft-deleted successfully').send(res);
});

// ─────────────────────────────────────────────────────────────────────────────
// ROUTE PARAMETER CONTROLLERS
// ─────────────────────────────────────────────────────────────────────────────

const makeParamHandler = (serviceFn, label) =>
  asyncHandler(async (req, res) => {
    const param = req.params[Object.keys(req.params)[0]];
    const data = await conflictService[serviceFn](param);
    new ApiResponse(200, data, `${label} fetched successfully`).send(res);
  });

exports.getByName             = makeParamHandler('getByName',             'Conflicts by name');
exports.getByType             = makeParamHandler('getByType',             'Conflicts by type');
exports.getByRegion           = makeParamHandler('getByRegion',           'Conflicts by region');
exports.getByStatus           = makeParamHandler('getByStatus',           'Conflicts by status');
exports.getByCountry          = makeParamHandler('getByCountry',          'Conflicts by country');
exports.getByStartYear        = makeParamHandler('getByStartYear',        'Conflicts by start year');
exports.getByEndYear          = makeParamHandler('getByEndYear',          'Conflicts by end year');
exports.getByYear             = makeParamHandler('getByYear',             'Conflicts by year');
exports.getByInflationRate    = makeParamHandler('getByInflationRate',    'Conflicts by inflation rate');
exports.getByGdpLoss          = makeParamHandler('getByGdpLoss',          'Conflicts by GDP loss');
exports.getByPovertyRate      = makeParamHandler('getByPovertyRate',      'Conflicts by poverty rate');
exports.getByExtremePoverty   = makeParamHandler('getByExtremePoverty',   'Conflicts by extreme poverty');
exports.getByFoodInsecurity   = makeParamHandler('getByFoodInsecurity',   'Conflicts by food insecurity');
exports.getByUnemployment     = makeParamHandler('getByUnemployment',     'Conflicts by unemployment');
exports.getByYouthUnemployment= makeParamHandler('getByYouthUnemployment','Conflicts by youth unemployment');
exports.getBySector           = makeParamHandler('getBySector',           'Conflicts by sector');
exports.getByBlackMarketLevel = makeParamHandler('getByBlackMarketLevel', 'Conflicts by black market level');
exports.getByBlackMarketGoods = makeParamHandler('getByBlackMarketGoods', 'Conflicts by black market goods');
exports.getByProfiteering     = makeParamHandler('getByProfiteering',     'Conflicts by profiteering status');
exports.getByCurrencyGap      = makeParamHandler('getByCurrencyGap',      'Conflicts by currency gap');
exports.getByReconstructionCost=makeParamHandler('getByReconstructionCost','Conflicts by reconstruction cost');
exports.getByCostOfWar        = makeParamHandler('getByCostOfWar',        'Conflicts by war cost');
exports.getByPreWarInformalEconomy  = makeParamHandler('getByPreWarInformalEconomy',  'Pre-war informal economy');
exports.getByDuringWarInformalEconomy=makeParamHandler('getByDuringWarInformalEconomy','Wartime informal economy');
exports.getByHouseholdsAffected     = makeParamHandler('getByHouseholdsAffected',     'Conflicts by households affected');

exports.getLatestByRegion = asyncHandler(async (req, res) => {
  const data = await conflictService.getLatestByRegion(req.params.region);
  new ApiResponse(200, data, 'Latest regional conflict fetched').send(res);
});

exports.getOldestByRegion = asyncHandler(async (req, res) => {
  const data = await conflictService.getOldestByRegion(req.params.region);
  new ApiResponse(200, data, 'Oldest regional conflict fetched').send(res);
});

exports.getCountryHistory = asyncHandler(async (req, res) => {
  const data = await conflictService.getCountryHistory(req.params.country);
  new ApiResponse(200, data, 'Country conflict history fetched').send(res);
});

exports.countByType = asyncHandler(async (req, res) => {
  const data = await conflictService.countByType(req.params.type);
  new ApiResponse(200, data, 'Conflict count by type').send(res);
});

exports.countByStatus = asyncHandler(async (req, res) => {
  const data = await conflictService.countByStatus(req.params.status);
  new ApiResponse(200, data, 'Conflict count by status').send(res);
});

exports.getSectorHighestGdpLoss = asyncHandler(async (req, res) => {
  const data = await conflictService.getSectorHighestGdpLoss(req.params.sector);
  new ApiResponse(200, data, 'Sector with highest GDP loss').send(res);
});

exports.getSectorHighestInflation = asyncHandler(async (req, res) => {
  const data = await conflictService.getSectorHighestInflation(req.params.sector);
  new ApiResponse(200, data, 'Sector with highest inflation').send(res);
});

// ─────────────────────────────────────────────────────────────────────────────
// WAR-SPECIFIC ROUTES
// ─────────────────────────────────────────────────────────────────────────────

exports.getWarSummary         = asyncHandler(async (req, res) => { new ApiResponse(200, await conflictService.getWarSummary(req.params.name),        'War summary').send(res); });
exports.getWarEconomicImpact  = asyncHandler(async (req, res) => { new ApiResponse(200, await conflictService.getWarEconomicImpact(req.params.name),  'Economic impact').send(res); });
exports.getWarPovertyImpact   = asyncHandler(async (req, res) => { new ApiResponse(200, await conflictService.getWarPovertyImpact(req.params.name),   'Poverty impact').send(res); });
exports.getWarBlackMarket     = asyncHandler(async (req, res) => { new ApiResponse(200, await conflictService.getWarBlackMarket(req.params.name),     'Black market data').send(res); });
exports.getWarReconstruction  = asyncHandler(async (req, res) => { new ApiResponse(200, await conflictService.getWarReconstruction(req.params.name),  'Reconstruction data').send(res); });
exports.getWarCurrencyCrisis  = asyncHandler(async (req, res) => { new ApiResponse(200, await conflictService.getWarCurrencyCrisis(req.params.name),  'Currency crisis data').send(res); });
exports.getWarUnemployment    = asyncHandler(async (req, res) => { new ApiResponse(200, await conflictService.getWarUnemployment(req.params.name),    'Unemployment impact').send(res); });

// ─────────────────────────────────────────────────────────────────────────────
// ADVANCED ROUTES
// ─────────────────────────────────────────────────────────────────────────────

exports.getOngoing = asyncHandler(async (req, res) => {
  const result = await conflictService.getOngoing(req.query);
  paginated(res, result, 'Ongoing conflicts fetched');
});

exports.getResolved = asyncHandler(async (req, res) => {
  const result = await conflictService.getResolved(req.query);
  paginated(res, result, 'Resolved conflicts fetched');
});

exports.getRecent   = asyncHandler(async (req, res) => { new ApiResponse(200, await conflictService.getRecent(req.query.limit),  'Recent conflicts').send(res); });
exports.getLatest   = asyncHandler(async (req, res) => { new ApiResponse(200, await conflictService.getLatest(req.query.limit), 'Latest conflicts').send(res); });
exports.getRandom   = asyncHandler(async (req, res) => { new ApiResponse(200, await conflictService.getRandom(req.query.count), 'Random conflicts').send(res); });
exports.getTrending = asyncHandler(async (req, res) => { new ApiResponse(200, await conflictService.getTrending(), 'Trending conflicts').send(res); });
exports.getHighRisk = asyncHandler(async (req, res) => { new ApiResponse(200, await conflictService.getHighRisk(), 'High risk conflicts').send(res); });
exports.getEconomicCollapse = asyncHandler(async (req, res) => { new ApiResponse(200, await conflictService.getEconomicCollapse(), 'Economic collapse conflicts').send(res); });
exports.getTopHighestInflation = asyncHandler(async (req, res) => { new ApiResponse(200, await conflictService.getTopHighestInflation(req.query.limit), 'Top inflation conflicts').send(res); });
exports.getTopHighestPoverty   = asyncHandler(async (req, res) => { new ApiResponse(200, await conflictService.getTopHighestPoverty(req.query.limit),   'Top poverty conflicts').send(res); });
exports.getAiSummary           = asyncHandler(async (req, res) => { new ApiResponse(200, await conflictService.getAiSummary(), 'AI conflict summary generated').send(res); });

exports.compareConflicts = asyncHandler(async (req, res, next) => {
  const { conflict1, conflict2 } = req.query;
  if (!conflict1 || !conflict2)
    return next(new ErrorResponse('Provide conflict1 and conflict2 query params', 400));
  const data = await conflictService.compareConflicts(conflict1, conflict2);
  new ApiResponse(200, data, 'Conflict comparison complete').send(res);
});

// ─────────────────────────────────────────────────────────────────────────────
// PARTIAL UPDATE PATCH ROUTES
// ─────────────────────────────────────────────────────────────────────────────

const makePatchHandler = (field, label) =>
  asyncHandler(async (req, res, next) => {
    const update = {};
    update[field] = req.body[field];
    if (update[field] === undefined)
      return next(new ErrorResponse(`Field "${field}" is required in body`, 400));
    const conflict = await conflictService.updateConflict(req.params.conflictId, update);
    if (!conflict) return next(new ErrorResponse('Conflict not found', 404));
    new ApiResponse(200, conflict, `${label} updated successfully`).send(res);
  });

exports.updateStatus       = makePatchHandler('status',               'Status');
exports.updateInflation    = makePatchHandler('inflationRate',         'Inflation rate');
exports.updateGdp          = makePatchHandler('gdpChange',            'GDP change');
exports.updatePoverty      = makePatchHandler('povertyRate',          'Poverty rate');
exports.updateUnemployment = makePatchHandler('duringWarUnemployment', 'Unemployment');
exports.updateSector       = makePatchHandler('primaryAffectedSector', 'Sector');

// ─────────────────────────────────────────────────────────────────────────────
// HEAD & OPTIONS
// ─────────────────────────────────────────────────────────────────────────────

exports.headConflicts = asyncHandler(async (req, res) => {
  const total = await require('../models/Conflict').countDocuments({});
  res.set('X-Total-Count', total).set('X-Resource', 'conflicts').status(200).end();
});

exports.headConflictById = asyncHandler(async (req, res, next) => {
  const exists = await require('../models/Conflict').exists({ _id: req.params.conflictId });
  if (!exists) return next(new ErrorResponse('Conflict not found', 404));
  res.set('X-Resource', 'conflict').status(200).end();
});

exports.optionsConflicts = (req, res) => {
  res.set('Allow', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS').status(204).end();
};

exports.optionsConflictById = (req, res) => {
  res.set('Allow', 'GET, PUT, PATCH, DELETE, HEAD, OPTIONS').status(204).end();
};
