import {
  Module,
  DynamicModule,
  Provider,
  NotFoundException,
} from '@nestjs/common';
import { NestjsFlagsService } from './nestjs-flags.service';
import { ConfigModule } from '@nestjs/config';
import { NestjsFlagsOptions } from './interfaces/nestjs-flags-option.interface';
import { NESTJS_FLAGS_CONFIG_OPTIONS } from './constants';

const defaultExceptionFactory = (flagName: string) =>
  new NotFoundException(`Feature '${flagName}' is not available.`);

@Module({})
export class NestjsFlagsModule {
  static forRoot(options?: NestjsFlagsOptions): DynamicModule {
    const mergedOptions: Required<NestjsFlagsOptions> = {
      flagsKey: options?.flagsKey ?? 'featureFlags',
      exceptionFactory: options?.exceptionFactory ?? defaultExceptionFactory,
    };

    const optionsProvider: Provider = {
      provide: NESTJS_FLAGS_CONFIG_OPTIONS,
      useValue: mergedOptions,
    };

    return {
      module: NestjsFlagsModule,
      imports: [ConfigModule],
      providers: [optionsProvider, NestjsFlagsService],
      exports: [NestjsFlagsService, optionsProvider],
      global: false,
    };
  }
}
