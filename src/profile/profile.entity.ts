import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Profile{
    @PrimaryGeneratedColumn()
    id: string;

    @Column({
        type: "varchar",
        nullable: true,
        length: 100
    })
    firstName: string;

    @Column({
        type: "varchar",
        nullable: true,
        length: 100
    })
    lastName: string;

    @Column({
        type: "varchar",
        nullable: true,
        length: 10
    })
    gender: string;


    @Column({
        type: 'timestamp',
        nullable: true
    })
    dateOfBirth: Date;

    @Column({
        type: 'text',
        nullable: true
    })
    bio: string;

    @Column({
        type: 'text',
        nullable: true
    })
    profileImage: string;

    @OneToOne(()=> User, (user)=>user.profile, {
        onDelete: 'CASCADE'
    }) // this is called bi-directional one to one relation. akhane joincolumn use na korar karon hocche jate abar userId name noton column create na hoy cz already profileid name akta column er maddome user and profile relationship ase.
    @JoinColumn()
    user: User;
}