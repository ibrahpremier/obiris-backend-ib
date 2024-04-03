import { Test, TestingModule } from '@nestjs/testing';
import { SoldesController } from './soldes.controller';
import { SoldesService } from './soldes.service';

describe('SoldesController', () => {
  let controller: SoldesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SoldesController],
      providers: [SoldesService],
    }).compile();

    controller = module.get<SoldesController>(SoldesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
