import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { PinjamService } from "./pinjam.service";
import { ApiResponse } from "src/common/api-response/api-response.model";
import { PinjamResponse } from "./response/pinjam.response";
import { PinjamRequest } from "./request/pinjam.request";

@Controller('pinjam')
export class PinjamController {

    constructor(private pinjamService: PinjamService) {}

    @Post()
    @HttpCode(200)
    async pinjam(
      @Body() request: PinjamRequest,
    ): Promise<ApiResponse<PinjamResponse>> {
      const result = await this.pinjamService.pinjam(request);
      return {
        data: result,
      };
    }
   
}