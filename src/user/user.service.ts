import { HttpException, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { ValidationService } from "src/common/service/validation.service";
import { PrismaService } from "src/common/service/prisma.service";
import { UserValidation } from "./user.validation";
import { UserResponse } from "./response/user.response";
import { User } from "@prisma/client";
import { RegisterUserRequest } from "./request/register-user.request";


@Injectable()
export class UserService {
    constructor(
        private validationService: ValidationService,
        private prismaService: PrismaService,
      ) {}

    async register(request: RegisterUserRequest): Promise<UserResponse> {
        const registerRequest: RegisterUserRequest =
        this.validationService.validate(UserValidation.REGISTER, request);
  
        const userExist = await this.findOne(request.email)
    
        if (userExist && userExist.id) {
          throw new HttpException('email already exists', 400);
        }
    
        registerRequest.password = await bcrypt.hash(registerRequest.password, 10);
        registerRequest.is_loan = false;
        registerRequest.created_at = new Date();
    
        const user = await this.prismaService.user.create({
          data: registerRequest,
        });
    
        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };

    }

    async getAllUser(): Promise<UserResponse[]> {

      const allUsers = await this.prismaService.user.findMany();
      const users  = allUsers.map((user) => {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      })
  
      return users;

  }

    async findOne(emailRequest: string): Promise<User> {

      const user = await this.prismaService.user.findFirst({
        where: {
          email: emailRequest,
        },
      });

      return user
    }
}