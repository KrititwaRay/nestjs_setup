import { Module } from '@nestjs/common';
import { ApiConfigModule } from './config.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [
    ApiConfigModule,
    UserModule

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
