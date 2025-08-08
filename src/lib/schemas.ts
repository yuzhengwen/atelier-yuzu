import { z } from "zod";

// Zod validation schema for artwork form
export const artworkFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .max(1000, "Description must be less than 1000 characters")
    .optional(),
  tags: z
    .string()
    .optional()
    .transform((tags) =>
      tags
        ? tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0)
        : []
    )
    .refine((tags) => tags.length <= 10, "Maximum 10 tags allowed")
    .refine(
      (tags) => tags.every((tag) => tag.length >= 2),
      "Each tag must be at least 2 characters"
    ),
  mainImage: z
    .array(z.instanceof(File))
    .length(1, "Exactly one main image is required")
    .refine(
      (files) => files.every((file) => file.size <= 5 * 1024 * 1024), // 5MB limit
      "Main image must be less than 5MB"
    )
    .refine(
      (files) => files.every((file) => file.type.startsWith("image/")),
      "Only image files are allowed for main image"
    ),
  additionalImages: z
    .array(
      z.object({
        file: z
          .instanceof(File)
          .refine(
            (file) => file.size <= 5 * 1024 * 1024,
            "Each image must be less than 5MB"
          )
          .refine(
            (file) => file.type.startsWith("image/"),
            "Only image files are allowed"
          ),
        alt: z
          .string()
          .min(1, "Alt description is required")
          .max(200, "Alt description must be less than 200 characters"),
      })
    )
    .max(5, "Maximum 5 additional images allowed")
    .optional(),
});

export type ArtworkFormData = z.infer<typeof artworkFormSchema>;
