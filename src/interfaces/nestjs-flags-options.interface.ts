export interface NestjsFlagsOptions {
  /**
   * The key in the configuration object where feature flags reside.
   * @default 'featureFlags'
   */
  flagsKey?: string;

  /**
   * A factory function to create the exception thrown by FeatureFlagGuard when a flag is disabled.
   * Receives the disabled flag name as an argument.
   * @default (flagName: string) => new NotFoundException(`Feature '${flagName}' is not available.`)
   */
  exceptionFactory?: (flagName: string) => any;
}
