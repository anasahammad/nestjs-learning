import { Test, TestingModule } from '@nestjs/testing';
import { HastagService } from './hastag.service';

describe('HastagService', () => {
  let service: HastagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HastagService],
    }).compile();

    service = module.get<HastagService>(HastagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
