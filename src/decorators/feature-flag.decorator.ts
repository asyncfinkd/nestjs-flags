import { SetMetadata } from '@nestjs/common';
import { FEATURE_FLAG_KEY } from '../constants';

/**
 * Attaches feature flag metadata to the target method or class.
 * Used in conjunction with the FeatureFlagGuard.
 * @param flagName The key of the feature flag to check.
 */
export const FeatureFlag = (flagName: string) =>
  SetMetadata(FEATURE_FLAG_KEY, flagName);
