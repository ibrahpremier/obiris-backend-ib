import { Test, TestingModule } from '@nestjs/testing';
import { FormulesController } from './formules.controller';
import { FormulesService } from './formules.service';

describe('FormulesController', () => {
  let controller: FormulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormulesController],
      providers: [FormulesService],
    }).compile();

    controller = module.get<FormulesController>(FormulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
