import { useState } from "react";
import { z } from "zod";
import { FormData, FormErrors, FileContent } from "@/types/form";
import { artworkFormSchema } from "@/lib/schemas";

export function useArtworkForm() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    tags: [],
    tagsInput: "",
    mainImage: [],
    additionalImages: [],
    fileContents: [],
    mainImageContent: [],
    additionalImageContents: [],
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "tags") {
      // Handle tags input field
      setFormData((prev) => ({
        ...prev,
        tagsInput: value,
        tags: value
          ? value
              .split(",")
              .map((tag) => tag.trim())
              .filter((tag) => tag.length > 0)
          : [],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear field error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleMainImageChange = (files: File[]) => {
    setFormData((prev) => ({
      ...prev,
      mainImage: files,
    }));

    // Clear main image error when user selects files
    if (errors.mainImage) {
      setErrors((prev) => ({
        ...prev,
        mainImage: undefined,
      }));
    }
  };

  const handleMainImageContentsChange = (fileContents: FileContent[]) => {
    setFormData((prev) => ({
      ...prev,
      mainImageContent: fileContents,
    }));
  };

  const handleAdditionalImageAdd = (files: File[]) => {
    if (files.length > 0) {
      const newImages = files.map((file) => ({ file, alt: "" }));
      setFormData((prev) => ({
        ...prev,
        additionalImages: [
          ...(prev.additionalImages || []),
          ...newImages,
        ].slice(0, 5), // Max 5 additional images
      }));
    }
  };

  const handleAdditionalImageAltChange = (index: number, alt: string) => {
    setFormData((prev) => ({
      ...prev,
      additionalImages:
        prev.additionalImages?.map((img, i) =>
          i === index ? { ...img, alt } : img
        ) || [],
    }));

    // Clear additional images error when user updates alt text
    if (errors.additionalImages) {
      setErrors((prev) => ({
        ...prev,
        additionalImages: undefined,
      }));
    }
  };

  const handleAdditionalImageRemove = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      additionalImages:
        prev.additionalImages?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleTagsInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      tagsInput: value,
    }));
  };

  const handleTagAdd = () => {
    const newTag = formData.tagsInput.trim();
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag],
        tagsInput: "",
      }));
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleAdditionalImageContentChange = (fileContents: FileContent[]) => {
    setFormData((prev) => ({
      ...prev,
      additionalImageContents: fileContents,
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      tags: [],
      tagsInput: "",
      mainImage: [],
      additionalImages: [],
      fileContents: [],
      mainImageContent: [],
      additionalImageContents: [],
    });
    setErrors({});
  };

  const validateForm = () => {
    const dataToValidate = {
      title: formData.title,
      description: formData.description,
      tags: formData.tagsInput,
      mainImage: formData.mainImage,
      additionalImages: formData.additionalImages,
    };

    return artworkFormSchema.safeParse(dataToValidate);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const dataToValidate = {
        title: formData.title,
        description: formData.description,
        tags: formData.tagsInput,
        mainImage: formData.mainImage,
        additionalImages: formData.additionalImages,
      };

      const validatedData = artworkFormSchema.parse(dataToValidate);

      console.log("Validated Form Data:", validatedData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert(
        `Successfully submitted: ${validatedData.title} with main image and ${
          validatedData.additionalImages?.length || 0
        } additional images`
      );

      resetForm();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: FormErrors = {};

        error.issues.forEach((issue) => {
          const field = issue.path[0] as keyof FormErrors;
          if (field && !fieldErrors[field]) {
            fieldErrors[field] = issue.message;
          }
        });

        setErrors(fieldErrors);
      } else {
        setErrors({
          general: "An unexpected error occurred. Please try again.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Compute isValid
  const validation = validateForm();
  const isValid = validation.success;

  return {
    formData,
    errors,
    isSubmitting,
    isValid,
    handleInputChange,
    handleMainImageChange,
    handleMainImageContentsChange,
    handleMainImageContentChange: handleMainImageContentsChange, // Alias for compatibility
    handleTagsInputChange,
    handleTagAdd,
    handleTagRemove,
    handleAdditionalImageAdd,
    handleAdditionalImagesChange: handleAdditionalImageAdd, // Alias for compatibility
    handleAdditionalImageContentChange,
    handleAdditionalImageAltChange,
    handleAdditionalImageRemove,
    handleRemoveAdditionalImage: handleAdditionalImageRemove, // Alias for compatibility
    handleSubmit,
    validateForm,
    resetForm,
  };
}
