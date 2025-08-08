"use client";

import { useState } from "react";
import MyDropzone from "@/components/dropzone/MyDropzone";
import AdditionalImages from "@/components/AdditionalImages";
import TagsInput from "@/components/TagsInput";
import DebugInfo from "@/components/DebugInfo";
import ImagePreview from "@/components/ImagePreview";
import { useArtworkForm } from "@/hooks/useArtworkForm";

export default function Upload() {
  const {
    formData,
    errors,
    isValid,
    handleInputChange,
    handleMainImageChange,
    handleMainImageContentChange,
    handleTagsInputChange,
    handleTagAdd,
    handleTagRemove,
    handleAdditionalImagesChange,
    handleAdditionalImageContentChange,
    handleAdditionalImageAltChange,
    handleRemoveAdditionalImage,
    handleSubmit,
  } = useArtworkForm();

  const [showDebug, setShowDebug] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Upload Your Artwork
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Main Image Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Artwork Image *
              </label>
              <MyDropzone
                onFilesChange={handleMainImageChange}
                onFileContentsChange={handleMainImageContentChange}
                accept={{ "image/*": [".png", ".jpg", ".jpeg", ".gif"] }}
                maxFiles={1}
              />
              {errors.mainImage && (
                <p className="mt-1 text-sm text-red-600">{errors.mainImage}</p>
              )}
              {formData.mainImage[0] && (
                <div className="mt-4">
                  <ImagePreview 
                    file={formData.mainImage[0]} 
                    alt="Main artwork preview"
                    className="max-w-md mx-auto" 
                  />
                </div>
              )}
            </div>

            {/* Title Field */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Artwork Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter the title of your artwork"
                required
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            {/* Description Field */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description || ""}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe your artwork, inspiration, techniques used..."
                required
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
            </div>

            {/* Tags Section */}
            <div>
              <TagsInput
                tagsInput={formData.tagsInput}
                tags={formData.tags}
                onTagsInputChange={handleTagsInputChange}
                onTagAdd={handleTagAdd}
                onTagRemove={handleTagRemove}
                error={errors.tags}
              />
            </div>

            {/* Additional Images Section */}
            <div>
              <AdditionalImages
                additionalImages={formData.additionalImages || []}
                onImagesChange={handleAdditionalImagesChange}
                onImageContentChange={handleAdditionalImageContentChange}
                onAltChange={handleAdditionalImageAltChange}
                onRemoveImage={handleRemoveAdditionalImage}
                error={errors.additionalImages}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-between items-center pt-6">
              <button
                type="button"
                onClick={() => setShowDebug(!showDebug)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                {showDebug ? "Hide" : "Show"} Debug Info
              </button>
              
              <button 
                type="submit" 
                disabled={!isValid}
                className={`px-8 py-2 font-medium rounded-md ${
                  isValid
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Upload Artwork
              </button>
            </div>
          </form>

          {/* Debug Section */}
          {showDebug && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <DebugInfo formData={formData} errors={errors} isValid={isValid} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
