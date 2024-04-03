import { Test, TestingModule } from '@nestjs/testing';
import { ParrainagesService } from './parrainages.service';

describe('ParrainagesService', () => {
  let service: ParrainagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParrainagesService],
    }).compile();

    service = module.get<ParrainagesService>(ParrainagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
