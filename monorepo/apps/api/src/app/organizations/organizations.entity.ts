import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { User } from '../users/users.entity';
import { Task } from '../tasks/tasks.entity';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string

  @OneToOne(() => User, (user) => user.organization)
  owner: User

  @OneToMany(() => User, (user) => user.organization, {})
  users: User[]

  @OneToMany(() => Task, (task) => task.organization, {})
  tasks: Task[]
}
