// import { toast } from "@/components/hooks/use-toast"
"use client";
import { Button } from "@/components/ui/button";
import Form from "next/form";
import { useRef, useState } from "react";
import {
  // Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useForm } from "@tanstack/react-form";
import { supabase } from "@/utils/supabase/client";
import Dropzone from "@/components/ui/dropzone";
import { ImageDimensions } from "@/utils/types/types";
import { Textarea } from "@/components/ui/textarea";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

export async function getPenjualFn () {

    const { data, error } = await supabase.from("penjual").select()

    if (error){
      console.log('supabase error', error)
      return null;
    }

    return data;
}


export default function PenjualDashboard() {
 const queryClient = new QueryClient();
    const { data, isLoading, error } = useQuery({queryKey: ['penjual'], queryFn: getPenjualFn})
const router = useRouter()

if (isLoading) return <p>Loading...</p>;
if (error) return <p>Error: {error.message}</p>;

console.log(data);

async function handleDelete(id: any){
const { error } = await supabase.from("penjual").delete().eq('id', id);

if(error){
  console.log('supabase error', error)
  return null;
}
}

  return (

    <div className="rounded-xl border bg-white text-card-foreground shadow-md col-span-4 m-8">
      <h1 className="text-bold text-xl m-4">Penjual Section</h1>

      <Button className="m-4" onClick={()=>router.push('/dashboard/tambah_penjual')}>Tambah Penjual </Button>
      <Button className="m-4 bg-red-500" onClick={()=>router.push('/dashboard/tambah_penjual')}>Tambah Penjual </Button>
      
      <DataTable columns={columns} data={data as any[]} />
    </div>
  );
}

