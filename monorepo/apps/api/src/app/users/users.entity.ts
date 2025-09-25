import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Organization } from '../organizations/organizations.entity';
import { Role } from '../roles/roles.entity';
import { Permission } from '../permissions/permissions.entity';
import { Task } from '../tasks/tasks.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @ManyToOne(() => Organization, (org) => org.users, {
    onDelete: "CASCADE"
  })
  organization: Organization

  @ManyToOne(() => Role, (role) => role.users, {
    onDelete: "CASCADE"
  })
  role: Role

  @OneToMany(() => Task, (task) => task.assignedBy, {
    onDelete: "CASCADE"
  })
  createdTasks: Task[]

  @OneToMany(() => Task, (task) => task.assignedTo, {
    onDelete: "CASCADE"
  })
  myTasks: Task[]

  @ManyToMany(() => Permission, (perm) => perm.users, { cascade: true })
  @JoinTable()
  permissions: Permission[];
}
