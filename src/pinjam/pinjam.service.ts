import { HttpException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/common/service/prisma.service";
import { ValidationService } from "src/common/service/validation.service";
import { PinjamResponse } from "./response/pinjam.response";
import { PinjamRequest } from "./request/pinjam.request";
import { PinjamValidation } from "./pinjam.validation";


@Injectable()
export class PinjamService {
    
    constructor(
        private validationService: ValidationService,
        private prismaService: PrismaService,
      ) {}

    async pinjam(request: PinjamRequest): Promise<PinjamResponse> {
        const pinjamRequest: PinjamRequest =
        this.validationService.validate(PinjamValidation.PINJAM, request);
  
        let userLoan: any;
        try {
            userLoan = await this.prismaService.user.findFirstOrThrow({
                where: {
                    id: pinjamRequest.user_id,
                },
            });
            if (userLoan.is_loan) {
                throw new HttpException('This user is still on loan', 403);
            }
        } catch(error) {
            throw new HttpException('User not Found', 404);
        }

        const bookLoan = await this.prismaService.bookLoan.findFirst({
            where: {
                book_id: pinjamRequest.book_id,
                is_returned: false,
            },
        });
    
        if (bookLoan && !bookLoan.is_returned) {
            throw new HttpException('This book is still on Loan', 403);
        }

        const currentDate = new Date()
        const returnDate = new Date()
        const currentDay = currentDate.getDate();
        returnDate.setDate(currentDay + 1)

        const userBookPinjam =
        { 
            book_id: pinjamRequest.book_id, 
            book_title: pinjamRequest.book_title, 
            user: {
                connect: { id: userLoan.id }
            },
            loan_date: currentDate,
            return_date: returnDate,
            is_returned: false,
            created_at: currentDate
        }

        let loan = await this.prismaService.bookLoan.create({
            data: userBookPinjam,
        });
        
        try {
            await  this.prismaService.$transaction(async (tx) => {
                const loan = await this.prismaService.bookLoan.create({
                    data: userBookPinjam,
                });
                const userUpdated = await this.prismaService.user.update({
                    where: {
                        id: userLoan.id,
                      },
                      data: {
                        is_loan: true,
                      },
                })
                return { loan, userUpdated };
            });
          } catch (error) {
            throw new HttpException('Cannot loan for now, please try again later.', 400);
          }
        
        return {
            loan_id: loan.id,
            book_id: loan.book_id,
            book_title: loan.book_title,
            user_id: userLoan.id,
            user_name: userLoan.name,
            user_email: userLoan.email,
            loan_date: loan.loan_date.toDateString(),
            return_date: loan.return_date.toDateString(),
        };

    }

}