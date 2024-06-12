import { z, ZodType } from 'zod';

export class UserValidation {
    static readonly REGISTER: ZodType = z.object({
        name: z.string().min(1).max(100),
        email: z.string().min(1).max(100),
        password: z.string({
            required_error: "Password is required",
            invalid_type_error: "Password must be a string",
            message: "Password at least 8 characters and have single Capital Case."
          }).min(8).max(100),
    });
}