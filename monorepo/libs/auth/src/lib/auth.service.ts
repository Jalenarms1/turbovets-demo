import { Injectable } from "@nestjs/common";
import {JwtService} from "@nestjs/jwt"
import { LoginDto } from "./auth.dto";
import {UserAuthDto, UserDto} from "@monorepo/data"
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthUtilsService {
    constructor(private jwtService: JwtService) {}

    async validateUser(loginDto: LoginDto, existingUser: UserAuthDto) : Promise<UserDto | null> {
        if(loginDto.username != existingUser.username) return null;

        var isValid = await bcrypt.compare(loginDto.password, existingUser.password)

        if(!isValid)
        {
            return null
        }

        var user: UserDto = {
            id: existingUser.id as string,
            username: existingUser.username,
            role: existingUser.role
        } 

        return user
    }

    async login(user: UserDto)
    {
        var jwtPayload = {
            sub: user.id,
            username: user.username,
            role: user.role
        }

        return this.jwtService.sign(jwtPayload)
    }
}