"use client"

import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase/client";

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const getCarousels = async () => {
    const { data: carousel } = await supabase.from('carousel').select('*')
    
    const carouselResults = carousel?.map((carousel) => {
      if (!carousel.img_path || typeof carousel.img_path !== 'string') return null;
      
      const { data } = supabase.storage.from('tplm').getPublicUrl(carousel.img_path);
      if (!data?.publicUrl) return null;
      
      return { ...carousel, publicUrl: data.publicUrl };
    });

    return carouselResults?.filter((item) => item && item.publicUrl) || [];
  }

  const getHero = async()=>{
    try {
      const { data, error } = await supabase.from("hero").select("*").eq('id', 1);
      if(error){
        throw new Error(`Terjadi error ${error}`)
      }
      return data;
    } catch (error) {
      console.log(error)
    }
  }

  const { data = [], isLoading, error } = useQuery({
    queryKey: ["carousels"],
    queryFn: getCarousels
  });

  const {data: heroData, isLoading: loadingHero, error: errorHero} = useQuery({
    queryKey:['hero'],
    queryFn: getHero
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % data.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [data.length]);

  if (isLoading) return <p>Loading....</p>;
  if (error) return <p>{error.message}</p>;
  if (!data.length) return null;

  if (loadingHero) return <p>Loading....</p>;
  if (errorHero) return <p>{errorHero.message}</p>;
  if (!heroData) return null;

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % data.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + data.length) % data.length);

  return (
    <div className="relative bg-blue-900 text-white pt-16">
      <div className="relative h-[500px] overflow-hidden">
        <div className="absolute w-full h-full transition duration-500">
          <img
            src={data[currentSlide]?.publicUrl}
            alt="carousel"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-4">{heroData[0].heading}</h1>
              <p className="text-xl mb-8">{heroData[0].desc}</p>
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

        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {data.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                currentSlide === index ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>

        <button 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 p-2 rounded-full"
          onClick={prevSlide}
        >
          <ChevronLeft className="text-white h-6 w-6" />
        </button>
        <button 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 p-2 rounded-full"
          onClick={nextSlide}
        >
          <ChevronRight className="text-white h-6 w-6" />
        </button>
      </div>
    </div>
  );
}