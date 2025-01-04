"use client";
import { Button } from "@/components/ui/button";
import { DropzoneProps } from "@/utils/types/types";
import { CSSProperties, InputHTMLAttributes, JSX, useEffect, useState } from "react";
import { Minus } from "lucide-react";

export default function Dropzone({ error, onFileChange }: DropzoneProps) {
  const [preview, setPreview] = useState<undefined | string>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      onFileChange(file); // Pass file up to parent
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const labelStyle: CSSProperties = {
    objectFit:"cover"
  }

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);
  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="relative group border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-700">
        <div className="aspect-square overflow-hidden rounded-lg">
          {preview ? (
            <>
            <label
              className="cursor-pointer absolute inset-0 flex items-center justify-center w-full p-4 none hover:visible; gap-2 z-10"
              style={{aspectRatio: "200/200"}}
              onClick={()=>setPreview(undefined)}
              >
              <Minus color="#ffffff"/>
              {<span className="text-sm font-medium text-white">Click to remove</span>}
            </label>
            <div className="brightness-50 opacity-80">
            <img
              src={preview}
              width={200}
              height={200}
              alt="Thumbnail"
              style={{ aspectRatio: "200/200", objectFit: "cover" }}
              />
            </div>
              </>

          ) : (
            <label
              htmlFor="file"
              className="cursor-pointer absolute inset-0 z-10 flex items-center justify-center w-full p-4 gap-2"
            >
              <UploadIcon className="w-8 h-8" />
              {<span className="text-sm font-medium">Click to replace</span>}
            </label>
          )}
        </div>
        <input
          type="file"
          className="sr-only"
          id="file"
          name="img_path"
          onChange={handleFileChange}
        />
      </div>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}

function UploadIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}
