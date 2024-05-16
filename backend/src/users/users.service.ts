import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/users.dto';
import getMessages from '../lang/getMessages';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import Lang from '../lang/lang.type';
import { DEFAULT_LANG } from '../lang';
import { AiApiService } from '../ai-api/ai-api.service';
import { FileStorageService } from '../file-storage/file-storage.service';
import { USER } from '../common/constants';

@Injectable({
  scope: Scope.REQUEST,
})
export class UsersService {
  private messages: Lang;
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @Inject(REQUEST) private readonly request: Request,
    private dataSource: DataSource,
    private IAApiService: AiApiService,
    private fileStorageService: FileStorageService,
  ) {
    const lang = this.request?.['preferredLanguage'] || DEFAULT_LANG;
    this.messages = getMessages(lang);
  }

  async checkPassword(attempt: string, password: string): Promise<boolean> {
    return await bcrypt.compare(attempt, password);
  }

  async create(user: UserDto): Promise<Users> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      if (await this.userAlreadyExists(user)) {
        throw new ConflictException(this.messages.USER.ALREADY_EXISTS);
      }
      const { storageKey } = await this.fileStorageService.uploadFile(
        user.profileImage,
        {
          key: USER.STORAGE_KEY_PATH.PROFILE_IMAGES(user.username),
        },
      );
      console.log('storageKey', storageKey);

      const newUser = this.userRepository.create({
        ...user,
        // TODO: add column for profile image
      });
      // return await this.userRepository.save(newUser);
      const data = await queryRunner.manager.save(newUser);
      await queryRunner.rollbackTransaction();
      return data;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }

  async userAlreadyExists({ email, username }: UserDto): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: [{ email }, { username }],
    });
    return !!user;
  }

  async findAll(): Promise<Users[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<any> {
    // let prompt = '';
    // const instruction = `Instruction: always respond with a joke at the end of the conversation

    //   Message: hi there, how are you?`;
    // return await this.IAApiService.chatCompletion({
    //   prompt: instruction,
    // });
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, userDto: UserDto): Promise<Users> {
    delete userDto.password; // Don't update the password here
    const user = await this.findOne(id);
    const updatedUserData = {
      ...user,
      ...userDto,
    };
    const updatedUser = await this.userRepository.save(updatedUserData);
    delete updatedUser.password;

    return updatedUser;
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.userRepository.delete(id);
  }

  async findByUsername(username: string): Promise<Users> {
    return await this.userRepository.findOneOrFail({
      where: { username },
    });
  }

  async findByEmail(email: string): Promise<Users> {
    return await this.userRepository.findOneOrFail({
      where: { email },
    });
  }

  async deleteByEmail(email: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (user) {
      await this.userRepository.delete(user.id);
    }
  }

  async createUserIfNotExists(user: UserDto): Promise<Users> {
    // if (await this.userAlreadyExists(user)) {
    //   return null;
    // }
    let userEntity = await this.userRepository.findOne({
      where: [{ email: user.email }, { username: user.username }],
    });
    if (!userEntity) {
      userEntity = await this.create(user);
    }

    return userEntity;
  }
}
