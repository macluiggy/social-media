import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

// Mock implementation of the Post repository
const mockPostRepository = {
  find: jest.fn(),
  findOneBy: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

// Mock implementation of the Request object
const mockRequest = {
  preferredLanguage: 'en', // Set the desired language for testing
};

describe('PostsController', () => {
  let controller: PostsController;
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(Post),
          useValue: mockPostRepository,
        },
        {
          provide: 'REQUEST',
          useValue: mockRequest,
        },
      ],
    }).compile();

    controller = await module.resolve<PostsController>(PostsController);
    service = await module.resolve<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  // Add more tests for your controller and service methods
});
