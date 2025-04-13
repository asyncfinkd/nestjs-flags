import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { NestjsFlagsService } from '../nestjs-flags.service';
import { FEATURE_FLAG_KEY, NESTJS_FLAGS_CONFIG_OPTIONS } from '../constants';
import { NestjsFlagsOptions } from '../interfaces/nestjs-flags-option.interface';

@Injectable()
export class FeatureFlagGuard implements CanActivate {
  private readonly logger = new Logger(FeatureFlagGuard.name);

  constructor(
    private readonly reflector: Reflector,
    private readonly flagsService: NestjsFlagsService,
    @Inject(NESTJS_FLAGS_CONFIG_OPTIONS)
    private readonly options: Required<NestjsFlagsOptions>,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredFlag = this.reflector.get<string>(
      FEATURE_FLAG_KEY,
      context.getHandler(),
    );

    if (!requiredFlag) {
      return true;
    }

    this.logger.debug(
      `Checking feature flag "${requiredFlag}" for route access.`,
    );
    const isEnabled = this.flagsService.isFeatureEnabled(requiredFlag);

    if (isEnabled) {
      this.logger.debug(
        `Feature flag "${requiredFlag}" is enabled. Access granted.`,
      );
      return true;
    } else {
      this.logger.warn(
        `Feature flag "${requiredFlag}" is disabled. Access denied.`,
      );
      throw this.options.exceptionFactory(requiredFlag);
    }
  }
}
