import { Body, Controller, Delete, Param, ParseIntPipe, Post } from '@nestjs/common';
import { Repository } from 'typeorm';
import { HastagService } from './hastag.service';
import { CreateHashTagDto } from './dto/create-hastag.dto';

@Controller('hastag')
export class HastagController {
    constructor(
        private readonly hastagService: HastagService
       
    ){}

    @Post()
    public createHashTag(@Body() createHashtagDto: CreateHashTagDto){
        return this.hastagService.createHastag(createHashtagDto)
    }

    @Delete(':id')
    public DeleteHashTag(@Param('id', ParseIntPipe) id:number){
        return this.hastagService.deleteHashtag(id)
    }
    @Delete('soft-delete/:id')
    public SoftDeleteHashTag(@Param('id', ParseIntPipe) id:number){
        return this.hastagService.softDeleteHashtag(id)
    }
}
