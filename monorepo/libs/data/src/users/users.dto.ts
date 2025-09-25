import { OrganizationDto } from "../organizations/organizations.dto"
import { RoleDto } from "../roles/roles.dto"
import { TasksDto } from "../tasks/tasks.dto"

export interface UserAuthDto {
    id?: string
    username: string
    password: string
    role: RoleDto
}

export interface UserAuthResponse {
    user: UserDto,
    token: string
}

export interface UserDto {
    id: string
    username: string
    role?: RoleDto,
    organization?: OrganizationDto,
    tasks?: TasksDto[]
}