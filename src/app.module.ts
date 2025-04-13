import { Module, ForbiddenException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NestjsFlagsModule } from 'libs/nestjs-flags/src';

const featureFlagsConfig = () => ({
  featureFlags: {
    newUserProfile: process.env.FEATURE_FLAGS_NEW_USER_PROFILE === 'true',
    experimentalSearch:
      process.env.FEATURE_FLAGS_EXPERIMENTAL_SEARCH === 'true',
  },
  port: parseInt(process.env.PORT, 10) || 3000,
});

const loadedConfig = featureFlagsConfig();
const cleanFeatureFlags = {};
if (loadedConfig.featureFlags) {
  Object.keys(loadedConfig.featureFlags).forEach((key) => {
    const envVarName = `FEATURE_FLAGS_${key.replace(/([A-Z])/g, '_$1').toUpperCase()}`;
    if (process.env[envVarName] !== undefined) {
      cleanFeatureFlags[key] = loadedConfig.featureFlags[key];
    }
  });
}
const finalConfig = () => ({
  ...loadedConfig,
  featureFlags: cleanFeatureFlags,
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [finalConfig],
    }),
    NestjsFlagsModule.forRoot({
      exceptionFactory: (flagName) =>
        new ForbiddenException(`Access denied by feature flag: ${flagName}`),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
