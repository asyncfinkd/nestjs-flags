import { Test, TestingModule } from '@nestjs/testing';
import { NestjsFlagsService } from './nestjs-flags.service';

describe('NestjsFlagsService', () => {
  let service: NestjsFlagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NestjsFlagsService],
    }).compile();

    service = module.get<NestjsFlagsService>(NestjsFlagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
