"use client";
import React, { useState } from "react";
import { z } from "zod";
import MyDropzone from "./dropzone/MyDropzone"; // Adjust the import path as necessary

// Advanced validation schema with custom rules
const advancedFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters")
    .refine(
      (title: string) => title.trim().length >= 3,
      "Title must be at least 3 characters (excluding spaces)"
    ),
    
  description: z
    .string()
    .max(1000, "Description must be less than 1000 characters")
    .optional(),
    
  category: z.enum(["digital", "traditional", "photography", "mixed"]),
  
  tags: z
    .string()
    .optional()
    .transform((tags: string | undefined) => tags ? tags.split(",").map((tag: string) => tag.trim()).filter((tag: string) => tag.length > 0) : [])
    .refine(
      (tags: string[]) => tags.length <= 10,
      "Maximum 10 tags allowed"
    )
    .refine(
      (tags: string[]) => tags.every((tag: string) => tag.length >= 2),
      "Each tag must be at least 2 characters"
    ),
    
  price: z
    .string()
    .optional()
    .transform((price: string | undefined) => price ? parseFloat(price) : undefined)
    .refine(
      (price: number | undefined) => price === undefined || (price >= 0 && price <= 10000),
      "Price must be between $0 and $10,000"
    ),
    
  files: z.array(z.instanceof(File))
    .min(1, "At least one image is required")
    .max(5, "Maximum 5 files allowed")
    .refine(
      (files: File[]) => files.every((file: File) => file.size <= 5 * 1024 * 1024),
      "Each file must be less than 5MB"
    )
    .refine(
      (files: File[]) => files.every((file: File) => file.type.startsWith('image/')),
      "Only image files are allowed"
    ),
    
  agreeToTerms: z.boolean().refine((val: boolean) => val === true, "You must agree to the terms and conditions"),
});

interface FormErrors {
  [key: string]: string;
}

export default function AdvancedValidationExample() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
    price: "",
    files: [] as File[],
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const finalValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({ ...prev, [name]: finalValue }));
    
    if (submitSuccess) setSubmitSuccess(false);
    
    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleFilesChange = (files: File[]) => {
    setFormData(prev => ({ ...prev, files }));
    
    if (submitSuccess) setSubmitSuccess(false);
    
    // Clear files error when user selects files
    if (errors.files) {
      setErrors(prev => ({ ...prev, files: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSubmitSuccess(false);

    try {
      // Transform form data for validation
      const dataToValidate = {
        ...formData,
        category: formData.category || undefined,
      };

      const validatedData = advancedFormSchema.parse(dataToValidate);
      
      console.log("Validated Data:", validatedData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      setSubmitSuccess(true);
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        tags: "",
        price: "",
        files: [],
        agreeToTerms: false,
      });

    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: FormErrors = {};
        
        error.issues.forEach(issue => {
          const field = issue.path[0] as string;
          if (!fieldErrors[field]) {
            fieldErrors[field] = issue.message;
          }
        });
        
        setErrors(fieldErrors);
      } else {
        setErrors({ general: "An unexpected error occurred. Please try again." });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if form is valid without submitting
  const isFormValid = advancedFormSchema.safeParse({
    ...formData,
    category: formData.category || undefined,
  }).success;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Advanced Form Validation</h1>
      <p className="text-gray-600 mb-8">
        This form demonstrates advanced Zod validation with real-time feedback and custom validation rules.
      </p>

      {submitSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
          🎉 Artwork submitted successfully!
        </div>
      )}

      {errors.general && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title field */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title * <span className="text-xs text-gray-500">(min 3 chars, max 100)</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter artwork title"
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.title ? 'border-red-500 bg-red-50' : 
              formData.title.length >= 3 ? 'border-green-500' : 'border-gray-300'
            }`}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          {formData.title.length > 0 && !errors.title && formData.title.length >= 3 && (
            <p className="text-green-500 text-sm mt-1">✓ Title looks good!</p>
          )}
        </div>

        {/* Category selection */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-2">
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.category ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          >
            <option value="">Select a category</option>
            <option value="digital">Digital Art</option>
            <option value="traditional">Traditional Art</option>
            <option value="photography">Photography</option>
            <option value="mixed">Mixed Media</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>

        {/* File upload */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Upload Images * <span className="text-xs text-gray-500">(1-5 files, max 5MB each)</span>
          </label>
          <MyDropzone
            onFilesChange={handleFilesChange}
            accept={{
              "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
            }}
            maxFiles={5}
            multiple={true}
            placeholder="Drag & drop your artwork images here"
            showFileList={true}
            className={`border-2 border-dashed hover:border-gray-400 ${
              errors.files ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          />
          {errors.files && <p className="text-red-500 text-sm mt-1">{errors.files}</p>}
        </div>

        {/* Terms agreement */}
        <div>
          <label className="flex items-start space-x-2">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              className="mt-1"
            />
            <span className="text-sm">
              I agree to the terms and conditions *
            </span>
          </label>
          {errors.agreeToTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting || !isFormValid}
          className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
            isSubmitting || !isFormValid
              ? 'bg-gray-400 cursor-not-allowed text-gray-600'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Artwork'}
        </button>
      </form>

      {/* Validation status */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">Form Status:</h3>
        <p>Valid: <span className={isFormValid ? 'text-green-600' : 'text-red-600'}>
          {isFormValid ? '✓ Yes' : '✗ No'}
        </span></p>
        <p>Files: {formData.files.length}</p>
        <p>Total file size: {(formData.files.reduce((acc, file) => acc + file.size, 0) / (1024 * 1024)).toFixed(2)} MB</p>
      </div>
    </div>
  );
}
