import { ArtworkFormData } from "@/lib/schemas";

export interface FileContent {
  name: string;
  content: string | ArrayBuffer | null;
}

export interface AdditionalImage {
  file: File;
  alt: string;
}

export interface FormData extends ArtworkFormData {
  fileContents: FileContent[];
  tagsInput: string; // For the input field display
  mainImageContent: FileContent[];
  additionalImageContents: FileContent[];
}

export interface FormErrors {
  title?: string;
  description?: string;
  tags?: string;
  mainImage?: string;
  additionalImages?: string;
  general?: string;
}
