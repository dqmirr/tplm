import React from "react";
import * as db from "../database/db";

const CarouselButton = (index: number, currentIndex:number)=>{
    const {image} = db;
    
        const [current, setCurrent] = React.useState<number>(0);
        
        currentIndex = current;
        
        const handleNext = ()=>{
            setCurrent((prev)=>{return  (prev + 1) % (image.length)})
        }
    
        const handlePrev = ()=>{
            setCurrent((prev)=>{return  (prev - 1) % (image.length)})
        }
    return(
<div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <button onClick={handlePrev} className="btn btn-circle">❮</button>
      <button onClick={handleNext} className="btn btn-circle">❯</button>
    </div>
    )
}

export default CarouselButton