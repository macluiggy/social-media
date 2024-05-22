import { Test, TestingModule } from '@nestjs/testing';
import { FollowsController } from './follows.controller';
import { FollowsService } from './follows.service';
import { vi } from 'vitest';

const mockFollowsService = {
  getUserFollowers: vi.fn(),
  getUserFollowing: vi.fn(),
  followUser: vi.fn(),
  unfollowUser: vi.fn(),
};

describe('FollowsController', () => {
  let controller: FollowsController;
  // let service: FollowsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FollowsController],
      providers: [
        {
          provide: FollowsService,
          useValue: mockFollowsService,
        },
      ],
    }).compile();

    controller = module.get<FollowsController>(FollowsController);
    // service = module.get<FollowsService>(FollowsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
