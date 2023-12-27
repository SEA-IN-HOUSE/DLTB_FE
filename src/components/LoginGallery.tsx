


export default function LoginGallery() : JSX.Element{

    return(
        <>
        
<div className="relative grid grid-cols-2 md:grid-cols-4 gap-4">
    <div className="grid gap-4">
        <div className="max-w-md h-auto p-6  rounded-lg shadow"
            style ={{
                background: 'rgba(255, 255, 255, 0.276)'
            }}
            >

                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">WHAT IS AN FMDS?</h5>
                </a>
                <p className="mb-3 font-normal text-slate-100 ">The FILIPAY Management Dashboard System is an online portal to provide transport cooperatives with exclusive and downloadable files of the daily ride transactions and other easy-to-understand data from our wide list of linked FILIPAY devices and applications.  </p>
                <a href="https://filipay.com.ph/fmd" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300" style ={{
                    background:'linear-gradient(149deg, rgba(0,136,199,1) 0%, rgba(0,157,215,1) 65%)',
                }}>
                    Read more
                    <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </a>
            </div>
        
     </div>

     <div className="grid gap-4">
        <div className="max-h-48 p-6 rounded-lg shadow"
            style ={{
                width:'460px',
                background: 'rgba(255, 255, 255, 0.276)'
            }}
            >

                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">HOW CAN WE AVAIL IT?</h5>
                </a>
                <p className="mb-3 font-normal text-slate-100 ">The FMDS is packaged with our tapping devices. If you opt in to use our AFCS you will have the privilege to use this system FREE of charge!</p>
                <a href="https://filipay.com.ph/book-a-meeting-1" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300" style ={{
                    background:'linear-gradient(149deg, rgba(0,136,199,1) 0%, rgba(0,157,215,1) 65%)',
                }}>
                    Read more
                    <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </a>
            </div>
        
     </div>
     
     
     

</div>        

<div className="relative grid grid-cols-2 md:grid-cols-4 gap-4">



</div>
     

        

 
        </>
    )

}