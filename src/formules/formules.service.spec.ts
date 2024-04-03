import { Test, TestingModule } from '@nestjs/testing';
import { FormulesService } from './formules.service';

describe('FormulesService', () => {
  let service: FormulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormulesService],
    }).compile();

    service = module.get<FormulesService>(FormulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
