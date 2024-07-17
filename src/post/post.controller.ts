import { Controller, Delete, Get, Param, Put, Query } from '@nestjs/common';
import { PostRo, PostService } from './post.service';
import { Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';

@ApiTags('文章')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}
  /**
   *   创建文章
   *  @param post
   */
  @ApiOperation({ summary: '创建文章' })
  @Post()
  async create(@Body() post: CreatePostDto) {
    return await this.postService.create(post);
  }
  /**
   *   获取所有文章
   *  @param post
   */
  @ApiOperation({ summary: '获取文章列表' })
  @Get()
  async findAll(@Query() query): Promise<PostRo> {
    return await this.postService.findAll(query);
  }
  /**
   *   获取指定文章
   *  @param post
   */
  @ApiOperation({ summary: '获取指定文章' })
  @Get(':id')
  async findById(@Param('id') id) {
    return await this.postService.findById(id);
  }
  /**
   *   更新文章
   *  @param id
   *  @param post
   */
  @ApiOperation({ summary: '更新文章' })
  @Put(':id')
  async update(@Param('id') id, @Body() post) {
    return await this.postService.updateById(id, post);
  }
  /**
   *   删除
   *  @param id
   */
  @ApiOperation({ summary: '删除文章' })
  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.postService.remove(id);
  }
}
