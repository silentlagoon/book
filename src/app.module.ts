import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookService } from './services/book.service'
import { UsersModule } from "./users.module";
import { AuthModule } from "./auth.module";
import {ProfileModule} from "./profile.module";
import {AuthorizedMiddleware} from "./middleware/authorized.middleware";

@Module({
  imports: [UsersModule, AuthModule, ProfileModule],
  controllers: [AppController],
  providers: [AppService, BookService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(AuthorizedMiddleware)
        .forRoutes('*');
  }
}
