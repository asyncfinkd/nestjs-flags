import {
  Module,
  DynamicModule,
  Provider,
  NotFoundException,
} from "@nestjs/common";
import { NestjsFlagsService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { NestjsFlagsOptions } from "./interfaces/nestjs-flags-options.interface";
import { NESTJS_FLAGS_CONFIG_OPTIONS } from "./constants";

const defaultExceptionFactory = (flagName: string) =>
  new NotFoundException(`Feature '${flagName}' is not available.`);

@Module({})
export class NestjsFlagsModule {
  /**
   * Synchronously loads feature flags from a configuration source.
   * @param options The configuration options for the feature flags.
   * @returns A dynamic module for the NestJS module.
   */
  static forRoot(options?: NestjsFlagsOptions): DynamicModule {
    const mergedOptions: Required<NestjsFlagsOptions> = {
      flagsKey: options?.flagsKey ?? "featureFlags",
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
      global: true,
    };
  }

  /**
   * Asynchronously loads feature flags from a configuration source.
   * @param options The configuration options for the feature flags.
   * @returns A dynamic module for the NestJS module.
   */
  static forRootAsync(options: {
    imports?: any[];
    useFactory: (
      ...args: any[]
    ) => NestjsFlagsOptions | Promise<NestjsFlagsOptions>;
    inject?: any[];
  }): DynamicModule {
    const optionsProvider: Provider = {
      provide: NESTJS_FLAGS_CONFIG_OPTIONS,
      useFactory: async (...args: any[]) => {
        const userOptions = await options.useFactory(...args);
        return {
          flagsKey: userOptions?.flagsKey ?? "featureFlags",
          exceptionFactory:
            userOptions?.exceptionFactory ?? defaultExceptionFactory,
        };
      },
      inject: options.inject || [],
    };

    return {
      module: NestjsFlagsModule,
      imports: [...(options.imports || []), ConfigModule],
      providers: [optionsProvider, NestjsFlagsService],
      exports: [NestjsFlagsService, optionsProvider],
      global: true,
    };
  }

  /**
   * Automatically loads feature flags from environment variables.
   * @param prefix The prefix for the environment variables.
   * @param options The optional configuration options for the feature flags.
   * @returns A dynamic module for the NestJS module.
   */
  static autoLoadFromEnv(
    prefix = "FEATURE_FLAGS_",
    options?: NestjsFlagsOptions
  ): DynamicModule {
    return this.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const featureFlags = {};

        Object.keys(process.env)
          .filter((key) => key.startsWith(prefix))
          .forEach((key) => {
            const flagName = key
              .replace(prefix, "")
              .toLowerCase()
              .replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());

            featureFlags[flagName] = process.env[key] === "true";
          });

        configService.set("featureFlags", featureFlags);

        return options || {};
      },
    });
  }
}
