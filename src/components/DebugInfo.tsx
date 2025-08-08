"use client";

import React from "react";
import { FormData as ArtworkFormData, FormErrors, AdditionalImage } from "@/types/form";

interface DebugInfoProps {
  formData: ArtworkFormData;
  errors: FormErrors;
  isValid: boolean;
}

export default function DebugInfo({ formData, errors, isValid }: DebugInfoProps) {
  return (
    <div className="mt-8 p-4 bg-gray-100 rounded-lg">
      <h3 className="font-semibold mb-2">Debug Info:</h3>
      <p>Title: {formData.title}</p>
      <p>Main Image: {formData.mainImage.length}</p>
      <p>
        Main Image Name: {formData.mainImage.map((f: File) => f.name).join(", ")}
      </p>
      <p>Additional Images: {formData.additionalImages?.length || 0}</p>
      <p>
        Additional Image Names:{" "}
        {formData.additionalImages?.map((img: AdditionalImage) => img.file.name).join(", ") ||
          "None"}
      </p>
      <p>Tags: [{formData.tags.join(", ")}]</p>
      <p>Tags Input: {formData.tagsInput}</p>
      <p>Valid: {isValid ? "Yes" : "No"}</p>
      {Object.keys(errors).length > 0 && (
        <div className="mt-2">
          <p className="text-red-600 font-medium">Errors:</p>
          <ul className="text-red-600 text-sm">
            {Object.entries(errors).map(([field, error]) => (
              <li key={field}>
                • {field}: {error}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
