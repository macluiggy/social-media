import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { Repository } from 'typeorm';
import { Like } from './entities/like.entity';
import { InjectRepository } from '@nestjs/typeorm';

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
}
