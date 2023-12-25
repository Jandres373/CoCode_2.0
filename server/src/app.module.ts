import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaConnectionModule } from './prisma_connection/prisma_connection.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ProjectModule } from './project/project.module';
import { CommentModule } from './comment/comment.module';
import { TechModule } from './tech/tech.module';
import { TaskModule } from './task/task.module';
import { CountryModule } from './country/country.module';
import { TeamModule } from './team/team.module';
import { QueryModule } from './query/query.module';
import { ReportModule } from './report/report.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    PrismaConnectionModule,
    ProjectModule,
    CommentModule,
    TechModule,
    TaskModule,
    CountryModule,
    TeamModule,
    QueryModule,
    ReportModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
