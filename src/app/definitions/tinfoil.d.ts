export interface TinfoilGame {
  id: number;
  name: string;
  version: number;
  icon_url: string;
  size: number;
  release_date: Date;
  publisher: string;
  type: number;
  user_rating: number;
  user_like: string;
  playtime: number;
  has_nsp: boolean;
  has_xci: boolean;
  cnt?: number;
  age_weight?: number;
  patch_version?: number;
  price?: number;
}

export interface TinfoilTitle {
  id: number;
  nsUid: number;
  name: string;
  intro: string;
  description: string;
  version: number;
  players: number;
  rating: number;
  icon_url: string;
  front_box_url: string;
  banner_url: string;
  size: number;
  release_date: Date;
  modified: Date;
  publisher: string;
  developer: null;
  baseId: number;
  type: number;
  isDemo: boolean;
  user_rating: number;
  install_count: number;
  install_weight: number;
  eshop_price_deviation: number;
  overall_rank: number;
  playtime: number;
  mc_user_rating: number;
  mc_rating: number;
  created: null;
  has_nsp: boolean;
  has_xci: boolean;
  user_like: null;
  weight: number;
}
