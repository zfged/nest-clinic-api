import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookModule } from '../book/book.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './global-exception.filter';
import { AuthModule } from 'src/auth/auth.module';
import { CenterModule } from 'src/center/center.module';

@Module({
  imports: [
    BookModule,
    AuthModule,
    CenterModule,
    MongooseModule.forRoot('mongodb+srv://dima:5163809@db.6rfad1f.mongodb.net/?retryWrites=true&w=majority'),
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    }
  ],
})
export class AppModule {}
