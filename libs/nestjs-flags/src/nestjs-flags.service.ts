import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NestjsFlagsService {
  private readonly logger = new Logger(NestjsFlagsService.name);

  constructor(private readonly configService: ConfigService) {}

  /**
   * Checks if a specific feature flag is enabled in the configuration.
   * Looks for the flag under the 'featureFlags' key in the config.
   * Example config: { featureFlags: { newCheckout: true, betaUserLogin: false } }
   * @param featureKey The name (key) of the feature flag.
   * @returns True if the flag is explicitly set to true, false otherwise.
   */
  isFeatureEnabled(featureKey: string): boolean {
    const flagPath = `featureFlags.${featureKey}`;
    const isEnabled = this.configService.get<boolean>(flagPath);

    if (isEnabled === undefined) {
      this.logger.debug(
        `Feature flag "${featureKey}" not found in config (path: ${flagPath}). Defaulting to disabled.`,
      );
      return false;
    }

    return isEnabled === true;
  }
}
