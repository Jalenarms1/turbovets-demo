/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { DataSource } from 'typeorm';
import { User } from './app/users/users.entity';
import * as bcrypt from "bcrypt"
import { Roles } from '@monorepo/data';
import { Organization } from './app/organizations/organizations.entity';
import { Role } from './app/roles/roles.entity';

async function seedDb(datasource: DataSource) {
  const userRepo = datasource.getRepository(User)
  const orgRepo = datasource.getRepository(Organization)
  const rolesRepo = datasource.getRepository(Role)

  // userRepo.deleteAll()
  // orgRepo.deleteAll()
  // rolesRepo.deleteAll()

  if((await rolesRepo.count()) == 0) {
    const role1 = {
      name: Roles.Viewer,
      level: 1,
      permissions: [],
      users: []
    }

    const role2 = {
      name: Roles.Admin,
      level: 2,
      permissions: [],
      users: []
    }

    const role3 = {
      name: Roles.Owner,
      level: 2,
      permissions: [],
      users: []
    }

    const viewerRole = await rolesRepo.save(role1)
    const adminRole = await rolesRepo.save(role2)
    const ownerRole = await rolesRepo.save(role3)

    if((await userRepo.count()) == 0) {
      
      const owner1 = {
        username: "owner1",
        password: await bcrypt.hash("ownerpass1", 10),
        role: ownerRole,
      }
  
      const owner2 = {
        username: "owner2",
        password: await bcrypt.hash("ownerpass2", 10),
        role: ownerRole
      }
  
      const savedOwner1 = await userRepo.save(owner1)
      const savedOwner2 = await userRepo.save(owner2)
      
      const org1 = {
        name: "Test Org 1",
        owner: savedOwner1
      }
      
      const org2 = {
        name: "Test Org 2",
        owner: savedOwner2
      }
      
      const savedOrg1 = await orgRepo.save(org1)
      const savedOrg2 = await orgRepo.save(org2)
      
      const viewerOrg1 = {
        username: "viewer1",
        password: await bcrypt.hash("viewerpass1", 10),
        role: viewerRole,
        organization: savedOrg1
      }
      
      const adminOrg1 = {
        username: "admin1",
        password: await bcrypt.hash("adminpass1", 10),
        role: adminRole,
        organization: savedOrg1
      }

      const viewerOrg2 = {
        username: "viewer2",
        password: await bcrypt.hash("viewerpass2", 10),
        role: viewerRole,
        organization: savedOrg2
      }
      
      const adminOrg2 = {
        username: "admin2",
        password: await bcrypt.hash("adminpass2", 10),
        role: adminRole,
        organization: savedOrg2
      }

      await userRepo.save(viewerOrg1)
      await userRepo.save(viewerOrg2)
      await userRepo.save(adminOrg1)
      await userRepo.save(adminOrg2)

  
    }
  }


}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);


  app.enableCors({
    origin: ["http://localhost:4200"],
    methods: "*",
    credentials: true
  })

  var datasource = app.get(DataSource)

  await seedDb(datasource)

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
