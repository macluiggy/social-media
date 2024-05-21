import { Injectable } from '@nestjs/common';
import { CreateFollowDto } from './dto/create-follow.dto';
import { UpdateFollowDto } from './dto/update-follow.dto';
import { Repository } from 'typeorm';
import { Follow } from './entities/follow.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable({})
export class FollowsService {
  constructor(
    @InjectRepository(Follow)
    private readonly followsRepository: Repository<Follow>,
  ) {}

  follow(followedId: number, followerId: number) {
    const data = {
      followerId: followerId,
      followingId: followedId,
    };

    const follow = this.followsRepository.create(data);
    return this.followsRepository.save(follow);
  }

  unfollow(followedId: number, followerId: number) {
    return this.followsRepository.delete({
      followingId: followedId,
      followerId: followerId,
    });
  }

  /**
   * Get the users that a user is following.
   * @param userId
   * @returns
   */
  getUserFollowing(userId: number) {
    const query = this.followsRepository
      .createQueryBuilder('follow')
      .select('follow.followingId')
      .where('follow.followerId = :userId', { userId })
      .leftJoin('follow.following', 'user')
      .addSelect(['user.id', 'user.username', 'user.email']);

    return query.getMany();
  }

  /**
   * Get the followers of a user.
   * @param userId
   * @returns
   */
  getUserFollowers(userId: number) {
    const query = this.followsRepository
      .createQueryBuilder('follow')
      .select('follow.followerId')
      .where('follow.followingId = :userId', { userId })
      .leftJoin('follow.follower', 'user')
      .addSelect(['user.id', 'user.username', 'user.email']);

    return query.getMany();
  }

  /**
   * Check if the logged-in user is following another user.
   * @param loggedInUserId
   * @param otherUserId
   * @returns
   */
  async isUserFollowing(
    loggedInUserId: number,
    otherUserId: number,
  ): Promise<boolean> {
    const follow = await this.followsRepository.findOne({
      where: { followerId: loggedInUserId, followingId: otherUserId },
    });

    return !!follow;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(createFollowDto: CreateFollowDto) {
    return 'This action adds a new follow';
  }

  findAll() {
    return `This action returns all follows`;
  }

  findOne(id: number) {
    return `This action returns a #${id} follow`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateFollowDto: UpdateFollowDto) {
    return `This action updates a #${id} follow`;
  }

  remove(id: number) {
    return `This action removes a #${id} follow`;
  }
}
