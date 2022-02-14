import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { VerificationsController } from './verifications.controller';

describe('VerificationsController', () => {
  let controller: VerificationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VerificationsController],
      providers: [ConfigService]
    }).compile();

    controller = module.get<VerificationsController>(VerificationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
