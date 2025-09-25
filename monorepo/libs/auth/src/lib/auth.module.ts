import { Module } from "@nestjs/common";
import {ConfigModule, ConfigService} from "@nestjs/config"
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "../../../../apps/api/src/app/auth/jwt.strategy";

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
    })
  ],
  providers: [JwtStrategy],
  exports: [JwtStrategy]
})
export class AuthModule{}