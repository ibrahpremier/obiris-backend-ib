import { Test, TestingModule } from '@nestjs/testing';
import { ParisService } from './paris.service';

describe('ParisService', () => {
  let service: ParisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParisService],
    }).compile();

    service = module.get<ParisService>(ParisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
