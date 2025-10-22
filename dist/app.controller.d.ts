import { AppService } from './app.service';
import { AuthenticationService } from './modules/auth/auth.service';
export declare class AppController {
    private readonly appService;
    private readonly authenticationService;
    constructor(appService: AppService, authenticationService: AuthenticationService);
    getHello(): string;
    sayHi(): string;
}
