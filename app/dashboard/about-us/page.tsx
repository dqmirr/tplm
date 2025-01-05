"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useForm } from "@tanstack/react-form";
import { supabase } from "@/utils/supabase/client";
import Dropzone  from "@/components/ui/dropzone"
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/utils/types/types";

export default function AboutUsDashboard(){
        const form = useForm({
            defaultValues:{
                tentang_kami:'',
                img_path:undefined as File | undefined,
            },
            onSubmit: async ({ value }) => {
                try {
                    const { img_path, tentang_kami } = value;
                    // let imageUrl = null;
            
                    // // Handle file upload if image is present
                    // if (img_path) {
                    //   console.log("Attempting to upload file:", img_path.name);
            
                    //   const { data: uploadData, error: uploadError } =
                    //     await supabase.storage
                    //       .from("tplm")
                    //       .upload(`about-us/${img_path.name}`, img_path);
            
                    //   if (uploadError) {
                    //     console.log('path', uploadData)
                    //     console.error("Upload error details:", uploadError);
                    //     throw uploadError;
                    //   }
            
                    //   console.log("File upload successful:", uploadData);
                    //   imageUrl = uploadData?.path;
                    // }
            
                    // // Log the data being sent to the database
                    // console.log("Attempting to save to database:", {
                    //   img_path: imageUrl,
                    //   tentang_kami
                    // });
            
                    // Database operation
                    const { data: upsertData, error: upsertError } = await supabase
                      .from("tentang-kami")
                      .update({
                        // img_path: imageUrl,
                        tentang_kami
                      })
                      .eq('id', 1)
                      .single();
            
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
            }
        });

    return(
        <div className="rounded-xl border bg-white text-card-foreground shadow-md col-span-4 m-8">
            <h1 className="text-bold text-xl">Tentang Kami Section</h1>
            <form onSubmit={
      (e)=>{
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }} 
      className="m-4">
       {/* <form.Field
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
                Gambar
              </Label>
              <Dropzone onFileChange={field.handleChange} />
              {field.state.meta.errors ? (
                <p className="col-start-4 gap-4 text-red-500 text-xs">{field.state.meta.errors.join(",")}</p>
              ) : null}
            </div>
          )}
        /> */}
       <form.Field
          name="tentang_kami"
          children={(field) => (
            <div className="grid grid-cols-6 w-full items-center gap-1.5 my-4">
              <Label htmlFor={field.name} className="">Tentang Kami</Label>
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
        <Button id="submit" type="submit" name="submit" >Submit</Button>
      </form>
      </div>
    )
}