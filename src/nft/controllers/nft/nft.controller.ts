import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateNftDto } from 'src/nft/services/nft/dtos/nft.dtos';
import { NftService } from 'src/nft/services/nft/nft.service';

@Controller('nft')
export class NftController {
  constructor(private readonly nftService: NftService) {}

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
