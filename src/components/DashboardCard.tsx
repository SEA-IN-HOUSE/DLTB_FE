//import {  BsMenuAppFill } from "react-icons/bs";

interface DashboardCardProps {

title: string;
cardNumber:  number | string;
icon: JSX.Element

}

export default function DashboardCard(props : DashboardCardProps){

    return (
        <>
  
   <div className=" bg-white border border-gray-200 rounded-lg shadow-lg p-4">  
  <div className="flex items-center">
    <div className="inline-flex flex-shrink-0 justify-center items-center w-12 h-12 text-white bg-gradient-to-br from-blue-900 to-[#161d6f] rounded-lg" >
      
        {props.icon}
    </div>
    <div className="flex-shrink-0 ml-3">
      <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl">{props.cardNumber}</span>
      <h3 className="text-base font-normal text-gray-500">{props.title}</h3>
    </div>
  </div>
</div>
        </>
    )

}