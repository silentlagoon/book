import { Module } from "@nestjs/common";
import { ProfileController } from "./profile.controller";
import {UsersService} from "./services/users.service";

@Module({
    imports: [],
    providers: [UsersService],
    controllers: [ProfileController],
})

export class ProfileModule {}