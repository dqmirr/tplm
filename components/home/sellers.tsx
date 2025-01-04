import { ChevronRight, Star } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { sellers } from "@/database/db";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase/client";
import { Penjual } from "@/app/dashboard/penjual/columns";

export default function Sellers () {
  const [selectedSeller, setSelectedSeller] = useState<any>();
  const [ sellersData, setSellersData ] = useState<any[] | null>();
  const [ avatar, setAvatar ] = useState<string>();

  async function getPenjualFn(){
    const { data, error } = await supabase
    .from("penjual") // Replace with your table name
    .select("id, nama_penjual, no_whatsapp, img_path, produk(penjual_id, harga, nama_produk)"); // Replace with your user ID and avatar column names

  if (error) {
    throw new Error(error.message);
  }

  if (!data || data.length === 0) {
    throw new Error("No users found");
  }

  // Generate public URLs for all avatar paths
  return data.map((penjual) => {
    const { data: publicUrlData } = supabase.storage
      .from("avatars") // Replace with your bucket name
      .getPublicUrl(penjual.img_path);

    const penjualDatas: Penjual = {
    id: penjual.id,
    nama_penjual: penjual.nama_penjual,
    no_whatsapp: penjual.no_whatsapp,
    img_path: publicUrlData?.publicUrl,
    produk: penjual.produk.map(p => ({
      penjual_id: penjual.id,
      nama_produk: p.nama_produk,
      harga: p.harga
    }))
  }
    return penjualDatas
  });

};
  
  const { data, isLoading, error } = useQuery({queryKey: ['penjual'], queryFn:getPenjualFn});
  
  if(isLoading) return <p>Loading....</p>
  if(error) return <p>{error.message}</p>

    return (
        <section id="sellers" className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">Para Penjual dari Paguyuban Kami</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {data?.map((seller) => (
            <Card 
              key={seller.id} 
              className={`cursor-pointer transition-all ${
                selectedSeller === seller.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedSeller(seller.id === selectedSeller ? null : seller.id)}
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {seller.nama_penjual}
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Avatar>
                    <AvatarImage src={""} />
                    <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  {/* <p className="text-gray-600">Experience: {seller.experience}</p> */}
                </div>
                
                <div className={`space-y-4 transition-all ${
                  selectedSeller === seller.id ? 'block' : 'hidden'
                }`}>
                  <h3 className="font-semibold text-lg">Ikan yang tersedia</h3>
                    {data. map((penjual, index) => (
                  <div key={index} className="space-y-3">
                    {penjual.produk.map((produk, index)=>(

                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{produk.nama_produk}</p>
                          {/* <p className="text-sm text-gray-500">{penjual.freshness}</p> */}
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-blue-600">Rp {produk.harga}/kg</p>
                          {/* <p className={`text-sm ${
                            fish.stock === 'Limited' ? 'text-orange-500' : 'text-green-500'
                          }`}>
                            {fish.stock}
                          </p> */}
                        </div>
                      </div>
                    ))}
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mt-4">
                    <a target="_blank" href={`https://wa.me/${penjual.no_whatsapp}`}>
                    Hubungi Penjual
                    </a>
                  </button>
                  </div>
                ))}
                </div>
                
                {selectedSeller !== seller.id && (
                  <button className="w-full text-blue-500 hover:text-blue-600 flex items-center justify-center gap-2">
                    View Available Fish <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    )
}