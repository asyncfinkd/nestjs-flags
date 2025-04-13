import { Injectable, Inject, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestjsFlagsOptions } from "./interfaces/nestjs-flags-option.interface";
import { NESTJS_FLAGS_CONFIG_OPTIONS } from "./constants";

@Injectable()
export class NestjsFlagsService {
  private readonly logger = new Logger(NestjsFlagsService.name);
  private readonly flagsKey: string;

  constructor(
    private readonly configService: ConfigService,
    // @ts-ignore
    @Inject(NESTJS_FLAGS_CONFIG_OPTIONS)
    private readonly options: Required<NestjsFlagsOptions>
  ) {
    this.flagsKey = this.options.flagsKey;
    this.logger.log(`Using configuration key for flags: "${this.flagsKey}"`);
  }

  /**
   * Checks if a specific feature flag is enabled in the configuration.
   * Looks for the flag under the 'featureFlags' key in the config.
   * Example config: { featureFlags: { newCheckout: true, betaUserLogin: false } }
   * @param featureKey The name (key) of the feature flag.
   * @returns True if the flag is explicitly set to true, false otherwise.
   */
  isFeatureEnabled(featureKey: string): boolean {
    const flagPath = `${this.flagsKey}.${featureKey}`;
    const isEnabled = this.configService.get<boolean>(flagPath);

    if (isEnabled === undefined) {
      this.logger.debug(
        `Feature flag "${featureKey}" not found in config (path: ${flagPath}). Defaulting to disabled.`
      );
      return false;
    }

    return isEnabled === true;
  }
}
