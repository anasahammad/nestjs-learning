import { Hastag } from "src/hastag/hastag.entity";
import { User } from "src/users/user.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Tweet{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'text',
        nullable: false
    })
    text: string;

    @Column({
        type: 'text',
        nullable: true
    })
    image?:string;

    @ManyToOne(()=> User, (user)=>user.tweets, {eager: true}) // here no need to mention @JoinColumn() because it already make foreign key for user with userId
    user: User;

    @ManyToMany(()=>Hastag, (hashtag)=>hashtag.tweets, {eager: true})
    @JoinTable()
    hashtags?: Hastag[];

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;

}