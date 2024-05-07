import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import getMessages from '../lang/getMessages';
import Lang from '../lang/lang.type';

@Injectable({
  scope: Scope.REQUEST,
})
export class PostsService {
  private messages: Lang;
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @Inject('REQUEST') private readonly request: Request,
  ) {
    const lang = this.request['preferredLanguage'];
    this.messages = getMessages(lang);
  }
  async create(createPostDto: CreatePostDto) {
    return await this.postsRepository.save(createPostDto);
  }

  async findAll() {
    return await this.postsRepository.find();
  }

  async findOne(id: number) {
    const post = await this.postsRepository.findOneBy({ id });

    if (!post) {
      throw new NotFoundException(this.messages.POST.NOT_FOUND);
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await this.postsRepository.update(id, updatePostDto);
  }

  async remove(id: number) {
    return await this.postsRepository.delete(id);
  }

  async findUserPosts({ userId }, { page, limit }) {
    return await this.postsRepository.findAndCount({
      where: { userId },
      skip: (page - 1) * limit,
      take: limit,
    });
  }
}
