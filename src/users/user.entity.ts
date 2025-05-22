import { Profile } from "src/profile/profile.entity";
import { Tweet } from "src/tweet/tweet.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        nullable: false,
        length: 24,
        unique: true
    })
    userName: string;
   

    @Column({
        type: "varchar",
        nullable: false,
        length: 100,
        unique: true
    })
    email: string;

    @OneToMany(()=>Tweet, (tweet)=>tweet.user)
    tweets: Tweet[]
    
    @Column()
    password: string;

    @OneToOne(()=>Profile, (profile)=>profile.user, /*ata bio directional er jonno */ {
        cascade: ['insert'], // cascade will changes automatically its child service whenever the parent service has change
        // eager: true  this is method: 2 to add eager loading

    })
    // @JoinColumn()
    profile?: Profile;


    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}