// src/features/shop/types/banner.types.ts
export interface BannerAction {
  label: string;
  route: string;
}

export interface BannerData {
  id: string;
  categoryName: string;
  offerText: string;
  backgroundImage: string;
  actions: BannerAction[];
}
