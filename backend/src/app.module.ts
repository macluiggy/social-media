import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './db/config/typeorm.config';
import { SetUserPreferredLanguage } from './lang/middleware/lang.middleware';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PostsModule } from './posts/posts.module';
import { AiApiModule } from './ai-api/ai-api.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([]),
    JwtModule,
    ServeStaticModule.forRoot({
      // rootPath: join(__dirname, '..', 'frontend', 'dist', 'frontend'), // adjust this path as needed
      rootPath: join(
        __dirname,
        '..',
        '..',
        '..',
        'frontend',
        'dist',
        'frontend',
        'browser',
      ), // adjust this path as needed
    }),
    PostsModule,
    AiApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SetUserPreferredLanguage).forRoutes('*');
  }
}
