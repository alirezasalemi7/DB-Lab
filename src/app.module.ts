import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './hello/hello.module';
import { BooksModule } from './books/books.module';
import { UserModule } from './user/user.module';
import { GenreModule } from './genre/genre.module';
import { JobseekersModule } from './jobseekers/jobseekers.module';
import { AuthModule } from './auth/auth.module';
import UserEntity from 'db/entity/user.entity';
import BookEntity from 'db/entity/book.entity';
import GenreEntity from 'db/entity/genre.entity';
import JobSeekersUserEntity from 'db/entity/jobseekersUsers.entity';
import CVEntity from 'db/entity/cv.entity';
import ProjectEntity from 'db/entity/project.entity';
import RequestEntity from 'db/entity/request.entity';

@Module({
  imports: [
    BooksModule,
    HelloModule, 
    UserModule,
    GenreModule,
    TypeOrmModule.forFeature([UserEntity, BookEntity , GenreEntity , JobSeekersUserEntity , CVEntity , ProjectEntity , RequestEntity]),
    TypeOrmModule.forRoot(),
    JobseekersModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
