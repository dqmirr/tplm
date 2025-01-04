import React from 'react';
import * as db from  '../database/db'

const CarouselHero = ()=>{

    const {image} = db;

    const [current, setCurrent] = React.useState<number>(0);
    
    const handleNext = ()=>{
        setCurrent((prev)=>{return  (prev + 1) % (image.length)})
    }

    const handlePrev = ()=>{
        setCurrent((prev)=>{return  (prev - 1) % (image.length)})
    }

 return(

     <div className="carousel w-full bg-color-black opacity-40 absolute z-0 ">
    <div id={image[current].id} className="carousel-item relative w-full">
    <img
      src={image[current].src}
      className="w-full" />
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <button onClick={handlePrev} className="btn btn-circle">❮</button>
      <button onClick={handleNext} className="btn btn-circle">❯</button>
    </div>
  </div>
</div>
)   
}
export default CarouselHero;