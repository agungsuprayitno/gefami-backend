import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginRequest } from "./request/login.request";
import { ApiResponse } from "src/common/api-response/api-response.model";
import { LoginResponse } from "./response/login.response";


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/login')
    @HttpCode(200)
    async register(
      @Body() request: LoginRequest,
    ): Promise<ApiResponse<LoginResponse>> {
      const result = await this.authService.signIn(request);
      return {
        data: result,
      };
    }


}