const express = require('express');
const router = express.Router();
const sc = require('../../controllers/searchController');

router.options('/', (req, res) => res.set('Allow', 'GET, OPTIONS').status(204).end());

// GET /api/v1/search?keyword=...
router.get('/', sc.globalSearch);

// GET /api/v1/search/conflicts?country=&region=&type=&status=
router.get('/conflicts', sc.searchConflicts);

// GET /api/v1/search/economic?inflation=&poverty=&gdp=&currency=
router.get('/economic', sc.searchEconomic);

// GET /api/v1/search/sector?name=
router.get('/sector', sc.searchSector);

// GET /api/v1/search/black-market?goods=
router.get('/black-market', sc.searchBlackMarket);

module.exports = router;
