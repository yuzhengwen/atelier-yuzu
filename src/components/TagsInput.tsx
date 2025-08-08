"use client";

import React from "react";

interface TagsInputProps {
  tagsInput: string;
  tags: string[];
  onTagsInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTagAdd: () => void;
  onTagRemove: (tag: string) => void;
  error?: string;
}

export default function TagsInput({ 
  tagsInput, 
  tags, 
  onTagsInputChange, 
  onTagAdd, 
  onTagRemove, 
  error 
}: TagsInputProps) {
  return (
    <div>
      <label htmlFor="tags" className="block text-sm font-medium mb-2">
        Tags
      </label>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          id="tags"
          value={tagsInput}
          onChange={onTagsInputChange}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onTagAdd();
            }
          }}
          className={`flex-1 p-2 border rounded-md ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter a tag and press Enter"
        />
        <button
          type="button"
          onClick={onTagAdd}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
          >
            {tag}
            <button
              type="button"
              onClick={() => onTagRemove(tag)}
              className="text-blue-600 hover:text-blue-800"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
