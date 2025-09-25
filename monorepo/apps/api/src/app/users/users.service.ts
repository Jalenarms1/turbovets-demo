import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserAuthDto } from "@monorepo/data";
import * as bcrypt from "bcrypt"


@Injectable()
export class UserService {
    constructor (@InjectRepository(User) private userRepo: Repository<User>) {}

    async createUser(userDto: UserAuthDto) {
        var newUser: UserAuthDto = {
            username: userDto.username,
            password: await bcrypt.hash(userDto.password, 10),
            role: userDto.role
        } 

        var result = await this.userRepo.insert(newUser)
        return result
    }
}