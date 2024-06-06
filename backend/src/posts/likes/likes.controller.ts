import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import getApiEndpoint from '../../common/utils/getApiEndpoint';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller({
  path: getApiEndpoint('likes'),
})
@UseGuards(JwtAuthGuard)
@ApiTags('likes')
@ApiBearerAuth()
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  create(@Body() createLikeDto: CreateLikeDto, @Req() req: Request) {
    const user = req['user'];
    createLikeDto.userId = user.id;
    return this.likesService.create(createLikeDto);
  }

  @Get()
  findAll() {
    return this.likesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.likesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.likesService.remove(+id);
  }
}
