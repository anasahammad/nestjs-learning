import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/users/users.service';
import { Tweet } from './tweet.entity';
import { Repository } from 'typeorm';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { User } from 'src/users/user.entity';
import { HastagService } from 'src/hastag/hastag.service';
import { Hastag } from 'src/hastag/hastag.entity';
import { UpdateTweetDTO } from './dto/update-tweet.dto';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';
import { PaginationProvider } from 'src/common/pagination/pagination.provider';
import { Paginated } from 'src/common/pagination/paginated.interface';

@Injectable()
export class TweetService {
    constructor(private readonly userService: UserService,
        private readonly hashtagService: HastagService,
        @InjectRepository(Tweet)
        private readonly tweetRepository: Repository<Tweet>,
        private readonly paginationRepository: PaginationProvider
    ){}
   

    // getTweetById(userId: number){

    //     const user = this.userService.getUserById(userId)
    //     const tweet =  this.tweets.filter(t=> t.userId === userId)
    //     const response = tweet.map(t=> {return {text: t.text, date: t.date, user: user}})

    //     return response;
    // }

    public async getAllTweet(paginationQueryDto: PaginationQueryDto) : Promise<Paginated<Tweet>>{

    //    return await this.tweetRepository.find({
    //     relations:{user:true},
    //     skip: (paginationQueryDto.page! - 1) * paginationQueryDto.limit!,
    //     take: paginationQueryDto.limit
    //    })

       return await this.paginationRepository.paginatedQuery(
        paginationQueryDto,
        this.tweetRepository,
        {user:true}
       )
    }

    public async getSingleUserTweet(userId:number){
        const user = await this.userService.findUserById(userId)

        if(!user){
            throw new NotFoundException(`User with user id ${userId} is not found!`)
        }
        return this.tweetRepository.find({
            where: {user: {id:userId}}
        })
    }

    public async createTweet(creatTweetdto: CreateTweetDto){
        //find the user with userId from the params
        let user = await this.userService.findUserById(creatTweetdto.userId)

        if(!user){
            throw new Error("user is not found")
        }

        //fetch hashtag

      const hashtagIds: number[] = Array.isArray(creatTweetdto.hashtags)
  ? creatTweetdto.hashtags
  : [];

let hashTags = await this.hashtagService.findHashTags(hashtagIds);

       
        //create new tweet for the user
let tweet = await this.tweetRepository.create({...creatTweetdto, user:user, hashtags: hashTags})

        // save the tweet on the database

        return await this.tweetRepository.save(tweet)
    }


    public async updateTweet(updateTweetDto: UpdateTweetDTO){
        //Find all the hashtags
      let hashtags =  await this.hashtagService.findHashTags(updateTweetDto.hashtags as number[])

        // Find the tweet by id
        let tweet = await this.tweetRepository.findOneBy({id: updateTweetDto.id})
        
        // update the tweet property
        if (tweet) {
        tweet.text = updateTweetDto.text ?? tweet.text
        tweet.image = updateTweetDto.image ?? tweet.image
        tweet.hashtags = hashtags

        return await this.tweetRepository.save(tweet)
}
    }


    public async deleteTweet(id:number){
        await this.tweetRepository.delete({id})
        return {deleted: true, id}
    }

    
}
