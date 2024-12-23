"use client"

import { carouselItems } from "@/database/db";
import { supabase } from "@/utils/supabase/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function HeroCarousel () {
const [currentSlide, setCurrentSlide] = useState(0);
const [carousels, setCarousels] = useState<any[] | null>()
useEffect(() => {
    const getCarousels = async ()=>{
        const { data: carousel } = await supabase.from('carousel').select('*')
        console.log(carousel);
        setCarousels(carousel);
    }
    getCarousels();
    
    const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 5000);
    clearInterval(timer);
    
    
  }, []);

  console.log(carousels);
  
    return(
<div className="relative bg-blue-900 text-white pt-16">
{/* <img
                src="/images/carousel/images.jpg"
                alt={"item.title"}
                className="w-full h-full object-cover opacity-50"
              /> */}
        <div className="relative h-[500px] overflow-hidden">
            <div
              className={`absolute w-full h-full transition-opacity duration-500`}
                >
            {carousels?.map((item, index) => (
              <img
              key={index}

              src={item.image_path ? item.image_path : `/images/carousel/images.jpg`}
              alt={item.title}
              className="w-full h-full object-cover opacity-50"
              />
            ))}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-5xl font-bold mb-4">Pasar Ikan Desa Beji</h1>
                  <p className="text-xl mb-8">Deskripsi</p>
                  <div className="flex justify-center gap-4">
                    <button className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-medium">
                      Find Markets Near You
                    </button>
                    <button className="bg-white text-blue-900 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium">
                      Today's Catches
                    </button>
                  </div>
                </div>
              </div>
            </div>
          
          {/* Carousel Controls */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  currentSlide === index ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
          
          {/* Navigation Arrows */}
          <button 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 p-2 rounded-full"
            onClick={() => setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length)}
          >
            <ChevronLeft className="text-white h-6 w-6" />
          </button>
          <button 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 p-2 rounded-full"
            onClick={() => setCurrentSlide((prev) => (prev + 1) % carouselItems.length)}
          >
            <ChevronRight className="text-white h-6 w-6" />
          </button>
        </div>
      </div>
    )
}

