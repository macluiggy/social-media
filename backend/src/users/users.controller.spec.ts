import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { Users } from './users.entity';
import { DataSource } from 'typeorm';
import { vi } from 'vitest';
import { MOCK_REQUEST } from '../common/tests/constants';

const mockUsersRepository = {
  find: vi.fn(),
  findOneBy: vi.fn(),
  save: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: 'REQUEST',
          useValue: MOCK_REQUEST,
        },
        {
          provide: 'UsersRepository',
          useValue: mockUsersRepository,
        },
        {
          provide: DataSource,
          useValue: {},
        },
      ],
    }).compile();

    controller = await module.resolve<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
