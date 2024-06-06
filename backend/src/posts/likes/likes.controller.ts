import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import getApiEndpoint from '../../common/utils/getApiEndpoint';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

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

  @Get('post/:postId')
  @ApiOperation({
    summary: 'Get all likes for a specific post',
    description: 'This endpoint returns all likes for a specific post',
  })
  @ApiParam({
    name: 'postId',
    type: Number,
    description: 'ID of the post',
  })
  findByPostId(
    @Param('postId') postId: string,
    @Query() query: { page: number; limit: number },
  ) {
    const { page = 1, limit = 10 } = query;

    return this.likesService.findByPostId(+postId, { query: { page, limit } });
  }
}
