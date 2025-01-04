import { supabase } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query"
import { Facebook, Instagram, Mail, MapPin, Phone } from  "lucide-react"
import Whatsapp from "@/public/whatsapp-svgrepo-com.svg"
import Link from "next/link";

export default function Footer (){

  async function getContactsFn(){
      const { data, error } = await supabase.from('footer').select('*');
  
      if (error){
        console.log('supabase error', error)
        return null;
      }
      return data;
    }
  const { data, isLoading, error } = useQuery({
    queryKey: ['footer'], queryFn:getContactsFn
  })

  if(isLoading) return <p>Loading...</p>
  if(error) return <p>{error.message}</p>
    return (
        <footer className="bg-gray-900 text-white py-8">
  <div className="grid grid-cols-5 container mx-auto px-4">
  <div>
    <h3 className="font-bold text-lg mb-4">Hubungi Kami</h3>
    <ul className="flex space-x-6">
      <li className="flex items-center">
        <Phone className="mr-2" />
        <p>{data?.[0].whatsapp ? data?.[0].whatsapp : 'No.telp'}</p>
      </li>
      <li className="flex items-center">
        <Mail className="mr-2" />
        <p>{data?.[0].email ? data?.[0].email : 'Email'}</p>
      </li>
      <li className="flex items-center">
        <MapPin className="mr-2" />
        <p>{data?.[0].alamat ? data?.[0].alamat : 'Alamat'}</p>
      </li>
    </ul>
  </div>

  <div className="col-start-3">
  <h3 className="font-bold text-lg mb-4">Sosial Media Kami</h3>
  <ul className="flex space-x-6">
      <li className="flex items-center">
      <Link href="https://facebook.com/komeng.anglo/">
      <Facebook 
      width={40}
      height={40}
      className="cursor-pointer"
      />
      </Link>
      </li>
      <li className="flex items-center">
      <Link href="https://wa.me/6285643141235">
      <Phone 
      width={40}
      height={40}
      className="cursor-pointer"
      />
      </Link>
      </li>
      <li className="flex items-center">
      <Link href="https://instagram.com/iwake_lukman_beji">
      <Instagram 
      width={40}
      height={40}
      className="cursor-pointer"
      />
      </Link>
      </li>
    </ul>
  

  

  
  </div>
  
  <div className="mapouter col-start-5">
  <div className="gmap_canvas">
    <iframe
      className="gmap_iframe"
      src="https://maps.google.com/maps?width=300&height=200&hl=en&q=pasar ikan desa beji&t=&z=14&ie=UTF8&iwloc=B&output=embed"
    />
    <a href="https://sprunkin.com/">Sprunki Incredibox</a>
  </div>
  <style
    dangerouslySetInnerHTML={{
      __html:
        ".mapouter{position:relative;text-align:right;width:300px;height:200px;}.gmap_canvas {overflow:hidden;background:none!important;width:300px;height:200px;}.gmap_iframe {width:300px!important;height:200px!important;}"
    }}
  />
</div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            © 2024 Pasar Ikan Desa Beji. All rights reserved.
          </div>
      </footer>
    )
}