"use client";

import React, { useState, useEffect } from "react";

interface ImagePreviewProps {
  file: File;
  alt: string;
  className?: string;
}

export default function ImagePreview({ file, alt, className }: ImagePreviewProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    // Only create object URL on client side after mount
    const url = URL.createObjectURL(file);
    setImageUrl(url);

    // Cleanup function
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  if (!imageUrl) {
    return (
      <div className={`${className} bg-gray-100 flex items-center justify-center text-xs text-gray-500`}>
        Loading...
      </div>
    );
  }

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt={alt}
        className={className}
      />
    </>
  );
}
