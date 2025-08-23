import { Module } from '@nestjs/common';
import { ApiConfigModule } from './config.module';
// import { UserModule } from './modules/users/user.module';
import { CmsRepositoryModule } from './modules/cms/repositories/cms.repository.module';
import { CmsModule } from './modules/cms/cms.module';

@Module({
  imports: [
    ApiConfigModule,
    // UserModule,
    CmsRepositoryModule,
    CmsModule

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
