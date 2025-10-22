"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const common_2 = require("./common");
const interceptors_1 = require("./common/interceptors");
async function bootstrap() {
    const port = process.env.PORT ?? 3000;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(common_2.setDefaultLanguage);
    app.useGlobalInterceptors(new interceptors_1.LoggingInterceptor());
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    await app.listen(port, () => {
        console.log(`Server is running on port 😘${port}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map