import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, ManyToMany, OneToOne } from 'typeorm';
import { User } from '../users/users.entity';
import {Category, Priority, Status} from "@monorepo/data"

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string

  @Column()
  createdAt: Date;

  @Column()
  dueDate: Date;

  @Column({
    type: 'text',           
    enum: Status,
    default: Status.Pending,
  })
  status: Status;

  @Column({nullable: true})
  completedAt: Date;

  @Column({
    type: 'text',           
    enum: Priority,
    default: Priority.Low,
  })
  priority: Priority;

  @Column({
    type: 'text',           
    enum: Category,
    default: Category.General,
  })
  category: Category;

  @ManyToOne(() => User, (user) => user.createdTasks)
  assignedBy: User

  @ManyToOne(() => User, (user) => user.myTasks)
  assignedTo: User
}
