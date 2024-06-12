import { User } from "@prisma/client";

export class PinjamRequest {
    book_id: number;
    user_id: number;
    book_title: string;
}