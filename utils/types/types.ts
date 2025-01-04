export type Carousels = {
    id: number,
    image_path: string,
    createdAt: Date
}

export interface ImageDimensions {
    width: number; 
    height: number; 
}

export type DropzoneProps= {
  onFileChange: (file: File | undefined ) => void;
  error?: string | null;
}

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];

export const MAX_FILE_SIZE = 5 * 1024 * 1024;
