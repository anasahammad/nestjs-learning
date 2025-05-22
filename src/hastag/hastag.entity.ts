import { Tweet } from "src/tweet/tweet.entity";
import { Column, DeleteDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Hastag{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        nullable:false,
        unique: true
    })
    name:string;

    @ManyToMany(()=>Tweet, (tweet)=>tweet.hashtags, {onDelete: 'CASCADE'})
    tweets:Tweet[]

    @DeleteDateColumn()
    deletedAt:Date;
}