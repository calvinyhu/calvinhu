export interface FeatureFlags {
  orderEnabled?: boolean;
  photosEnabled?: boolean;
}

export interface AppState {
  featureFlags: FeatureFlags;
}
