import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../users/users.entity";
import { UserAuthDto, UserAuthResponse, UserDto } from "@monorepo/data";
import { AuthUtilsService, LoginDto } from "@monorepo/auth";
import * as bcrypt from "bcrypt"



@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>, private authService: AuthUtilsService) {}

    async validateUser(loginDto: LoginDto,existingUser: UserAuthDto ) : Promise<UserAuthResponse | null> {
        var user = await this.authService.validateUser(loginDto, existingUser)
        if(!user) return null
        return {token: await this.authService.login(user), user}
    } 

}