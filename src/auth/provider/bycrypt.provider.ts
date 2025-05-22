import { Injectable } from '@nestjs/common';
import { HashingProviderTs } from './hashing.provider';
import * as bcrypt from 'bcrypt';
@Injectable()
export class BycryptProviderTs implements HashingProviderTs {
    public async hashedPassword(password: string | Buffer): Promise<string> {
        //generate a salt
        let salt = await bcrypt.genSalt()

        //hash the password

        return await bcrypt.hash(password, salt)
    } 


    public async comparePassword(plainPassword: string | Buffer, hashedPassword: string | Buffer): Promise<boolean> {
        return await bcrypt.compare(plainPassword, hashedPassword)
    }
}
