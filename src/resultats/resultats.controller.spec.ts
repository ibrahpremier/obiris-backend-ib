import { Test, TestingModule } from '@nestjs/testing';
import { ResultatsController } from './resultats.controller';
import { ResultatsService } from './resultats.service';

describe('ResultatsController', () => {
  let controller: ResultatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResultatsController],
      providers: [ResultatsService],
    }).compile();

    controller = module.get<ResultatsController>(ResultatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
