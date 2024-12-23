import { ChevronRight, Star } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { sellers } from "@/database/db";
import { useState } from "react";

export default function Sellers () {
    const [selectedSeller, setSelectedSeller] = useState<any>();
  const [ sellersData, setSellersData ] = useState<any[] | null>();

    return (
        <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">Our Certified Sellers</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {sellers.map((seller) => (
            <Card 
              key={seller.id} 
              className={`cursor-pointer transition-all ${
                selectedSeller === seller.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedSeller(seller.id === selectedSeller ? null : seller.id)}
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {seller.name}
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm">{seller.rating}</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-gray-600">Experience: {seller.experience}</p>
                </div>
                
                <div className={`space-y-4 transition-all ${
                  selectedSeller === seller.id ? 'block' : 'hidden'
                }`}>
                  <h3 className="font-semibold text-lg">Available Fish</h3>
                  <div className="space-y-3">
                    {seller.fish.map((fish, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{fish.name}</p>
                          <p className="text-sm text-gray-500">{fish.freshness}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-blue-600">${fish.price}/lb</p>
                          <p className={`text-sm ${
                            fish.stock === 'Limited' ? 'text-orange-500' : 'text-green-500'
                          }`}>
                            {fish.stock}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mt-4">
                    Contact Seller
                  </button>
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