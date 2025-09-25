import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from 'typeorm';
import { Role } from '../roles/roles.entity';
import { User } from '../users/users.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => User, (user) => user.permissions, {
    onDelete: "CASCADE"
  })
  users: User[]

  @ManyToOne(() => Role, (role) => role.permissions, {
    onDelete: "CASCADE"
  })
  role: Role
}
