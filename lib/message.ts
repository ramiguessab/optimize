import * as z from "zod";
export const messageSchema = z.object({
    message: z
        .string()
        .nonempty("Required")
        .min(50, "Please give us more words."),
});

export type MessageFormSchema = z.infer<typeof messageSchema>;
