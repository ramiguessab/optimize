import * as z from "zod";
export const workshops = [
    "None",
    "Ai in finance (الذكاء الاصطناعي في التمويل)",
    "Ai in robotics (الذكاء الاصطناعي في الربوتات)",
    "Ai in marketing (الذكاء الاصطناعي في التسويق)",
    "Ai in design (الذكاء الاصطناعي في التصميم)",
    "Ai in startups (الذكاء الاصطناعي في الشركات الناشئة)",
    "Steer your career (وجه حياتك المهنية)",
] as const;

export const formSchema = z.object({
    full_name: z.string().nonempty("Required"),
    email: z.string().email().nonempty("Required"),
    occupation: z.string().nonempty("Required"),
    tell_something: z.string().nonempty("Required"),
    how_did_know: z.string().nonempty("Required"),
    best_part: z.string().nonempty("Required"),
    expectation: z.string().nonempty("Required"),
    lunch: z.enum(["yes", "no"]),
    workshop: z.enum(workshops),
    why_choose_you: z.string().nonempty("Required"),
});
