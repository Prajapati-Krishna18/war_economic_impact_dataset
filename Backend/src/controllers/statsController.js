const conflictService = require('../services/conflictService');
const asyncHandler = require('../middlewares/asyncHandler');
const ApiResponse = require('../utils/apiResponse');

const stat = (label) =>
  asyncHandler(async (req, res) => {
    const stats = await conflictService.getStats();
    new ApiResponse(200, stats[label], label.replace(/([A-Z])/g, ' $1').trim()).send(res);
  });

exports.getTotalConflicts         = stat('totalConflicts');
exports.getOngoingConflicts       = stat('ongoingConflicts');
exports.getResolvedConflicts      = stat('resolvedConflicts');
exports.getHighestInflation       = stat('highestInflation');
exports.getLowestGDP              = stat('lowestGDP');
exports.getHighestPoverty         = stat('highestPoverty');
exports.getHighestFoodInsecurity  = stat('highestFoodInsecurity');
exports.getHighestCurrencyGap     = stat('highestCurrencyGap');
exports.getHighestWarCost         = stat('highestWarCost');
exports.getHighestReconstructionCost = stat('highestReconstructionCost');

exports.getAllStats = asyncHandler(async (req, res) => {
  const stats = await conflictService.getStats();
  new ApiResponse(200, stats, 'All statistics fetched successfully').send(res);
});
