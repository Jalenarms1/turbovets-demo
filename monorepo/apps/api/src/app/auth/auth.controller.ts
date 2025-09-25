import { BadRequestException, Body, Controller, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import {LoginDto} from "@monorepo/auth"
import { UserDto } from "@monorepo/data";
import { UserService } from "../users/users.service";


@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService, private userService: UserService){}

    @Post("login")
    async loginUser(@Body() loginDto: LoginDto) {
        console.log(loginDto);
        
        const user = await this.userService.getUserByUsername(loginDto.username)

        if(!user) throw new BadRequestException("Please make sure you have an existing account")

        var userAuthResp = await this.authService.validateUser(loginDto, user)
        if(!userAuthResp) {
            throw new BadRequestException("invalid credentials")
        }

        return {token: userAuthResp.token, user: {id: user.id, username: user.username, organization: user.organization, role: user.role} as UserDto}

    }
}