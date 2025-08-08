"use client";

import React from "react";
import MyDropzone from "./dropzone/MyDropzone";
import ImagePreview from "./ImagePreview";
import { AdditionalImage, FileContent } from "@/types/form";

interface AdditionalImagesProps {
  additionalImages?: AdditionalImage[];
  onImagesChange: (files: File[]) => void;
  onImageContentChange?: (fileContents: FileContent[]) => void;
  onAltChange: (index: number, alt: string) => void;
  onRemoveImage: (index: number) => void;
  error?: string;
}

export default function AdditionalImages({
  additionalImages,
  onImagesChange,
  onImageContentChange,
  onAltChange,
  onRemoveImage,
  error,
}: AdditionalImagesProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        Additional Images{" "}
        <span className="text-xs text-gray-500">(optional, max 10)</span>
      </label>
      <MyDropzone
        onFilesChange={onImagesChange}
        onFileContentsChange={onImageContentChange}
        accept={{
          "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
        }}
        maxFiles={10}
        multiple={true}
        placeholder="Drag & drop additional images here"
        showFileList={false}
        className="border-2 border-dashed border-gray-300 hover:border-gray-400"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

      {/* Display additional images with alt text inputs */}
      {additionalImages && additionalImages.length > 0 && (
        <div className="mt-4 space-y-3">
          <h4 className="text-sm font-medium">
            Additional Images ({additionalImages.length}/5):
          </h4>
          {additionalImages.map((img, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 border rounded-lg"
            >
              <div className="flex-shrink-0">
                <ImagePreview
                  file={img.file}
                  alt={img.alt || "Additional image preview"}
                  className="w-16 h-16 object-cover rounded border"
                />
              </div>
              <div className="flex-grow">
                <input
                  type="text"
                  placeholder="Enter alt description for this image"
                  value={img.alt}
                  onChange={(e) => onAltChange(index, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {img.file.name} ({(img.file.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              </div>
              <button
                type="button"
                onClick={() => onRemoveImage(index)}
                className="text-red-500 hover:text-red-700 text-sm hover:cursor-pointer"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
