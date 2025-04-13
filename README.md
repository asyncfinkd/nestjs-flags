<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>

  <p align="center">
    A flexible feature flag module for NestJS applications. Easily manage feature toggles using decorators and configuration.
  </p>
</p>

## Description

`nestjs-flags` provides a simple way to implement feature flags (also known as feature toggles) in your NestJS application. It integrates with the standard `@nestjs/config` module to load flag statuses and offers a Guard and Decorator (`@FeatureFlag`) to control access to routes based on whether a feature is enabled or disabled.

## Features

- Loads flags from configuration (via `@nestjs/config`).
- Provides `NestjsFlagsService` for imperative flag checks.
- Provides `@FeatureFlag()` decorator and `FeatureFlagGuard` for declarative route protection.
- Configurable via `forRoot` options (custom config key, custom exception on disabled flag).
- Written in TypeScript with types included.
- Unit tested.

## Installation

```bash
npm install nestjs-flags
# or
yarn add nestjs-flags
```

## Quick Start

1.  **Configure your flags:**
    Set up your flag configuration source, for example, using a `.env` file:

    ```dotenv
    # Feature flags (prefix matches default 'featureFlags' key mapping)
    FEATURE_FLAGS_NEW_USER_PROFILE=true
    FEATURE_FLAGS_EXPERIMENTAL_SEARCH=false
    ```

2.  **Import `ConfigModule` and `NestjsFlagsModule`:**
    In your main application module (e.g., `app.module.ts`), import and configure `@nestjs/config` and `NestjsFlagsModule`.

    ```typescript
    // src/app.module.ts
    import { Module, ForbiddenException } from "@nestjs/common";
    import { ConfigModule } from "@nestjs/config";
    import { AppController } from "./app.controller";
    import { AppService } from "./app.service";
    import { NestjsFlagsModule } from "nestjs-flags"; // Import the module

    @Module({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ".env",
          load: [finalConfig],
        }),

        NestjsFlagsModule.autoLoadFromEnv(),

        NestjsFlagsModule.forRoot({
          // Optional: Customize options here (see Configuration section)
          // example:
          // exceptionFactory: (flagName) => new ForbiddenException(`Flag ${flagName} is disabled!`),
        }),
      ],
      controllers: [AppController],
      providers: [AppService],
    })
    export class AppModule {}
    ```

3.  **Use the Service or Decorator:**

    - **Using `NestjsFlagsService`:** Inject the service to check flags programmatically.

      ```typescript
      // src/app.controller.ts
      import { Controller, Get, Logger } from "@nestjs/common";
      import { NestjsFlagsService } from "nestjs-flags";

      @Controller("service-example")
      export class ServiceExampleController {
        constructor(private readonly flagsService: NestjsFlagsService) {}

        @Get("feature")
        getFeature() {
          if (this.flagsService.isFeatureEnabled("newUserProfile")) {
            return { message: "New user profile is available!" };
          } else {
            return { message: "Showing the old profile." };
          }
        }
      }
      ```

    - **Using `@FeatureFlag` Decorator and Guard:** Protect entire routes declaratively.

      ```typescript
      // src/app.controller.ts
      import { Controller, Get, UseGuards, Logger } from "@nestjs/common";
      import { FeatureFlag, FeatureFlagGuard } from "nestjs-flags";

      @Controller("decorator-example")
      export class DecoratorExampleController {
        private readonly logger = new Logger(DecoratorExampleController.name);

        @Get("profile")
        @UseGuards(FeatureFlagGuard) // Activate the guard
        @FeatureFlag("newUserProfile") // Specify the flag to check
        getProfileFeature() {
          // This code only runs if 'newUserProfile' is true
          this.logger.log("Guard allowed access to profile.");
          return { message: "Showing the NEW user profile!" };
        }

        @Get("search")
        @UseGuards(FeatureFlagGuard)
        @FeatureFlag("experimentalSearch")
        getSearchFeature() {
          // This code only runs if 'experimentalSearch' is true
          // If false, the guard throws an exception (NotFoundException by default)
          this.logger.log("Guard allowed access to search.");
          return { message: "Using the EXPERIMENTAL search!" };
        }
      }
      ```
