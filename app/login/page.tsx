// import { FcGoogle } from "react-icons/fc";
"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "./actions";
import { useForm } from "@tanstack/react-form";
import { supabase } from "@/utils/supabase/client";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function Login () {
const router = useRouter();
const form = useForm({
  defaultValues:{
    email:'',
    password:''
  },

  onSubmit:async({value})=>{
    try {
      const { error } = await supabase.auth.signInWithPassword(value);
      router.push('/dashboard/hero');
    } catch (error) {
      form.reset()
      console.log(error)
    }

  },
  onSubmitInvalid:()=> (<p>Email atau password salah</p>)
  
})

  return (
    <section className="flex h-screen w-full items-center justify-center px-4 py-32">
      <div className="container">
        <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        >

        <div className="flex flex-col gap-4">
          <div className="mx-auto w-full max-w-sm rounded-md p-6 shadow">
            <div className="mb-6 flex flex-col items-center">
              <img
                src="https://shadcnblocks.com/images/block/block-1.svg"
                alt="logo"
                className="mb-7 h-10 w-auto"
              />
              <p className="mb-2 text-2xl font-bold">Login Admin</p>
              <p className="text-muted-foreground">
                Masuk sebagai admin
              </p>
            </div>
            <div>
            <form.Field 
            name="email"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "Email tidak boleh kosong"
                  : value.length < 3
                  ? "Tidak boleh kurang dari 3 karakter"
                  : undefined,
            }}
            children={(field) => (
              <div>
              <Label >Email</Label>
              <Input id={field.name} type="email" name={field.name} placeholder="Masukkan email" required onChange={(e) => field.handleChange(e.target.value)}/>
              </div>
            )}
            />
 
              <div className="grid gap-4">

            <form.Field 
            name="password"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "Password tidak boleh kosong"
                  : value.length < 3
                  ? "Tidak boleh kurang dari 3 karakter"
                  : undefined,
            }}
            children={(field) => (
              <div>
                <Label>Password</Label>
                  <Input
                  id={field.name} 
                  type="password"
                  name={field.name}
                  placeholder="Masukkan password"
                  onChange={(e) => field.handleChange(e.target.value)}
                    required
                  />
{field.state.meta.errors ? (
                <p className="mt-1 text-sm text-muted-foreground">{field.state.meta.errors.join(",")}</p>
              ) : null}
                </div>
            )}
            />
                <Button type="submit" className="mt-2 w-full font-white">
                  Masuk
                </Button>
              </div>
            </div>
          </div>
        </div>
        </form>
      </div>
    </section>
  );
};