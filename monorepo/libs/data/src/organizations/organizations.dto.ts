import { TasksDto } from "../tasks/tasks.dto";
import { UserDto } from "../users/users.dto";

export interface OrganizationDto {
    id: string,
    name: string,
    owner: UserDto,
    tasks: TasksDto[]
}