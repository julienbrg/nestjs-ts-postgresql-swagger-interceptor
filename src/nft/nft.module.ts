import { Module } from '@nestjs/common';
import { NftController } from './controllers/nft/nft.controller';
import { NftService } from './services/nft/nft.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nft } from 'src/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Nft])],

  controllers: [NftController],
  providers: [NftService],
})
export class NftModule {}
