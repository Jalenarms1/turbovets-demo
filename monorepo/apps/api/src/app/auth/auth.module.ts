import { Module } from "@nestjs/common";
import {ConfigModule, ConfigService} from "@nestjs/config"
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthUtilsService } from "@monorepo/auth";
import { User } from "../users/users.entity";

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ( {
          secret: configService.get<string>("JWT_SECRET"),
          signOptions: {expiresIn: "2h"}
      })
    }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService, AuthUtilsService],
  exports: [JwtStrategy, AuthService]
})
export class AuthModule{}