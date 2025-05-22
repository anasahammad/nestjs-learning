import { IntersectionType } from "@nestjs/mapped-types";
import { IsDate, IsOptional } from "class-validator";
import { PaginationQueryDto } from "src/common/pagination/dto/pagination-query.dto";

class GetTweetBaseDto{

    @IsDate()
    @IsOptional()
    startDate: Date;

    @IsDate()
    @IsOptional()
    endDate: Date;
}

export class GetTweetQueryDto extends IntersectionType(GetTweetBaseDto,
    PaginationQueryDto
){

}