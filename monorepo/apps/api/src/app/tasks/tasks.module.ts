import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { Task } from './tasks.entity';
import { TasksService } from './tasks.service';
import { UserService } from '../users/users.service';
import { User } from '../users/users.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Task, User])],
  providers: [TasksService, UserService],
  controllers: [TasksController],
  exports: [TasksService]
})
export class TasksModule {}