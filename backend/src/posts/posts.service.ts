import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import getMessages from '../lang/getMessages';
import Lang from '../lang/lang.type';
import paginate from '../common/paginate/paginate';

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

  /**
   * Finds posts belonging to a specific user.
   *
   * @param options - The options for pagination and filtering.
   * @param options.userId - The ID of the user.
   * @param options.page - The page number for pagination.
   * @param options.limit - The maximum number of posts per page.
   * @returns - A promise that resolves to the paginated posts.
   */
  async findUserPosts({ userId }, { page, limit }) {
    return paginate(
      this.postsRepository,
      { page, limit },
      { where: { userId } },
    );
  }

  /**
   * Finds random posts along with the user who created each post.
   *
   * @param options - The options for pagination.
   * @param options.page - The page number for pagination.
   * @param options.limit - The maximum number of posts per page.
   * @returns - A promise that resolves to the paginated posts.
   */
  async findRandomPosts({ page, limit }) {
    const skip = (page - 1) * limit;
    const posts = await this.postsRepository
      .createQueryBuilder('post')
      .leftJoin('post.user', 'user')
      .addSelect('user.username')
      .addSelect('user.fullName')
      .skip(skip)
      .take(limit)
      .getMany();

    const total = await this.postsRepository.count();

    // TODO: create a class so this way of result is standardized
    return {
      items: posts,
      total,
      page,
      limit,
    };
    // const result = await this.postsRepository.findAndCount({
    //   relations: {
    //     user: true,
    //   },
    //   order: { id: 'DESC' },
    //   skip,
    //   take: 2,
    // });
    // const result = await this.postsRepository.find({
    //   relations: {
    //     user: true,
    //   },
    //   order: { id: 'DESC' },
    //   skip,
    //   take: 2,
    // });
    // return result;
  }
}
