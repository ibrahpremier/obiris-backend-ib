import { Test, TestingModule } from '@nestjs/testing';
import { ParisController } from './paris.controller';
import { ParisService } from './paris.service';

describe('ParisController', () => {
  let controller: ParisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParisController],
      providers: [ParisService],
    }).compile();

    controller = module.get<ParisController>(ParisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
