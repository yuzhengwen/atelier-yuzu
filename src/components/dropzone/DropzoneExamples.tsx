"use client";
import React, { useState } from "react";
import MyDropzone from "./MyDropzone";

export default function DropzoneExamples() {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [documentFiles, setDocumentFiles] = useState<File[]>([]);
  const [avatarFile, setAvatarFile] = useState<File[]>([]);

  return (
    <div className="space-y-8 p-6">
      <h2 className="text-2xl font-bold">MyDropzone Examples</h2>

      {/* Example 1: Image Gallery Upload */}
      <div className="border p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">1. Image Gallery Upload</h3>
        <MyDropzone
          onFilesChange={setImageFiles}
          accept={{ "image/*": [".jpeg", ".jpg", ".png", ".gif"] }}
          multiple={true}
          maxFiles={10}
          placeholder="Drop multiple images for your gallery"
          showFileList={true}
        />
        <p className="text-sm text-gray-600 mt-2">
          Selected: {imageFiles.length} images
        </p>
      </div>

      {/* Example 2: Document Upload */}
      <div className="border p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">2. Document Upload</h3>
        <MyDropzone
          onFilesChange={setDocumentFiles}
          accept={{ 
            "application/pdf": [".pdf"],
            "application/msword": [".doc"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
            "text/plain": [".txt"]
          }}
          multiple={true}
          placeholder="Drop PDF, DOC, DOCX, or TXT files"
          showFileList={true}
          style={{ backgroundColor: "#f8f9fa" }}
        />
        <p className="text-sm text-gray-600 mt-2">
          Selected: {documentFiles.length} documents
        </p>
      </div>

      {/* Example 3: Single Avatar Upload */}
      <div className="border p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">3. Avatar Upload (Single File)</h3>
        <MyDropzone
          onFilesChange={setAvatarFile}
          onFileContentsChange={(contents) => {
            console.log("Avatar file content:", contents[0]);
          }}
          accept={{ "image/*": [".jpeg", ".jpg", ".png"] }}
          multiple={false}
          maxFiles={1}
          placeholder="Drop your profile picture"
          showFileList={false}
          readAs="dataURL"
          style={{ 
            maxWidth: "300px", 
            height: "200px",
            backgroundColor: "#e3f2fd"
          }}
        />
        <p className="text-sm text-gray-600 mt-2">
          {avatarFile.length > 0 ? `Selected: ${avatarFile[0].name}` : "No file selected"}
        </p>
      </div>

      {/* Example 4: Read File as Text */}
      <div className="border p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">4. Text File Reader</h3>
        <MyDropzone
          onFileContentsChange={(contents) => {
            contents.forEach(file => {
              console.log(`File: ${file.name}`, file.content);
            });
          }}
          accept={{ "text/*": [".txt", ".csv", ".json"] }}
          multiple={true}
          placeholder="Drop text files to read their content"
          readAs="text"
          showFileList={true}
        />
      </div>

      {/* Example 5: Disabled State */}
      <div className="border p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">5. Disabled Dropzone</h3>
        <MyDropzone
          disabled={true}
          placeholder="This dropzone is disabled"
          showFileList={false}
        />
      </div>

      {/* Example 6: Custom Styled */}
      <div className="border p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">6. Custom Styled</h3>
        <MyDropzone
          placeholder="Custom styled dropzone"
          className="border-4 border-purple-300 bg-purple-50 rounded-xl"
          style={{
            color: "#7c3aed",
            fontWeight: "bold",
            minHeight: "120px"
          }}
        />
      </div>
    </div>
  );
}
