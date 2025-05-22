import { Module } from '@nestjs/common';
import { HastagService } from './hastag.service';
import { HastagController } from './hastag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hastag } from './hastag.entity';

@Module({
  providers: [HastagService],
  controllers: [HastagController],
  exports: [HastagService],
  imports: [TypeOrmModule.forFeature([Hastag])]
})
export class HastagModule {}
