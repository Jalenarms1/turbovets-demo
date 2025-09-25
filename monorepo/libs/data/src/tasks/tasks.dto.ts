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
    priorit: Priority,
    assignedToId: string
}

export interface TasksDto {
    id: string,
    title: string,
    assignedTo: UserDto,
    assignedBy: UserDto
} 