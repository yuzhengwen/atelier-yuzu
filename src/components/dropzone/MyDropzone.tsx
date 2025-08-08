"use client";
import React, { useCallback, CSSProperties, useMemo } from "react";
import { useDropzone, Accept } from "react-dropzone";

interface MyDropzoneProps {
  onFilesChange?: (files: File[]) => void;
  onFileContentsChange?: (fileContents: { name: string; content: string | ArrayBuffer | null }[]) => void;
  accept?: Accept;
  maxFiles?: number;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  placeholder?: string;
  showFileList?: boolean;
  readAs?: 'text' | 'dataURL' | 'arrayBuffer';
}

const baseStyle: CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  cursor: "pointer",
};

const focusedStyle: CSSProperties = {
  borderColor: "#2196f3",
};

const acceptStyle: CSSProperties = {
  borderColor: "#00e676",
};

const rejectStyle: CSSProperties = {
  borderColor: "#ff1744",
};

const disabledStyle: CSSProperties = {
  opacity: 0.6,
  cursor: "not-allowed",
};

function MyDropzone({
  onFilesChange,
  onFileContentsChange,
  accept = { "image/*": [] },
  maxFiles,
  multiple = true,
  disabled = false,
  className,
  style: customStyle,
  placeholder = "Drag & drop some files here, or click to select files",
  showFileList = true,
  readAs = 'arrayBuffer'
}: MyDropzoneProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Call the onFilesChange callback with the raw files
    if (onFilesChange) {
      onFilesChange(acceptedFiles);
    }

    // If onFileContentsChange is provided, read the file contents
    if (onFileContentsChange) {
      const filePromises = acceptedFiles.map((file: File) => {
        return new Promise<{ name: string; content: string | ArrayBuffer | null }>((resolve, reject) => {
          const reader = new FileReader();

          reader.onabort = () => {
            console.log("file reading was aborted");
            reject(new Error("File reading was aborted"));
          };
          reader.onerror = () => {
            console.log("file reading has failed");
            reject(new Error("File reading has failed"));
          };
          reader.onload = () => {
            resolve({
              name: file.name,
              content: reader.result
            });
          };

          // Read file based on readAs prop
          switch (readAs) {
            case 'text':
              reader.readAsText(file);
              break;
            case 'dataURL':
              reader.readAsDataURL(file);
              break;
            case 'arrayBuffer':
            default:
              reader.readAsArrayBuffer(file);
              break;
          }
        });
      });

      // Wait for all files to be read and then call the callback
      Promise.all(filePromises)
        .then((fileContents) => {
          onFileContentsChange(fileContents);
        })
        .catch((error) => {
          console.error("Error reading files:", error);
        });
    }
  }, [onFilesChange, onFileContentsChange, readAs]);
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    multiple,
    disabled,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(customStyle || {}),
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
      ...(disabled ? disabledStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject, disabled, customStyle]
  );

  const files = acceptedFiles.map((file) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

  return (
    <>
      <div {...getRootProps({ style, className })}>
        <input {...getInputProps()} />
        <p>{placeholder}</p>
      </div>
      {showFileList && acceptedFiles.length > 0 && (
        <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>
      )}
    </>
  );
}
export default MyDropzone;
