import { BadRequestException, Body, Controller, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import {LoginDto} from "@monorepo/auth"


@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService){}

    @Post("login")
    async loginUser(@Body() loginDto: LoginDto) {
        console.log(loginDto);
        
        const user = await this.authService.getUserByUsername(loginDto.username)

        if(!user) throw new BadRequestException("Please make sure you have an existing account")

        var userAuthResp = await this.authService.validateUser(loginDto, user)
        if(!userAuthResp) {
            throw new BadRequestException("invalid credentials")
        }

        return {token: userAuthResp.token, user: {id: user.id, username: user.username, orgainzation: user.organization, role: user.role}}

    }
}