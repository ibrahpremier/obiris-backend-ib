import { Test, TestingModule } from '@nestjs/testing';
import { ParrainagesController } from './parrainages.controller';
import { ParrainagesService } from './parrainages.service';

describe('ParrainagesController', () => {
  let controller: ParrainagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParrainagesController],
      providers: [ParrainagesService],
    }).compile();

    controller = module.get<ParrainagesController>(ParrainagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
