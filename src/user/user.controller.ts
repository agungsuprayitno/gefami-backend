import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { RegisterUserRequest } from "./request/register-user.request";
import { ApiResponse } from "src/common/api-response/api-response.model";
import { UserResponse } from "./response/user.response";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    @HttpCode(200)
    async allUsers(): Promise<ApiResponse<UserResponse[]>> {
      const result = await this.userService.getAllUser();
      return {
        data: result,
      };
    }

    @Post('/register')
    @HttpCode(200)
    async register(
      @Body() request: RegisterUserRequest,
    ): Promise<ApiResponse<UserResponse>> {
      const result = await this.userService.register(request);
      return {
        data: result,
      };
    }

}