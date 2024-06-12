import { z, ZodType } from 'zod';

export class PinjamValidation {
    static readonly PINJAM: ZodType = z.object({
        book_id: z.number(),
        book_title: z.string(
            {
                required_error: "Book title is required.",
                invalid_type_error: "Book Title must be a string."
            }
        ),
        user_id: z.number(),
    });
}