import { Global, Logger, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { ThrottlerModule } from '@nestjs/throttler';
import { existsSync } from "node:fs";

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: (() => {
                const env = process.env.NODE_ENV;
                let envFile = '.env';

                if (env) {
                    envFile = `.env.${env}`;

                    Logger.log(`Using environment-specific file: ${envFile}`, 'ConfigModule');

                } else {
                    envFile = '.env.production';
                    Logger.log(`No NODE_ENV set, defaulting to: ${envFile}`, 'ConfigModule');

                }
                Logger.log(`Checking if file exists: ${envFile}`, 'ConfigModule');
                if (!existsSync(envFile)) {
                    Logger.error(`Environment file '${envFile}' not found. Please create the file or set NODE_ENV to a valid environment.`, 'ConfigModule');
                    process.exit(1);
                }
                Logger.log(`Environment file '${envFile}' loaded successfully`, 'ConfigModule');
                return envFile;

            })(),
            isGlobal: true
        }),
        MongooseModule.forRootAsync({
            useFactory: (ConfigService: ConfigService) => ({
                uri: ConfigService.get<string>('MONGO_URI'),
                dbName: ConfigService.get<string>('DB_DATABASE') || 'NestJsSetUp',
            }),
            inject: [ConfigService]

        }),
        ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }]),

    ],
    providers: [
        Logger
    ],
})


export class ApiConfigModule {}



/* in a NestJS project, you need to install both mongoose and @nestjs/mongoose to use MongoDB with NestJS effectively.
Why Both Are Needed

mongoose:

This is the core MongoDB object modeling library for Node.js.
It provides the functionality to interact with MongoDB, including schema definition, queries, and database operations.
It is a dependency required by @nestjs/mongoose to function.


@nestjs/mongoose:

This is the NestJS-specific module that integrates Mongoose with the NestJS framework.
It provides NestJS-specific features like dependency injection, decorators (e.g., @Schema, @Prop), and a clean way to configure Mongoose within the NestJS module system.
It relies on the mongoose package to perform the actual MongoDB operations. */