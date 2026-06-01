const express = require('express');
const router = express.Router();
const s = require('../../controllers/statsController');
const Conflict = require('../../models/Conflict');

router.options('/', (req, res) => res.set('Allow', 'GET, HEAD, OPTIONS').status(204).end());
router.head('/total-conflicts', async (req, res) => {
  const count = await Conflict.countDocuments({});
  res.set('X-Total-Count', count).status(200).end();
});

router.get('/', s.getAllStats);
router.get('/total-conflicts',              s.getTotalConflicts);
router.get('/ongoing-conflicts',            s.getOngoingConflicts);
router.get('/resolved-conflicts',           s.getResolvedConflicts);
router.get('/highest-inflation',            s.getHighestInflation);
router.get('/lowest-gdp',                   s.getLowestGDP);
router.get('/highest-poverty',              s.getHighestPoverty);
router.get('/highest-food-insecurity',      s.getHighestFoodInsecurity);
router.get('/highest-currency-gap',         s.getHighestCurrencyGap);
router.get('/highest-war-cost',             s.getHighestWarCost);
router.get('/highest-reconstruction-cost',  s.getHighestReconstructionCost);

module.exports = router;
