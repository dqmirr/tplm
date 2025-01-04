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
export default function HeroDashboard() {
  
  const form = useForm({
    defaultValues: {
      heading: "",
      description: "",
    },
    onSubmit: async ({ value }) => {
      try {
        const {  heading, description } = value;

        // Handle file upload if image is present
        // Database operation
        const { data: upsertData, error: upsertError } = await supabase
          .from("hero")
          .upsert({
            heading,
            desc: description,
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
      <h1 className="text-bold text-xl m-4">Hero Section</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="m-4"
      >

        <form.Field
          name="heading"
          validators={{
            onChange: ({ value }) =>
              !value
                ? "Heading tidak boleh kosong"
                : value.length < 3
                ? "Tidak boleh kurang dari 3 karakter"
                : undefined,
          }}
          children={(field) => (
            <div className="grid grid-cols-6 w-full items-center gap-1.5 my-4">
              <Label htmlFor="picture" className="">Heading</Label>
              <Input
                id={field.name}
                className="cols-span-4 w-80"
                type="text"
                name={field.name}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors ? (
                <p className="col-start-4 gap-4 text-red-500 text-xs">{field.state.meta.errors.join(",")}</p>
              ) : null}
            </div>
          )}
        />

        <form.Field
          name="description"
          validators={{
            onChange: ({ value }) =>
              !value
                ? "Deskripsi tidak boleh kosong"
                : value.length < 3
                ? "Tidak boleh kurang dari 3 karakter"
                : undefined,
          }}
          children={(field) => (
            <div className="grid grid-cols-6 w-full items-center gap-1.5 my-4">
              <Label htmlFor={field.name}>Deskripsi</Label>
              <Textarea
                id={field.name}
                name={field.name}
                className="cols-span-4 w-80"
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors ? (
                <p className="cols-span-1 col-start-4 gap-4 text-red-500 text-xs">{field.state.meta.errors.join(",")}</p>
              ) : null}
            </div>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
