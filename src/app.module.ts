/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';

import { UserEntity } from './users/users.entity';
import { UserModule } from './users/users.module';
import { BookEntity } from './books/books.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // Change if using a remote database
      port: 5433, // Default PostgreSQL port
      username: 'postgres',
      password: 'Premp7@196',
      database: 'pagal',
      autoLoadEntities: true, // Automatically load entities
      synchronize: true, // Set to false in production
      entities: [UserEntity, BookEntity],
    }),
    BooksModule,
    UserModule
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
