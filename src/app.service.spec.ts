import { Test, TestingModule } from "@nestjs/testing";
import { ConfigService } from "@nestjs/config";
import { NestjsFlagsService } from "./app.service";
import { NESTJS_FLAGS_CONFIG_OPTIONS } from "./constants";
import { describe, it, expect, beforeEach, vi } from "vitest";

describe("NestjsFlagsService", () => {
  let service: NestjsFlagsService;
  let configService: ConfigService;

  const mockConfigService = {
    get: vi.fn(),
    set: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NestjsFlagsService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: NESTJS_FLAGS_CONFIG_OPTIONS,
          useValue: {
            flagsKey: "featureFlags",
            exceptionFactory: (flagName: string) =>
              new Error(`Feature '${flagName}' is not available.`),
          },
        },
      ],
    }).compile();

    service = module.get<NestjsFlagsService>(NestjsFlagsService);
    configService = module.get<ConfigService>(ConfigService);

    vi.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
