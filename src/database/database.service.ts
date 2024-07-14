import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client'; // Add this import statement

@Injectable()
export class DatabaseService extends PrismaClient {
    constructor(config:ConfigService) {
        super({
            datasources: {
                db: {
                    url: config.get('DATABASE_URL'),
                },
            },
        });
    }
}
