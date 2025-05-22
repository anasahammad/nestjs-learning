import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashingProviderTs {
    abstract hashedPassword(data: string | Buffer): Promise<string>;

    abstract comparePassword(plainPassword: string | Buffer, hashedPassword: string | Buffer): Promise<boolean>
}
