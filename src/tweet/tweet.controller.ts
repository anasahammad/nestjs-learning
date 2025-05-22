import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDTO } from './dto/update-tweet.dto';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';

@Controller('tweet')
export class TweetController {
    constructor(private readonly tweetService: TweetService){}

    // @Get(':userId')
    // getTweet(@Param('userId', ParseIntPipe) userId: number){
    //     return this.tweetService.getTweetById(userId)
    // }

    @Get()
    public getTweets(@Query() paginationQueryDto:PaginationQueryDto){
        console.log(paginationQueryDto)
        return this.tweetService.getAllTweet(paginationQueryDto)
    }

    @Get(':userId')
    public getTweetsByUserId(@Param('userId', ParseIntPipe) userId: number){
        return this.tweetService.getSingleUserTweet(userId)
    }

    @Post()
    public createTweet(@Body() tweet: CreateTweetDto){
       return this.tweetService.createTweet(tweet)
    }

    @Patch()
    public updateTweet(@Body() tweet: UpdateTweetDTO){
        return this.tweetService.updateTweet(tweet)
    }

    @Delete(':id')
    public deleteTweet(@Param('id', ParseIntPipe) id:number){
       return this.tweetService.deleteTweet(id)
    }
}
