import { useState, useEffect, useRef } from 'react';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import PaginationTest from './PaginationTest';
// import { Bs9CircleFill, BsFacebook, BsInstagram, BsLinkedin, BsTwitter, BsYoutube } from 'react-icons/bs';
import CarouselLinks from './CarouselLinks';
import LoginGallery from './LoginGallery';
//import PaginationTest from './PaginationTest';
import '../styles/MorphingPagination.css'; // Import your CSS file

import BackgroundImage from '../assets/background-image.jpg'
import FirstSlide from '../assets/first-slide-text.png'
import SecondSlide from '../assets/second-slide-text.png'

export default function Carousel(): JSX.Element {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [screenHeight, setScreenHeight] = useState<number>(window.innerHeight);
  const sliderRef = useRef<Slider | null>(null);

  useEffect(() => {
    // Update the screen height when it changes
    console.log(screenHeight)
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
 
  useEffect(() =>{

    console.log(currentSlide)
    return () =>{

    }

  },[currentSlide])

  const settings = {
    ref: (slider: Slider | null) => (sliderRef.current = slider), // Store a reference to the slider
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    beforeChange: (current: number, next: number) => {
      console.log(current)
      setCurrentSlide(next);
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // function handleNextPage() {
  //    if (sliderRef.current) {
  //     sliderRef.current.slickNext(); 
  //   }
  // }


  const [activeButton, setActiveButton] = useState(0);

    const buttons = [0, 1, 2]; 
  
    const switchToNext = (index : number) => {
      if (index !== activeButton) {
        setActiveButton(index);
        if (sliderRef.current) {
          sliderRef.current.slickGoTo(index); // Trigger the next slide
        }
      }
    };

    useEffect(() =>{
        setActiveButton(currentSlide)
        return () =>{}
    },[currentSlide])
  return (
    
    <div className="w-full overflow-hidden relative  mr-7">
      <Slider {...settings}>
        <div className='flex'>
          
          
          <img
            src= {BackgroundImage}
            alt="Image 1"
            // className="w-full h-3/5 object-cover object-center rounded-lg"
          style={{
            width: '100%',
            height: '95vh',
            borderRadius: '1em',
          }}/>

          <div className="fixed top-32 ml-20 z-50" id ="titleimage">
              <img src = {FirstSlide} />
              
          </div>
       
           
          
   </div>
        <div>
          <img
            src= {BackgroundImage}
            alt="Image 2"
            // className="w-full h-3/5 object-cover object-center rounded-lg"
            style={{
              width: '100%',
              height: '95vh',
              borderRadius: '1em',
            }}/>


            <div className="fixed top-36 ml-20 z-1" id ="titleimage">
              <img src = {SecondSlide} />              
            </div>
            <div
            className="absolute top-2/4 z-10 mx-20"
            style={{
              width: '800px',
              overflow: 'hidden', // Add overflow hidden
            }}
          >
              <h3
                style={{
                  fontSize: '28px',
                  // wordWrap: 'break-word', 
                }}
                id="h3"
                className='relative w-auto text-white me-16 break-words font-semibold'
              >
                Interested about our automated fare collection system and fleet management system?
              </h3>

              <h3
                style={{
                  fontSize: '28px',
                  marginTop:'2rem'
                }}
                id="h3"
                className='relative w-auto text-white me-16 break-words font-semibold'
              >
              Get in touch today.  
              </h3>
                <a href ="https://filipay.com.ph/">
              <button  className='text-white'
              style={{
                position: 'relative',
                
                border: 'none',
                padding:'1rem',
                background:'linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(0,69,145,1) 0%, rgba(0,195,246,1) 94%, rgba(0,136,199,1) 100%)',
              }}
              
              >
                Learn more about FILIPAY
              </button>
              </a>
            </div>
        </div>
        <div className=''>
          <div className='absolute m-4 w-auto'>
            <LoginGallery />
          </div>        
          <img
            src= {BackgroundImage}
            alt="Image 3"
            style={{
              width: '100%',
              height: '95vh',
              borderRadius: '1em',
            }}/>
         
        </div>
        {/* Add more slides as needed */}
      </Slider>
     
      <div style={{ display: 'flex', justifyContent: 'center'}}>
        {/* <PaginationTest currentSlide={currentSlide} 
        /> */}
        

        <div className="containerd">
            {buttons.map((index) => (
              <div
                key={index}
                className={`button ${activeButton === index ? 'active' : ''}`}
                onClick={() => switchToNext(index)}
              ></div>
            ))}
          </div>
      
          <CarouselLinks />
       
      </div>
    </div>
  );
}
