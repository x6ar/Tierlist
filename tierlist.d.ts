// Type definitions for the PvP tier list config and data.
// Import these wherever you load config/*.json or data/players.json.

export interface Gamemode {
  id: string;
  name: string;
  icon: string;
  order: number;
}

export type Sublevel = "high" | "low";

export interface Tier {
  id: string;
  label: string;       // e.g. "HT1"
  tierLevel: 1 | 2 | 3 | 4 | 5;
  sublevel: Sublevel;
  color: string;        // hex color
  points: number;
}

export interface OverallRank {
  title: string;
  minPoints: number;
}

export interface PointsSystem {
  description: string;
  combineMethod: "sum_best_per_gamemode" | string;
  overallRanks: OverallRank[];
}

export interface UIConfig {
  defaultView: string;
  sortable: boolean;
  filterByRegion: boolean;
  showPeakTier: boolean;
  showPointsBreakdown: boolean;
}

export interface PlayerRanking {
  gamemodeId: string;   // references Gamemode.id
  tierId: string;       // references Tier.id
  peakTierId: string;   // references Tier.id
  lastTested: string;   // ISO-8601 date
}

export interface Player {
  id: string;           // uuid
  username: string;
  avatarUrl: string;
  region: string;
  rankings: PlayerRanking[];
  overallPoints: number;
  overallRank: string;  // matches an OverallRank.title
}

export interface TierlistConfig {
  name: string;
  description: string;
  region: string;
  gamemodes: Gamemode[];
  tiers: Tier[];
  pointsSystem: PointsSystem;
  uiConfig: UIConfig;
}
