// import { toast } from "@/components/hooks/use-toast"
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useForm } from "@tanstack/react-form";
import { supabase } from "@/utils/supabase/client";
import Dropzone from "@/components/ui/dropzone";
import { Textarea } from "@/components/ui/textarea";
export default function HeroDashboard() {
  const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
  ];

  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const form = useForm({
    defaultValues: {
      img_path: undefined as File | undefined,
      nama_penjual: "",
      nama_produk: "",
      harga: "",
      no_whatsapp: "",
    },
    onSubmit: async ({ value }) => {
      try {
        const { img_path, nama_penjual, nama_produk, harga, no_whatsapp } = value;
        let imageUrl = null;

        // Handle file upload if image is present
        if (img_path) {
          console.log("Attempting to upload file:", img_path.name);

          const { data: uploadData, error: uploadError } =
            await supabase.storage
              .from("tplm")
              .upload(`hero/${img_path.name}`, img_path);

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
          nama_penjual, nama_produk, harga, no_whatsapp
        });

        // Database operation
        const { data: upsertData, error: upsertError } = await supabase
          .from("penjual")
          .insert({
            img_path: imageUrl,
            nama_penjual, 
            nama_produk, 
            harga, 
            no_whatsapp
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
      <h1 className="text-bold text-xl m-4">Tambah Penjual</h1>
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
                Avatar
              </Label>
              <Dropzone onFileChange={field.handleChange} />
              {field.state.meta.errors ? (
                <p className="col-start-4 gap-4 text-red-500 text-xs">{field.state.meta.errors.join(",")}</p>
              ) : null}
            </div>
          )}
        />

        <form.Field
          name="nama_penjual"
          validators={{
            onChange: ({ value }) =>
              !value
                ? "Field tidak boleh kosong"
                : value.length < 3
                ? "Tidak boleh kurang dari 3 karakter"
                : undefined,
          }}
          children={(field) => (
            <div className="grid grid-cols-6 w-full items-center gap-1.5 my-4">
              <Label htmlFor="picture" className="">Nama Penjual</Label>
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
          name="nama_penjual"
          validators={{
            onChange: ({ value }) =>
              !value
                ? "Field tidak boleh kosong"
                : value.length < 3
                ? "Tidak boleh kurang dari 3 karakter"
                : undefined,
          }}
          children={(field) => (
            <div className="grid grid-cols-6 w-full items-center gap-1.5 my-4">
              <Label htmlFor={field.name}>Nama Penjual</Label>
              <Input
                id={field.name}
                className="cols-span-4 w-80"
                type="text"
                name={field.name}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors ? (
                <p className="cols-span-1 col-start-4 gap-4 text-red-500 text-xs">{field.state.meta.errors.join(",")}</p>
              ) : null}
            </div>
          )}
        />
        <form.Field
          name="nama_produk"
          validators={{
            onChange: ({ value }) =>
              !value
                ? "Field tidak boleh kosong"
                : value.length < 3
                ? "Tidak boleh kurang dari 3 karakter"
                : undefined,
          }}
          children={(field) => (
            <div className="grid grid-cols-6 w-full items-center gap-1.5 my-4">
              <Label htmlFor={field.name}>Nama Produk</Label>
              <Input
                id={field.name}
                className="cols-span-4 w-80"
                type="text"
                name={field.name}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors ? (
                <p className="cols-span-1 col-start-4 gap-4 text-red-500 text-xs">{field.state.meta.errors.join(",")}</p>
              ) : null}
            </div>
          )}
        />
        <form.Field
          name="harga"
          validators={{
            onChange: ({ value }) =>
              !value
                ? "Field tidak boleh kosong"
                : value.length < 3
                ? "Tidak boleh kurang dari 3 karakter"
                : undefined,
          }}
          children={(field) => (
            <div className="grid grid-cols-6 w-full items-center gap-1.5 my-4">
              <Label htmlFor={field.name}>Harga</Label>
              <Input
                id={field.name}
                className="cols-span-4 w-80"
                type="text"
                name={field.name}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors ? (
                <p className="cols-span-1 col-start-4 gap-4 text-red-500 text-xs">{field.state.meta.errors.join(",")}</p>
              ) : null}
            </div>
          )}
        />
        <form.Field
          name="no_whatsapp"
          validators={{
            onChange: ({ value }) =>
              !value
                ? "Field tidak boleh kosong"
                : value.length < 3
                ? "Tidak boleh kurang dari 3 karakter"
                : undefined,
          }}
          children={(field) => (
            <div className="grid grid-cols-6 w-full items-center gap-1.5 my-4">
              <Label htmlFor={field.name}>No. Whatsapp</Label>
              <Input
                id={field.name}
                className="cols-span-4 w-80"
                type="text"
                name={field.name}
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
