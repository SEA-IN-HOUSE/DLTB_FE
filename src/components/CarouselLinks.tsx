import { Bs9CircleFill, BsFacebook, BsInstagram, BsLinkedin, BsTwitter, BsYoutube } from "react-icons/bs";

export default function CarouselLinks() : JSX.Element {
    return(
        <>
          <div className="absolute z-0 bottom-2 m-auto left-0 right-0 flex justify-center p-10" id="links">
            <a href= "https://filipay.com.ph/" className="grow w-6 h-10 me-4 text-white flex items-center justify-center rounded" style={{ backgroundColor: '#161d6f' }}>
              <Bs9CircleFill fullWidth />
            </a>
            <a href= "https://www.linkedin.com/in/service-economy-applications-inc-sea-inc/" className="grow w-6 h-10 me-4 text-white flex items-center justify-center rounded" style={{ backgroundColor: '#161d6f' }}>
              <BsLinkedin fullWidth />
            </a>
            <a href= "https://web.facebook.com/FilipayOfficial?_rdc=1&_rdr" className="grow w-6 h-10 me-4 text-white flex items-center justify-center rounded" style={{ backgroundColor: '#161d6f' }}>
              <BsFacebook fullWidth/>
            </a>
            <a href= "https://www.instagram.com/filipayofficial/" className="grow w-6 h-10 me-4 text-white flex items-center justify-center rounded" style={{ backgroundColor: '#161d6f' }}>
              <BsInstagram fullWidth/>
            </a>
            <a href= "https://twitter.com/filipayofficial" className="grow w-6 h-10 me-4 text-white flex items-center justify-center rounded" style={{ backgroundColor: '#161d6f' }}>
              <BsTwitter fullWidth/>
            </a>
            <a href= "https://www.youtube.com/channel/UCfhdGa3z1_nc6Zmjwn6K7kQ" className="grow w-6 h-10 me-4 text-white flex items-center justify-center rounded" style={{ backgroundColor: '#161d6f' }}>
              <BsYoutube fullWidth />
            </a>
          </div>
        </>
    )
}