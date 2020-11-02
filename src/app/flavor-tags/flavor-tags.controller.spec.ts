import { Test, TestingModule } from '@nestjs/testing';
import { FlavorTagsController } from './flavor-tags.controller';

describe('FlavorTagsController', () => {
  let controller: FlavorTagsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlavorTagsController],
    }).compile();

    controller = module.get<FlavorTagsController>(FlavorTagsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
