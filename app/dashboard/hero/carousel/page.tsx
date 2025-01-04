// import { toast } from "@/components/hooks/use-toast"
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useForm } from "@tanstack/react-form";
import { supabase } from "@/utils/supabase/client";
import Dropzone from "@/components/ui/dropzone";
// import { ImageDimensions } from "@/utils/types/types";
import { Textarea } from "@/components/ui/textarea";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/utils/types/types";
export default function CarouselDashboard() {
  
  const form = useForm({
    defaultValues: {
      img_path: undefined as File | undefined,
    },
    onSubmit: async ({ value }) => {
      try {
        const { img_path, } = value;
        let imageUrl = null;

        // Handle file upload if image is present
        if (img_path) {
          console.log("Attempting to upload file:", img_path.name);

          const { data: uploadData, error: uploadError } =
            await supabase.storage
              .from("tplm")
              .upload(`carousel/${img_path.name}`, img_path);

          if (uploadError) {
            console.error("Upload error details:", uploadError);
            throw uploadError;
          }

          console.log("File upload successful:", uploadData);
          imageUrl = uploadData?.path;
        }

        // Log the data being sent to the database
        console.log("Attempting to save to database:", {
          img_path: imageUrl,
        });

        // Database operation
        const { data: upsertData, error: upsertError } = await supabase
          .from("hero")
          .insert({
            img_path: imageUrl,
          })
          .select();

        if (upsertError) {
          console.error("Database error details:", upsertError);
          throw upsertError;
        }

        console.log("Database operation successful:", upsertData);

        // Clear form after successful submission
        form.reset();
      } catch (error) {
        // Log the full error object
        console.error("Full error object:", error);

        // Type check the error to handle different error types
        if (error instanceof Error) {
          console.error("Error name:", error.name);
          console.error("Error message:", error.message);
          console.error("Error stack:", error.stack);
        }
      }
    },
  });

  return (
    <div className="rounded-xl border bg-white text-card-foreground shadow-md col-span-4 m-8">
      <h1 className="text-bold text-xl m-4">Carousel Section</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="m-4"
      >
        <form.Field
          name="img_path"
          validators={{
            onChange: ({ value }) => {
              if (!value) {
                return "Gambar tidak boleh kosong";
              }

              if (!ACCEPTED_IMAGE_TYPES.includes(value.type)) {
                return "file harus memiliki format gambar (JPEG, PNG, WebP or GIF)";
              }

              // Check file size
              if (value.size > MAX_FILE_SIZE) {
                return "ukuran file tidak bisa lebih dari 5MB";
              }

              return undefined;
            },
          }}
          children={(field) => (
            <div className="grid grid-cols-6 w-full items-center gap-1.5 my-4 my-4">
              <Label htmlFor="picture" className="">
                Carousel
              </Label>
              <Dropzone onFileChange={field.handleChange} />
              {field.state.meta.errors ? (
                <p className="col-start-4 gap-4 text-red-500 text-xs">{field.state.meta.errors.join(",")}</p>
              ) : null}
            </div>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
