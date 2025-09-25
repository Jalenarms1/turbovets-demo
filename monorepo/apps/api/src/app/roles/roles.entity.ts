import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../users/users.entity';
import { Permission } from '../permissions/permissions.entity';
import { Roles } from '@monorepo/data';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: "text",
    enum: Roles,
    default: Roles.Viewer
  })
  name: string

  @Column()
  level: number

  @OneToMany(() => User, (user) => user.role, {})
  users: User[]

  @OneToMany(() => Permission, (permission) => permission.role, {})
  permissions: Permission[]


}
