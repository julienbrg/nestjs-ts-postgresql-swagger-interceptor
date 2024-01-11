import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Nft } from 'src/typeorm';
import { Repository } from 'typeorm';
import { CreateNftDto } from './dtos/nft.dtos';

@Injectable()
export class NftService {
  constructor(
    @InjectRepository(Nft) private readonly nftRepository: Repository<Nft>,
  ) {}

  createNft(createNftDto: CreateNftDto) {
    const newNft = this.nftRepository.create(createNftDto);
    return this.nftRepository.save(newNft);
  }

  getNft() {
    return this.nftRepository.find();
  }

  findNftById(id: number) {
    return this.nftRepository.findOne(id as any);
  }
}
