import { z } from 'zod';
export const signupSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Enter a valid email'),
    password: z.string().min(6, 'Minimum 6 characters'),
    // confirmPassword: z.string(),
// }).refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords don't match",
//     path: ['confirmPassword'],
});
export type SignupSchemaType = z.infer<typeof signupSchema>;