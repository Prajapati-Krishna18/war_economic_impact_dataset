const express = require('express');
const router = express.Router();
const c = require('../../controllers/conflictController');
const { protect, authorize } = require('../../middlewares/authMiddleware');
const { authLimiter } = require('../../middlewares/rateLimiter');

// ── OPTIONS (must come first for each path pattern) ────────────────────────
router.options('/',    c.optionsConflicts);
router.options('/:conflictId', c.optionsConflictById);

// ── HEAD ───────────────────────────────────────────────────────────────────
router.head('/', c.headConflicts);
router.head('/:conflictId', c.headConflictById);

// ─────────────────────────────────────────────────────────────────────────────
// ADVANCED ROUTES — must be defined BEFORE /:conflictId param route
// ─────────────────────────────────────────────────────────────────────────────
router.get('/top/highest-inflation',  c.getTopHighestInflation);
router.get('/top/highest-poverty',    c.getTopHighestPoverty);
router.get('/ongoing',                c.getOngoing);
router.get('/resolved',               c.getResolved);
router.get('/recent',                 c.getRecent);
router.get('/latest',                 c.getLatest);
router.get('/random',                 c.getRandom);
router.get('/trending',               c.getTrending);
router.get('/high-risk',              c.getHighRisk);
router.get('/economic-collapse',      c.getEconomicCollapse);

// ─────────────────────────────────────────────────────────────────────────────
// ROUTE PARAMETER ROUTES — specific before generic
// ─────────────────────────────────────────────────────────────────────────────
router.get('/name/:name',                           c.getByName);
router.get('/type/:type/count',                     c.countByType);
router.get('/type/:type',                           c.getByType);
router.get('/region/:region/latest',                c.getLatestByRegion);
router.get('/region/:region/oldest',                c.getOldestByRegion);
router.get('/region/:region',                       c.getByRegion);
router.get('/status/:status/count',                 c.countByStatus);
router.get('/status/:status',                       c.getByStatus);
router.get('/country/:country/history',             c.getCountryHistory);
router.get('/country/:country',                     c.getByCountry);
router.get('/start-year/:year',                     c.getByStartYear);
router.get('/end-year/:year',                       c.getByEndYear);
router.get('/year/:year',                           c.getByYear);
router.get('/inflation/:rate',                      c.getByInflationRate);
router.get('/gdp-loss/:percentage',                 c.getByGdpLoss);
router.get('/poverty/:rate',                        c.getByPovertyRate);
router.get('/extreme-poverty/:rate',                c.getByExtremePoverty);
router.get('/food-insecurity/:rate',                c.getByFoodInsecurity);
router.get('/unemployment/:rate',                   c.getByUnemployment);
router.get('/youth-unemployment/:rate',             c.getByYouthUnemployment);
router.get('/sector/:sector/highest-gdp-loss',      c.getSectorHighestGdpLoss);
router.get('/sector/:sector/highest-inflation',     c.getSectorHighestInflation);
router.get('/sector/:sector',                       c.getBySector);
router.get('/black-market/:level',                  c.getByBlackMarketLevel);
router.get('/black-market-goods/:goods',            c.getByBlackMarketGoods);
router.get('/profiteering/:status',                 c.getByProfiteering);
router.get('/currency-gap/:gap',                    c.getByCurrencyGap);
router.get('/reconstruction-cost/:amount',          c.getByReconstructionCost);
router.get('/cost-of-war/:amount',                  c.getByCostOfWar);
router.get('/informal-economy/pre/:value',          c.getByPreWarInformalEconomy);
router.get('/informal-economy/during/:value',       c.getByDuringWarInformalEconomy);
router.get('/households/:count',                    c.getByHouseholdsAffected);

// ─────────────────────────────────────────────────────────────────────────────
// WAR-SPECIFIC DETAIL ROUTES
// ─────────────────────────────────────────────────────────────────────────────
router.get('/war/:name/summary',          c.getWarSummary);
router.get('/war/:name/economic-impact',  c.getWarEconomicImpact);
router.get('/war/:name/poverty-impact',   c.getWarPovertyImpact);
router.get('/war/:name/black-market',     c.getWarBlackMarket);
router.get('/war/:name/reconstruction',   c.getWarReconstruction);
router.get('/war/:name/currency-crisis',  c.getWarCurrencyCrisis);
router.get('/war/:name/unemployment',     c.getWarUnemployment);

// ─────────────────────────────────────────────────────────────────────────────
// AI SUMMARY
// ─────────────────────────────────────────────────────────────────────────────
router.get('/summary/ai', c.getAiSummary);

// ─────────────────────────────────────────────────────────────────────────────
// BASIC CRUD — / and /:conflictId
// ─────────────────────────────────────────────────────────────────────────────
router.route('/')
  .get(c.getAllConflicts)
  .post(protect, authorize('admin', 'researcher'), c.createConflict);

router.route('/:conflictId')
  .get(c.getConflictById)
  .put(protect, authorize('admin', 'researcher'), c.replaceConflict)
  .patch(protect, authorize('admin', 'researcher'), c.updateConflict)
  .delete(protect, authorize('admin'), c.deleteConflict);

// ─────────────────────────────────────────────────────────────────────────────
// PARTIAL PATCH ROUTES
// ─────────────────────────────────────────────────────────────────────────────
router.patch('/:conflictId/status',       protect, authorize('admin', 'researcher'), c.updateStatus);
router.patch('/:conflictId/inflation',    protect, authorize('admin', 'researcher'), c.updateInflation);
router.patch('/:conflictId/gdp',          protect, authorize('admin', 'researcher'), c.updateGdp);
router.patch('/:conflictId/poverty',      protect, authorize('admin', 'researcher'), c.updatePoverty);
router.patch('/:conflictId/unemployment', protect, authorize('admin', 'researcher'), c.updateUnemployment);
router.patch('/:conflictId/sector',       protect, authorize('admin', 'researcher'), c.updateSector);

module.exports = router;
