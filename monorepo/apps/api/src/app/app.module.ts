import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/tasks.entity';
import { TasksModule } from './tasks/tasks.module';
import { User } from './users/users.entity';
import { Organization } from './organizations/organizations.entity';
import { Role } from './roles/roles.entity';
import { Permission } from './permissions/permissions.entity';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',                 
      database: 'db.sqlite',          
      entities: [Task, User, Organization, Role, Permission],               
      synchronize: true,              
    }), 
    TasksModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
