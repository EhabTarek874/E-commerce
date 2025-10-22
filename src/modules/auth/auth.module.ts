import { Module } from "@nestjs/common";
import { AuthenticationService } from "./auth.service";
import { AuthenticationController } from "./auth.controller";
import { OtpModel, OtpRepository } from "src/DB";
import { SecurityService } from "src/common";

@Module({
    imports:[ OtpModel],
    providers:[AuthenticationService, OtpRepository, SecurityService ],
    controllers:[AuthenticationController],
    exports:[AuthenticationService]

})
export class AuthenticationModule {

}