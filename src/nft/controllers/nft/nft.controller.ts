import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
} from '@nestjs/common';
import { CreateNftDto } from 'src/nft/services/nft/dtos/nft.dtos';
import { NftService } from 'src/nft/services/nft/nft.service';
import { LoggingInterceptor } from 'src/nft/logging.interceptor';

@Controller('nft')
export class NftController {
  constructor(private readonly nftService: NftService) {}

  @UseInterceptors(LoggingInterceptor)
  @Get()
  getNft() {
    return this.nftService.getNft();
  }

  @Get('id/:id')
  findNftById(@Param('id', ParseIntPipe) id: number) {
    return this.nftService.findNftById(id);
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  createNft(@Body() createNftDto: CreateNftDto) {
    return this.nftService.createNft(createNftDto);
  }
}
