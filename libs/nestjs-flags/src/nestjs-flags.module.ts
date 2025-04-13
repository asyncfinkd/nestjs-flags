import { Module } from '@nestjs/common';
import { NestjsFlagsService } from './nestjs-flags.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [NestjsFlagsService],
  exports: [NestjsFlagsService],
})
export class NestjsFlagsModule {}
