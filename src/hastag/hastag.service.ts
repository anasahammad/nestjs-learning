import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hastag } from './hastag.entity';
import { In, Repository } from 'typeorm';
import { CreateHashTagDto } from './dto/create-hastag.dto';

@Injectable()
export class HastagService {
    constructor(
        @InjectRepository(Hastag) 
        private readonly hastagRepository: Repository<Hastag>
    ){}

    public async createHastag(createhashtagDto: CreateHashTagDto){
        let hashtag = await this.hastagRepository.create(createhashtagDto)
        return await this.hastagRepository.save(hashtag)
    }

    public async findHashTags(hashtags: number[]){
         if (!hashtags || hashtags.length === 0) {
    return []; // অথবা throw new Error('No hashtags provided');
  }
       return await this.hastagRepository.find({
            where: {id: In(hashtags!)}
        })
    }

    public async deleteHashtag(id: number){
        await this.hastagRepository.delete({id})

        return {deleted:true, id}
    }
    public async softDeleteHashtag(id: number){
        await this.hastagRepository.softDelete({id})

        return {deleted:true, id}
    }
}
