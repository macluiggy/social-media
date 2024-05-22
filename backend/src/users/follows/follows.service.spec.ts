import { Test, TestingModule } from '@nestjs/testing';
import { FollowsService } from './follows.service';
import { vi } from 'vitest';

const mockFollowsService = {
  getUserFollowers: vi.fn(),
  getUserFollowing: vi.fn(),
  followUser: vi.fn(),
  unfollowUser: vi.fn(),
};

describe('FollowsService', () => {
  let service: FollowsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: FollowsService,
          useValue: mockFollowsService,
        },
      ],
    }).compile();

    service = module.get<FollowsService>(FollowsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
