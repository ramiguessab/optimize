import * as z from "zod";

export const messageSchema = z.object({
    message: z.string().nonempty("Required"),
});

export type MessageFormSchema = z.infer<typeof messageSchema>;
