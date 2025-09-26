import { OrganizationDto } from "../organizations/organizations.dto"
import { UserDto } from "../users/users.dto"
import { Category, Priority, Status } from "./tasks.enums"

export interface CreateTaskDto {
    title: string,
    dueDate: Date,
    createdAt: Date,
    status: Status,
    category: Category,
    priority: Priority,
    assignedBy: UserDto,
    assignedToUsername: string,
    organization: OrganizationDto
}

export interface UpdateTaskDto {
    id: string,
    title: string,
    status: Status,
    category: Category,
    priority: Priority,
    assignedTo: UserDto,
    assignedBy: UserDto,
    organization: OrganizationDto
}

export interface TasksDto {
    id: string,
    title: string,
    dueDate: Date,
    createdAt: Date,
    category: Category,
    status: Status,
    priority: Priority,
    assignedTo: UserDto,
    assignedBy: UserDto,
    organization: OrganizationDto
} 