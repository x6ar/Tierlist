// Loads and merges all config pieces into a single TierlistConfig object.
// Works in Node.js (CommonJS). For ESM/bundlers, import the JSON files directly instead.

const gamemodes = require("./config/gamemodes.json").gamemodes;
const tiers = require("./config/tiers.json").tiers;
const pointsSystem = require("./config/points-system.json").pointsSystem;
const uiConfig = require("./config/ui-config.json").uiConfig;

const tierlistConfig = {
  name: "PvP Tier List",
  description: "Minecraft PvP ranking config, MCTiers-style structure",
  region: "Global",
  gamemodes,
  tiers,
  pointsSystem,
  uiConfig,
};

/**
 * Compute a player's overall points from their per-gamemode tier placements.
 * @param {{gamemodeId: string, tierId: string}[]} rankings
 * @returns {number}
 */
function computeOverallPoints(rankings) {
  return rankings.reduce((sum, r) => {
    const tier = tiers.find((t) => t.id === r.tierId);
    return sum + (tier ? tier.points : 0);
  }, 0);
}

/**
 * Look up the overall rank title for a given point total.
 * @param {number} points
 * @returns {string}
 */
function getOverallRank(points) {
  const sorted = [...pointsSystem.overallRanks].sort((a, b) => b.minPoints - a.minPoints);
  const match = sorted.find((r) => points >= r.minPoints);
  return match ? match.title : sorted[sorted.length - 1].title;
}

module.exports = {
  tierlistConfig,
  computeOverallPoints,
  getOverallRank,
};
