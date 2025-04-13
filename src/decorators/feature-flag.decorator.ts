import { SetMetadata } from "@nestjs/common";
import { FEATURE_FLAG_KEY } from "../constants";

/**
 * Decorator that marks a route as requiring a specific feature flag to be enabled
 * @param flagName The name of the feature flag to check
 */
export const FeatureFlag = (flagName: string) => {
  return SetMetadata(FEATURE_FLAG_KEY, flagName);
};
