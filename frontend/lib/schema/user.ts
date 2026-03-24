import z from "zod";

export const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  email: z.string().min(1, "Email is required"),
  role: z.string().min(1, "Role is required"),
  phone: z.string().min(1, "Phone is required"),
  address: z.string().min(1, "Address is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  salary: z.string().min(1, "Salary is required"),
  image: z
    .union([z.string().url("Invalid image URL"), z.literal("")])
    .optional(),
});
