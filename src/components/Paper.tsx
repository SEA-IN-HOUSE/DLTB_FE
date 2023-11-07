/* eslint-disable @typescript-eslint/no-explicit-any */



export default function Paper({children} : any) : JSX.Element{

    return(
    <div className="relative block mt-4  p-6 bg-white border border-gray-200 rounded-lg shadow ">
      {children}
    </div>
    )

}