import { HeroCarousel } from "@/components/hero-carousel"

const Carousel = ()=>{

    const items = [
    {
        key:1,
        id:"slide1",
        src:"https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp",
    },
    {   key:2,
        id:"slide2",
        src:"https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp",
    },
    {   key:3,
        id:"slide3",
        src:"https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp",
    },

]
    return(
        <div className="carousel w-full">
    {items.map((i)=>(

  <div key={i.key} id={i.id} className="carousel-item relative w-full">
    <img
      src={i.src}
      className="w-full" />
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide4" className="btn btn-circle">❮</a>
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
  </div>
    ))}
</div>
    )
}

export default Carousel;