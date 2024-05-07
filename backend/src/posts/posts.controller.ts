import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Scope,
  Inject,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import getApiEndpoint from '../common/utils/getApiEndpoint';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import ApiStandardResponse from '../common/interceptors/api-response';
import Lang from '../lang/lang.type';
import getMessages from '../lang/getMessages';

@Controller({
  path: getApiEndpoint('posts'),
  scope: Scope.REQUEST,
})
@UseGuards(JwtAuthGuard)
@ApiTags('posts')
@ApiBearerAuth()
export class PostsController {
  private messages: Lang;
  constructor(
    private readonly postsService: PostsService,
    @Inject('REQUEST') private readonly request: Request,
  ) {
    const lang = this.request['preferredLanguage'];
    this.messages = getMessages(lang);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  async create(@Body() createPostDto: CreatePostDto) {
    const created = await this.postsService.create(createPostDto);
    return new ApiStandardResponse(created, this.messages.POST.CREATED);
  }

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  async findAll() {
    return await this.postsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a post by id' })
  async findOne(@Param('id') id: number) {
    return await this.postsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a post by id' })
  async update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
    const updated = await this.postsService.update(id, updatePostDto);
    return new ApiStandardResponse(updated, this.messages.POST.UPDATED);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a post by id',
    description: 'Only the owner can delete the post',
  })
  async remove(@Param('id') id: number) {
    const deleted = await this.postsService.remove(id);
    return new ApiStandardResponse(deleted, this.messages.POST.DELETED);
  }
}
