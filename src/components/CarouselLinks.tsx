import { Bs9CircleFill, BsFacebook, BsInstagram, BsLinkedin, BsTwitter, BsYoutube } from "react-icons/bs";

export default function CarouselLinks() : JSX.Element {
    return(
        <>
          <div className="absolute z-0 bottom-2 m-auto left-0 right-0 flex justify-center p-10" id="links">
            <a href= "#" className="grow w-6 h-10 me-4 text-white flex items-center justify-center rounded" style={{ backgroundColor: '#161d6f' }}>
              <Bs9CircleFill fullWidth />
            </a>
            <a href= "#" className="grow w-6 h-10 me-4 text-white flex items-center justify-center rounded" style={{ backgroundColor: '#161d6f' }}>
              <BsLinkedin fullWidth />
            </a>
            <a href= "#" className="grow w-6 h-10 me-4 text-white flex items-center justify-center rounded" style={{ backgroundColor: '#161d6f' }}>
              <BsFacebook fullWidth/>
            </a>
            <a href= "#" className="grow w-6 h-10 me-4 text-white flex items-center justify-center rounded" style={{ backgroundColor: '#161d6f' }}>
              <BsInstagram fullWidth/>
            </a>
            <a href= "#" className="grow w-6 h-10 me-4 text-white flex items-center justify-center rounded" style={{ backgroundColor: '#161d6f' }}>
              <BsTwitter fullWidth/>
            </a>
            <a href= "#" className="grow w-6 h-10 me-4 text-white flex items-center justify-center rounded" style={{ backgroundColor: '#161d6f' }}>
              <BsYoutube fullWidth />
            </a>
          </div>
        </>
    )
}