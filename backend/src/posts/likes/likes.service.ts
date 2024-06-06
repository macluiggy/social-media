import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { Repository } from 'typeorm';
import { Like } from './entities/like.entity';
import { InjectRepository } from '@nestjs/typeorm';
import StandardizedPaginateResult from '../../common/paginate/standarized.paginate.result';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
  ) {}
  create(createLikeDto: CreateLikeDto) {
    const created = this.likeRepository.create(createLikeDto);
    return this.likeRepository.save(created);
  }

  findAll() {
    return this.likeRepository.find();
  }

  findOne(id: number) {
    return this.likeRepository.findOne({
      where: { id },
    });
  }

  remove(id: number) {
    return this.likeRepository.delete(id);
  }

  /**
   * Finds all likes for a specific post.
   * @param postId
   * @param param1
   * @returns
   */
  async findByPostId(
    postId: number,
    options: { query: { page: number; limit: number } } = {
      query: { page: 1, limit: 10 },
    },
  ) {
    const { page, limit } = options.query;
    const skip = (page - 1) * limit;
    const [likes, total] = await this.likeRepository
      .createQueryBuilder('like')
      .where('like.postId = :postId', { postId })
      .leftJoin('like.user', 'user')
      .select(['like', 'user.id', 'user.username'])
      .skip(skip)
      .take(limit)
      .getManyAndCount();
    return new StandardizedPaginateResult({
      page,
      limit,
      total,
      items: likes,
    });
  }

  /**
   * Checks if a user has liked a specific post.
   * @param postId
   * @param userId
   * @returns
   */
  async hasUserLikedPost(postId: number, userId: number) {
    const like = await this.likeRepository.findOne({
      where: { postId, userId },
    });
    return !!like;
  }
}
