import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon2 from 'argon2';
import { DatabaseService } from 'src/database/database.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';


@Injectable()
export class AuthService {
    constructor(private database: DatabaseService) { }
    async login(dto: AuthDto) {
        //find user by email
        const user = await this.database.user.findUnique({
            where: {
                email: dto.email
            }
        });
        
        if (!user) {
            throw new ForbiddenException('Invalid credentials');
        }
        //compare password
        const valid = await argon2.verify(user.password, dto.password);
        if (!valid) {
            throw new ForbiddenException('Invalid credentials');
        }
        return user;
        //return user
    }

    async signup(dto: AuthDto) {
        //generate hashed password

        //save user to db
        try {
            const hashedPassword = await argon2.hash(dto.password);
            const user = await this.database.user.create({
                data: {
                    email: dto.email,
                    password: hashedPassword
                }
            });
            return user;
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Email already exists');
                }
            }
            throw error;


        }
    }
}
