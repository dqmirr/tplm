'use client'

import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import React from "react"
import { Card, CardContent } from "./ui/card"
import Autoplay from "embla-carousel-autoplay"
import { Button } from "./ui/button"
  
export const HeroCarousel = ()=>{
   
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true, active:true})
      )
     
      return (
        <Carousel
          plugins={[plugin.current]}
          className=" w-full max-w-xs"
          opts={{
            align:"center",
            
          }}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
           <CarouselContent className="-ml-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-2xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext className="z-40"/>
          
        </Carousel>
      )
}
// function Autoplay(arg0: { delay: number; stopOnInteraction: boolean }): any {
//     throw new Error("Function not implemented.")
// }
