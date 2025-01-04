"use client"

import { useQuery } from "@tanstack/react-query";
import { DataTable } from "./data-table";
import { supabase } from "@/utils/supabase/client";
import { columns } from "./columns";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function TambahContact (){
  
  const router = useRouter();
  async function getContactsFn(){
    const { data, error } = await supabase.from('footer').select('*');

    if (error){
      console.log('supabase error', error)
      return null;
    }

    return data;
  }
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['contacts'], queryFn: getContactsFn 
  })

  if(isLoading) return <p>Loading...</p>
  if(error) return <p>{error.message}</p>
  return(
    <div className="rounded-xl border bg-white text-card-foreground shadow-md col-span-4 m-8">
    <h1 className="text-bold text-xl m-4">Data Kontak</h1>

    <Button className="m-4" onClick={()=>router.push('/dashboard/tambah_contacts')}>Tambah Kontak</Button>
    {/* <Button className="m-4 bg-red-500" onClick={()=>router.push('/dashboard/tambah_penjual')}>Tambah Penjual </Button> */}
    
    <DataTable columns={columns} data={data as any[]} />
  </div>
  )
}