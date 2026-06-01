const Conflict = require('../models/Conflict');
const QueryBuilder = require('../utils/queryBuilder');
const ErrorResponse = require('../utils/errorResponse');

class ConflictService {
  // ─────────────────────────────────────────────────────────────────────────
  // BASIC CRUD
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Get all conflicts with dynamic filtering, sorting, pagination & search
   */
  async getAllConflicts(reqQuery = {}) {
    const { keyword, status, region, country, type, year, startYear, endYear,
      inflationAbove, inflationBelow, gdpLossAbove, povertyAbove,
      foodInsecurityAbove, currencyGapAbove, warCostAbove, reconstructionAbove,
      blackMarket, profiteering, sector, minInflation, maxInflation,
      minGDP, maxGDP, minPoverty, maxPoverty, minUnemployment, maxUnemployment,
      ...rest } = reqQuery;

    // Build base filter
    const filter = {};

    if (status)          filter.status = status;
    if (region)          filter.region = new RegExp(region, 'i');
    if (country)         filter.country = new RegExp(country, 'i');
    if (type)            filter.type = new RegExp(type, 'i');
    if (sector)          filter.primaryAffectedSector = new RegExp(sector, 'i');
    if (blackMarket)     filter.blackMarketLevel = blackMarket;
    if (profiteering)    filter.warProfiteering = profiteering;
    if (year)            filter.$expr = { $or: [{ $eq: ['$startYear', +year] }, { $eq: ['$endYear', +year] }] };
    if (startYear)       filter.startYear = +startYear;
    if (endYear)         filter.endYear = +endYear;

    // Numeric range filters
    if (inflationAbove)           filter.inflationRate        = { ...filter.inflationRate, $gte: +inflationAbove };
    if (inflationBelow)           filter.inflationRate        = { ...filter.inflationRate, $lte: +inflationBelow };
    if (gdpLossAbove)             filter.gdpChange            = { ...filter.gdpChange, $lte: -(+gdpLossAbove) };
    if (povertyAbove)             filter.povertyRate          = { ...filter.povertyRate, $gte: +povertyAbove };
    if (foodInsecurityAbove)      filter.foodInsecurityRate   = { ...filter.foodInsecurityRate, $gte: +foodInsecurityAbove };
    if (currencyGapAbove)         filter.currencyBlackMarketGap = { ...filter.currencyBlackMarketGap, $gte: +currencyGapAbove };
    if (warCostAbove)             filter.costOfWar            = { ...filter.costOfWar, $gte: +warCostAbove };
    if (reconstructionAbove)      filter.reconstructionCost   = { ...filter.reconstructionCost, $gte: +reconstructionAbove };

    // Range filters
    if (minInflation)    filter.inflationRate      = { ...filter.inflationRate, $gte: +minInflation };
    if (maxInflation)    filter.inflationRate      = { ...filter.inflationRate, $lte: +maxInflation };
    if (minGDP)          filter.gdpChange          = { ...filter.gdpChange, $gte: +minGDP };
    if (maxGDP)          filter.gdpChange          = { ...filter.gdpChange, $lte: +maxGDP };
    if (minPoverty)      filter.povertyRate        = { ...filter.povertyRate, $gte: +minPoverty };
    if (maxPoverty)      filter.povertyRate        = { ...filter.povertyRate, $lte: +maxPoverty };
    if (minUnemployment) filter.duringWarUnemployment = { ...filter.duringWarUnemployment, $gte: +minUnemployment };
    if (maxUnemployment) filter.duringWarUnemployment = { ...filter.duringWarUnemployment, $lte: +maxUnemployment };

    // Keyword search via text index
    let baseQuery;
    if (keyword) {
      baseQuery = Conflict.find({ ...filter, $text: { $search: keyword } });
    } else {
      baseQuery = Conflict.find(filter);
    }

    // Sort mapping: query param keys → schema field names
    let sortParam = reqQuery.sort;
    if (sortParam) {
      const sortMap = {
        'Inflation_Rate_%':                     'inflationRate',
        '-Inflation_Rate_%':                    '-inflationRate',
        'GDP_Change_%':                         'gdpChange',
        '-GDP_Change_%':                        '-gdpChange',
        'Pre_War_Unemployment_%':               'preWarUnemployment',
        '-During_War_Unemployment_%':           '-duringWarUnemployment',
        'Food_Insecurity_Rate_%':               'foodInsecurityRate',
        '-Extreme_Poverty_Rate_%':              '-extremePovertyRate',
        'Currency_Devaluation_%':               'currencyDevaluation',
        '-Currency_Black_Market_Rate_Gap_%':    '-currencyBlackMarketGap',
        'Estimated_Reconstruction_Cost_USD':    'reconstructionCost',
        '-Estimated_Reconstruction_Cost_USD':   '-reconstructionCost',
        'Cost_of_War_USD':                      'costOfWar',
        '-Cost_of_War_USD':                     '-costOfWar',
        'Start_Year':                           'startYear',
        '-End_Year':                            '-endYear',
        'Conflict_Name':                        'conflictName',
      };
      sortParam = sortMap[sortParam] || sortParam;
    }

    const page = parseInt(reqQuery.page, 10) || 1;
    const limit = parseInt(reqQuery.limit, 10) || 25;
    const skip = (page - 1) * limit;

    // Apply sort
    const sortBy = sortParam ? sortParam.split(',').join(' ') : '-createdAt';
    const results = await baseQuery.sort(sortBy).skip(skip).limit(limit).lean();
    const total = await Conflict.countDocuments(filter);

    const pagination = {};
    if (page * limit < total) pagination.next = { page: page + 1, limit };
    if (skip > 0) pagination.prev = { page: page - 1, limit };

    return { count: results.length, total, pagination, data: results };
  }

  /** Get single conflict by MongoDB ObjectId */
  async getConflictById(id) {
    return await Conflict.findById(id).lean();
  }

  /** Create a new conflict */
  async createConflict(data) {
    return await Conflict.create(data);
  }

  /** Full replacement (PUT) */
  async replaceConflict(id, data) {
    const conflict = await Conflict.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
      overwrite: true,
    });
    return conflict;
  }

  /** Partial update (PATCH) */
  async updateConflict(id, data) {
    return await Conflict.findByIdAndUpdate(id, { $set: data }, {
      new: true,
      runValidators: true,
    });
  }

  /** Soft delete */
  async deleteConflict(id) {
    const conflict = await Conflict.findByIdAndUpdate(
      id,
      { isDeleted: true, deletedAt: new Date() },
      { new: true }
    );
    return conflict;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // ROUTE PARAMETER QUERIES
  // ─────────────────────────────────────────────────────────────────────────

  async getByName(name) {
    return await Conflict.find({ conflictName: new RegExp(name, 'i') }).lean();
  }

  async getByType(type) {
    return await Conflict.find({ type: new RegExp(type, 'i') }).lean();
  }

  async getByRegion(region) {
    return await Conflict.find({ region: new RegExp(region, 'i') }).lean();
  }

  async getByStatus(status) {
    return await Conflict.find({ status }).lean();
  }

  async getByCountry(country) {
    return await Conflict.find({ country: new RegExp(country, 'i') }).lean();
  }

  async getByStartYear(year) {
    return await Conflict.find({ startYear: +year }).lean();
  }

  async getByEndYear(year) {
    return await Conflict.find({ endYear: +year }).lean();
  }

  async getByYear(year) {
    return await Conflict.find({
      startYear: { $lte: +year },
      $or: [{ endYear: null }, { endYear: { $gte: +year } }],
    }).lean();
  }

  async getByInflationRate(rate) {
    return await Conflict.find({ inflationRate: { $gte: +rate } }).lean();
  }

  async getByGdpLoss(percentage) {
    return await Conflict.find({ gdpChange: { $lte: -(+percentage) } }).lean();
  }

  async getByPovertyRate(rate) {
    return await Conflict.find({ povertyRate: { $gte: +rate } }).lean();
  }

  async getByExtremePoverty(rate) {
    return await Conflict.find({ extremePovertyRate: { $gte: +rate } }).lean();
  }

  async getByFoodInsecurity(rate) {
    return await Conflict.find({ foodInsecurityRate: { $gte: +rate } }).lean();
  }

  async getByUnemployment(rate) {
    return await Conflict.find({ duringWarUnemployment: { $gte: +rate } }).lean();
  }

  async getByYouthUnemployment(rate) {
    return await Conflict.find({ youthUnemployment: { $gte: +rate } }).lean();
  }

  async getBySector(sector) {
    return await Conflict.find({ primaryAffectedSector: new RegExp(sector, 'i') }).lean();
  }

  async getByBlackMarketLevel(level) {
    return await Conflict.find({ blackMarketLevel: level }).lean();
  }

  async getByBlackMarketGoods(goods) {
    return await Conflict.find({ blackMarketGoods: new RegExp(goods, 'i') }).lean();
  }

  async getByProfiteering(status) {
    return await Conflict.find({ warProfiteering: status }).lean();
  }

  async getByCurrencyGap(gap) {
    return await Conflict.find({ currencyBlackMarketGap: { $gte: +gap } }).lean();
  }

  async getByReconstructionCost(amount) {
    return await Conflict.find({ reconstructionCost: { $gte: +amount } }).lean();
  }

  async getByCostOfWar(amount) {
    return await Conflict.find({ costOfWar: { $gte: +amount } }).lean();
  }

  async getByPreWarInformalEconomy(value) {
    return await Conflict.find({ preWarInformalEconomy: { $gte: +value } }).lean();
  }

  async getByDuringWarInformalEconomy(value) {
    return await Conflict.find({ duringWarInformalEconomy: { $gte: +value } }).lean();
  }

  async getByHouseholdsAffected(count) {
    return await Conflict.find({ householdsAffected: { $gte: +count } }).lean();
  }

  async getLatestByRegion(region) {
    return await Conflict.findOne({ region: new RegExp(region, 'i') })
      .sort({ startYear: -1 }).lean();
  }

  async getOldestByRegion(region) {
    return await Conflict.findOne({ region: new RegExp(region, 'i') })
      .sort({ startYear: 1 }).lean();
  }

  async getCountryHistory(country) {
    return await Conflict.find({ country: new RegExp(country, 'i') })
      .sort({ startYear: 1 }).lean();
  }

  async countByType(type) {
    const count = await Conflict.countDocuments({ type: new RegExp(type, 'i') });
    return { type, count };
  }

  async countByStatus(status) {
    const count = await Conflict.countDocuments({ status });
    return { status, count };
  }

  async getSectorHighestGdpLoss(sector) {
    return await Conflict.find({ primaryAffectedSector: new RegExp(sector, 'i') })
      .sort({ gdpChange: 1 }).limit(1).lean();
  }

  async getSectorHighestInflation(sector) {
    return await Conflict.find({ primaryAffectedSector: new RegExp(sector, 'i') })
      .sort({ inflationRate: -1 }).limit(1).lean();
  }

  // ─────────────────────────────────────────────────────────────────────────
  // WAR-SPECIFIC SUMMARY ROUTES
  // ─────────────────────────────────────────────────────────────────────────

  async getWarByName(name) {
    const conflict = await Conflict.findOne({ conflictName: new RegExp(name, 'i') }).lean();
    if (!conflict) throw new ErrorResponse(`No conflict found with name: ${name}`, 404);
    return conflict;
  }

  async getWarSummary(name) {
    const c = await this.getWarByName(name);
    return {
      conflictName: c.conflictName, type: c.type, region: c.region,
      country: c.country, startYear: c.startYear, endYear: c.endYear,
      status: c.status, duration: c.endYear ? c.endYear - c.startYear : 'Ongoing',
    };
  }

  async getWarEconomicImpact(name) {
    const c = await this.getWarByName(name);
    return {
      conflictName: c.conflictName, inflationRate: c.inflationRate,
      gdpChange: c.gdpChange, costOfWar: c.costOfWar,
      reconstructionCost: c.reconstructionCost,
      currencyDevaluation: c.currencyDevaluation,
    };
  }

  async getWarPovertyImpact(name) {
    const c = await this.getWarByName(name);
    return {
      conflictName: c.conflictName, povertyRate: c.povertyRate,
      extremePovertyRate: c.extremePovertyRate,
      foodInsecurityRate: c.foodInsecurityRate,
      householdsAffected: c.householdsAffected,
    };
  }

  async getWarBlackMarket(name) {
    const c = await this.getWarByName(name);
    return {
      conflictName: c.conflictName, blackMarketLevel: c.blackMarketLevel,
      blackMarketGoods: c.blackMarketGoods, warProfiteering: c.warProfiteering,
      currencyBlackMarketGap: c.currencyBlackMarketGap,
    };
  }

  async getWarReconstruction(name) {
    const c = await this.getWarByName(name);
    return {
      conflictName: c.conflictName,
      reconstructionCost: c.reconstructionCost, costOfWar: c.costOfWar,
      primaryAffectedSector: c.primaryAffectedSector,
    };
  }

  async getWarCurrencyCrisis(name) {
    const c = await this.getWarByName(name);
    return {
      conflictName: c.conflictName,
      currencyDevaluation: c.currencyDevaluation,
      currencyBlackMarketGap: c.currencyBlackMarketGap,
    };
  }

  async getWarUnemployment(name) {
    const c = await this.getWarByName(name);
    return {
      conflictName: c.conflictName,
      preWarUnemployment: c.preWarUnemployment,
      duringWarUnemployment: c.duringWarUnemployment,
      youthUnemployment: c.youthUnemployment,
    };
  }

  // ─────────────────────────────────────────────────────────────────────────
  // ADVANCED ROUTES
  // ─────────────────────────────────────────────────────────────────────────

  async getOngoing(query = {}) {
    return this.getAllConflicts({ ...query, status: 'Ongoing' });
  }

  async getResolved(query = {}) {
    return this.getAllConflicts({ ...query, status: 'Resolved' });
  }

  async getRecent(limit = 10) {
    return await Conflict.find().sort({ startYear: -1 }).limit(+limit).lean();
  }

  async getLatest(limit = 5) {
    return await Conflict.find().sort({ createdAt: -1 }).limit(+limit).lean();
  }

  async getRandom(count = 5) {
    return await Conflict.aggregate([
      { $match: { isDeleted: { $ne: true } } },
      { $sample: { size: +count } },
    ]);
  }

  async getTrending() {
    // Trending = highest ongoing conflicts sorted by cost of war
    return await Conflict.find({ status: 'Ongoing' })
      .sort({ costOfWar: -1 }).limit(10).lean();
  }

  async getHighRisk() {
    return await Conflict.find({
      status: 'Ongoing',
      $or: [
        { inflationRate: { $gte: 50 } },
        { povertyRate: { $gte: 60 } },
        { gdpChange: { $lte: -30 } },
      ],
    }).lean();
  }

  async getEconomicCollapse() {
    return await Conflict.find({
      $or: [
        { gdpChange: { $lte: -50 } },
        { inflationRate: { $gte: 80 } },
        { povertyRate: { $gte: 80 } },
      ],
    }).sort({ gdpChange: 1 }).lean();
  }

  async getTopHighestInflation(limit = 10) {
    return await Conflict.find({ inflationRate: { $ne: null } })
      .sort({ inflationRate: -1 }).limit(+limit).lean();
  }

  async getTopHighestPoverty(limit = 10) {
    return await Conflict.find({ povertyRate: { $ne: null } })
      .sort({ povertyRate: -1 }).limit(+limit).lean();
  }

  async compareConflicts(name1, name2) {
    const [c1, c2] = await Promise.all([
      Conflict.findOne({ conflictName: new RegExp(name1, 'i') }).lean(),
      Conflict.findOne({ conflictName: new RegExp(name2, 'i') }).lean(),
    ]);
    if (!c1) throw new ErrorResponse(`Conflict "${name1}" not found`, 404);
    if (!c2) throw new ErrorResponse(`Conflict "${name2}" not found`, 404);

    return {
      comparison: {
        conflictName:        [c1.conflictName, c2.conflictName],
        region:              [c1.region, c2.region],
        country:             [c1.country, c2.country],
        status:              [c1.status, c2.status],
        inflationRate:       [c1.inflationRate, c2.inflationRate],
        gdpChange:           [c1.gdpChange, c2.gdpChange],
        povertyRate:         [c1.povertyRate, c2.povertyRate],
        costOfWar:           [c1.costOfWar, c2.costOfWar],
        reconstructionCost:  [c1.reconstructionCost, c2.reconstructionCost],
        householdsAffected:  [c1.householdsAffected, c2.householdsAffected],
      },
      winner: {
        highestInflation:      c1.inflationRate > c2.inflationRate ? c1.conflictName : c2.conflictName,
        worstGdpChange:        c1.gdpChange < c2.gdpChange ? c1.conflictName : c2.conflictName,
        highestCostOfWar:      c1.costOfWar > c2.costOfWar ? c1.conflictName : c2.conflictName,
        highestPoverty:        c1.povertyRate > c2.povertyRate ? c1.conflictName : c2.conflictName,
      },
    };
  }

  async getAiSummary() {
    const [total, ongoing, resolved, topInflation, worstGDP, mostExpensive] =
      await Promise.all([
        Conflict.countDocuments({}),
        Conflict.countDocuments({ status: 'Ongoing' }),
        Conflict.countDocuments({ status: 'Resolved' }),
        Conflict.findOne({ inflationRate: { $ne: null } }).sort({ inflationRate: -1 }).lean(),
        Conflict.findOne({ gdpChange: { $ne: null } }).sort({ gdpChange: 1 }).lean(),
        Conflict.findOne({ costOfWar: { $ne: null } }).sort({ costOfWar: -1 }).lean(),
      ]);

    return {
      summary: `The database tracks ${total} conflicts globally. ${ongoing} are currently ongoing while ${resolved} have been resolved.`,
      keyInsights: [
        `The conflict with the highest inflation is "${topInflation?.conflictName}" (${topInflation?.region}) with a rate of ${topInflation?.inflationRate}%.`,
        `The worst GDP contraction occurred in "${worstGDP?.conflictName}" with a ${worstGDP?.gdpChange}% change.`,
        `The most expensive conflict by war cost is "${mostExpensive?.conflictName}" costing $${Number(mostExpensive?.costOfWar).toLocaleString()}.`,
      ],
      stats: { total, ongoing, resolved },
    };
  }

  // ─────────────────────────────────────────────────────────────────────────
  // SEARCH
  // ─────────────────────────────────────────────────────────────────────────

  async search(keyword) {
    if (!keyword) return [];
    return await Conflict.find({ $text: { $search: keyword } }).lean();
  }

  async searchByField(field, value) {
    const filter = {};
    filter[field] = typeof value === 'string' ? new RegExp(value, 'i') : +value;
    return await Conflict.find(filter).lean();
  }

  async searchEconomic({ inflation, poverty, gdp, currency }) {
    const filter = {};
    if (inflation) filter.inflationRate = { $gte: +inflation };
    if (poverty)   filter.povertyRate   = { $gte: +poverty };
    if (gdp)       filter.gdpChange     = { $lte: +gdp };
    if (currency)  filter.currencyDevaluation = { $gte: +currency };
    return await Conflict.find(filter).lean();
  }

  async searchSector(name) {
    return await Conflict.find({ primaryAffectedSector: new RegExp(name, 'i') }).lean();
  }

  async searchBlackMarket(goods) {
    return await Conflict.find({ blackMarketGoods: new RegExp(goods, 'i') }).lean();
  }

  // ─────────────────────────────────────────────────────────────────────────
  // STATISTICS
  // ─────────────────────────────────────────────────────────────────────────

  async getStats() {
    const [
      totalConflicts, ongoingConflicts, resolvedConflicts,
      highestInflation, lowestGDP, highestPoverty,
      highestFoodInsecurity, highestCurrencyGap,
      highestWarCost, highestReconstructionCost,
    ] = await Promise.all([
      Conflict.countDocuments({}),
      Conflict.countDocuments({ status: 'Ongoing' }),
      Conflict.countDocuments({ status: 'Resolved' }),
      Conflict.findOne({ inflationRate: { $ne: null } }).sort({ inflationRate: -1 }).lean(),
      Conflict.findOne({ gdpChange: { $ne: null } }).sort({ gdpChange: 1 }).lean(),
      Conflict.findOne({ povertyRate: { $ne: null } }).sort({ povertyRate: -1 }).lean(),
      Conflict.findOne({ foodInsecurityRate: { $ne: null } }).sort({ foodInsecurityRate: -1 }).lean(),
      Conflict.findOne({ currencyBlackMarketGap: { $ne: null } }).sort({ currencyBlackMarketGap: -1 }).lean(),
      Conflict.findOne({ costOfWar: { $ne: null } }).sort({ costOfWar: -1 }).lean(),
      Conflict.findOne({ reconstructionCost: { $ne: null } }).sort({ reconstructionCost: -1 }).lean(),
    ]);

    return {
      totalConflicts, ongoingConflicts, resolvedConflicts,
      highestInflation, lowestGDP, highestPoverty,
      highestFoodInsecurity, highestCurrencyGap,
      highestWarCost, highestReconstructionCost,
    };
  }
}

module.exports = new ConflictService();
