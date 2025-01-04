"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { supabase } from "@/utils/supabase/client";

import { useForm } from "@tanstack/react-form"

export default function Contacts () {
    const form = useForm({
        defaultValues:{
            whatsapp: '',
            facebook: '',
            youtube: '',
            email: '',
            alamat: ''
        },
        onSubmit: async ({ value }) => {
              const { whatsapp, facebook, youtube, email, alamat } = value;
              const { error } = await supabase
                .from("footer")
                .insert({ whatsapp, facebook, youtube, email, alamat });
        
              error ? console.log("supabase error", error) : console.log({whatsapp, facebook, youtube});
        }
    })
    return (
        <div className="rounded-xl border bg-white text-card-foreground shadow-md col-span-4 m-8">
            <h1 className="text-bold text-xl">Footer Section</h1>
            <form onSubmit={
      (e)=>{
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }} 
      className="m-4">
       <form.Field
          name="whatsapp"
          children={(field) => (
            <div className="grid grid-cols-6 w-full items-center gap-1.5 my-4">
              <Label htmlFor={field.name} className="">Nomor Whatsapp</Label>
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
          name="facebook"
          children={(field) => (
            <div className="grid grid-cols-6 w-full items-center gap-1.5 my-4">
              <Label htmlFor={field.name} className="">Link Facebook</Label>
              <Input
                id={field.name}
                className="cols-span-4 w-80"
                type="url"
                pattern="https://.*"
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
          name="youtube"
          children={(field) => (
            <div className="grid grid-cols-6 w-full items-center gap-1.5 my-4">
              <Label htmlFor={field.name} className="">Link Youtube</Label>
              <Input
                id={field.name}
                className="cols-span-4 w-80"
                type="url"
                pattern="https://.*"
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
          name="email"
          children={(field) => (
            <div className="grid grid-cols-6 w-full items-center gap-1.5 my-4">
              <Label htmlFor={field.name} className="">Email</Label>
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
          name="alamat"
          children={(field) => (
            <div className="grid grid-cols-6 w-full items-center gap-1.5 my-4">
              <Label htmlFor={field.name} className="">Alamat</Label>
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