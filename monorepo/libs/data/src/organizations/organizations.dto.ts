import { UserDto } from "../users/users.dto";

export interface OrganizationDto {
    id: string,
    name: string,
    owner: UserDto
}