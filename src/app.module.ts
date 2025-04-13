import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NestjsFlagsModule } from '../libs/nestjs-flags/src';

const featureFlagsConfig = () => ({
  featureFlags: {
    newUserProfile: process.env.FEATURE_FLAGS_NEW_USER_PROFILE === 'true',
    experimentalSearch:
      process.env.FEATURE_FLAGS_EXPERIMENTAL_SEARCH === 'true',
  },
  port: parseInt(process.env.PORT, 10) || 3000,
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [featureFlagsConfig],
    }),
    NestjsFlagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
