import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import {
  FeatureFlag,
  FeatureFlagGuard,
  NestjsFlagsService,
} from '../libs/nestjs-flags/src';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(
    private readonly appService: AppService,
    private readonly flagsService: NestjsFlagsService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('profile')
  getProfileFeature(): string {
    const isNewProfileEnabled =
      this.flagsService.isFeatureEnabled('newUserProfile');
    this.logger.log(`New User Profile Enabled: ${isNewProfileEnabled}`);

    if (isNewProfileEnabled) {
      return 'Showing the NEW user profile!';
    } else {
      return 'Showing the OLD user profile.';
    }
  }

  @Get('search')
  @UseGuards(FeatureFlagGuard)
  @FeatureFlag('experimentalSearch')
  getSearchFeature(): string {
    return 'Using the EXPERIMENTAL search!';
  }

  @Get('non-existent')
  getNonExistentFeature(): string {
    return 'This should NOT be visible!';
  }
}
