/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode,  useEffect, useState, useLayoutEffect } from "react";
//import { useNavigate, useLocation } from "react-router-dom";
import { BsCurrencyExchange, BsEmojiDizzyFill, BsFillClipboardCheckFill, BsFillCreditCard2FrontFill, BsFillCreditCardFill, BsFillExclamationTriangleFill, BsFillFileEarmarkBarGraphFill, BsFillFuelPumpFill, BsFillMapFill, BsFillSignpostFill, BsFillTruckFrontFill,  BsMenuButtonWide, BsPersonFillLock, BsPersonWorkspace,BsTicketPerforatedFill, BsCarFrontFill,BsCardList  } from 'react-icons/bs';
import { ProfileBoxList } from "./NavList";
// import NotificationBell from "./NotificationBell";
import axios from "axios";
import { useNavigate, useLocation} from "react-router-dom";
import { BsDeviceSsd } from "react-icons/bs";
import { BsPeopleFill } from "react-icons/bs";
import { TbPigMoney } from "react-icons/tb";
import FilipayLogo from '../assets/Filipay-logo.png';
interface NavBarProps {
    children: ReactNode;
}

interface IUserInformation{
    id: number,
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    role: string,
    profileImageUrl: string,
}

    //////////////////////////////////////////////////////////////////
    ///////// MOCK DATA
    /////////////////////////////////////////////////////////////////
 
    const ProfileDropdown = [
        {id : 1, name : "Logout" , pageUrl: "/signout"}
    ]

    const UserInformation : IUserInformation  = 
        {id: 1, firstName:"", middleName:"", lastName: "", role: "", email: "", profileImageUrl: ""} 
  

export default function NavBar ({children} : NavBarProps) : JSX.Element{
    
    
  
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(UserInformation)

    const [torIsOpen , setTorIsOpen] = useState(false);



    const [userInformation] = useState(UserInformation)

    const [isBurgerClicked, setIsBurgerClicked] = useState(false)

    ////////////////////////////////////////////////////////
    /////// Profile Box State
    ///////////////////////////////////////////////////////

    const  [isOpenProfileBox, setIsOpenProfileBox] = useState(false);


    
    function handleBtnProfileBox() : any{
        setIsOpenProfileBox(!isOpenProfileBox)
    }


    useEffect( () =>{
    
      if(!localStorage.getItem('token')){
      navigate("/login");
      }

      
        return () => {}
    },[userInformation, isOpenProfileBox,isBurgerClicked,torIsOpen,navigate])

  
    async function GetUserByEmail (){

      const email = localStorage.getItem('token')

      try{
        console.log(email)
        const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/${email}`,{
          headers :{
              Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
          }
      })

      const response = await request.data;

      setUser(response.response)

      localStorage.setItem('role' , response.response.role)
      }catch(e){
        console.log(`Error in getting user: ${e}`)
      }

    }

    useLayoutEffect(() =>{
      GetUserByEmail()
    },[])
    
    useLayoutEffect(() =>{
      console.log(user)

      
      return () =>{}
    }, [user])

    

    return(
        <>
        <nav className="fixed top-0 z-50 w-full bg-gradient-to-r from-blue-900 to-[#161d6f] border-b border-gray-200 ">
  <div className="px-3 py-3 lg:px-5 lg:pl-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-start">
        <button onClick ={() => setIsBurgerClicked(!isBurgerClicked)}data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-indigo-950 focus:outline-none focus:ring-2 focus:ring-gray-200">
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" aria-hidden="false" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
               <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
         </button>
             <div className="bg-white w-full rounded-lg p-2 shadow-md">
            <img
              className="w-full h-16 rounded-lg "
              src= {FilipayLogo}
              alt="logo"
            />
        </div>

        
      </div>
    
      {/* <h1 className="text-white">{lastPart?.toUpperCase()}</h1> */}

<div className="z-50 flex items-center relative ml-3">

{/* <NotificationBell /> */}
  <div>
    
    <button type="button" className="flex items-center text-sm bg-gray rounded-full focus:ring-4 focus:ring-gray-300" onClick={handleBtnProfileBox}>
        <img className="w-8 h-8 rounded-full mr-2" src={user.profileImageUrl} alt="user photo" />
        <p className="text-sm text-white  flex-grow">{user.firstName + " " + user.middleName + " " + user.lastName}</p>
       </button>
      </div>
     

  
    

    {isOpenProfileBox && (
      <div className="absolute z-50 right-0 top-10  text-base list-none bg-white divide-y divide-gray-100 rounded shadow" id="dropdown-user">
        <div className="px-4 py-3" role="none">
          {/* <p className="text-sm text-gray-900 " role="none">
            {user.firstName + " " + user.middleName + " " + user.lastName}
          </p> */}
          <p className="text-sm font-medium text-gray-900 truncate " role="none">
            {user.role}
          </p>
          <p className="text-sm font-medium text-gray-900 truncate " role="none">
            {user.email}
          </p>
        </div>
        <ul className="py-1" role="none">
       

          {ProfileDropdown.map((list) => {
            return (
              <ProfileBoxList
                id={list.id}
                name={list.name}
                pageUrl={list.pageUrl}
                
                key={list.id}
              />
            );
          })}

      
        </ul>
      </div>
    )}
  </div>
</div>

        
    </div>
 
</nav>

<aside id="logo-sidebar" className= {isBurgerClicked ? ("fixed top-0 left-0 z-40 w-64 h-screen pt-0 transition-transform -translate-x-full bg-primary border-r border-gray-200 sm:translate-x-0 ") : ("fixed top-0 left-0 z-40 w-64 h-screen pt-0 bg-primary border-r border-gray-200 sm:translate-x-0 ")} aria-label="Sidebar">
   <div className="h-full mt-4 px-0 m1 pb-4 overflow-y-auto bg-gradient-to-b from-blue-900 to-[#161d6f]">
     <div className="mt-32"></div>
      <ul className="space-y-2 font-medium p-0">

      <li>
            <a
                onClick={() => navigate("/dashboard")}
                className={`no-underline relative  flex items-center text-2xl mt-4 p-2 text-neutral-100  hover:bg-indigo-950 ${
                location.pathname === "/dashboard" ? 'bg-indigo-700' : ''
                }`}
            >
                {location.pathname === "/dashboard" && (
                <div className="absolute top-0 left-0 h-full bg-white w-2 hover: rounded-e-sm"></div>
                )}
                <div className="mr-4"></div>
                <BsMenuButtonWide />
                <span className="ml-3">Dashboard</span>
                
            </a>
      </li>
      


{
        localStorage.getItem('pageCode')?.includes("empCard, ") || localStorage.getItem('role') === "Administrator" || localStorage.getItem('role') === "User Admin" ? 
        (
        <li>
          <a
              onClick={() => navigate("/employeecard")}
              className={`no-underline relative  flex items-center text-2xl mt-4 p-2 text-neutral-100  hover:bg-indigo-950 ${
              location.pathname === "/employeecard" ? 'bg-indigo-700' : ''
              }`}
          >
              {location.pathname === "/employeecard" && (
              <div className="absolute top-0 left-0 h-full bg-white w-2 hover: rounded-e-sm"></div>
              )}
              <div className="mr-4"></div>
              <BsFillCreditCard2FrontFill  />
              <span className="ml-3">Employee Card</span>
              
          </a>
        </li>
        ) :

        (<></>)
}

{
        localStorage.getItem('role') === "Administrator"  ? 
        (
        <li>
          <a
              onClick={() => navigate("/mastercard")}
              className={`no-underline relative  flex items-center text-2xl mt-4 p-2 text-neutral-100  hover:bg-indigo-950 ${
              location.pathname === "/mastercard" ? 'bg-indigo-700' : ''
              }`}
          >
              {location.pathname === "/mastercard" && (
              <div className="absolute top-0 left-0 h-full bg-white w-2 hover: rounded-e-sm"></div>
              )}
              <div className="mr-4"></div>
              <BsFillCreditCardFill  />
              <span className="ml-3">Master Card</span>
              
          </a>
        </li>
        ) :

        (<></>)
}


{
        localStorage.getItem('pageCode')?.includes("rou, ") || localStorage.getItem('role') === "Administrator" || localStorage.getItem('role') === "User Admin" ? 
        (
        <li>
          <a
              onClick={() => navigate("/direction")}
              className={`no-underline relative  flex items-center text-2xl mt-4 p-2 text-neutral-100  hover:bg-indigo-950 ${
              location.pathname === "/direction" ? 'bg-indigo-700' : ''
              }`}
          >
              {location.pathname === "/direction" && (
              <div className="absolute top-0 left-0 h-full bg-white w-2 hover: rounded-e-sm"></div>
              )}
              <div className="mr-4"></div>
              <BsFillMapFill  />
              <span className="ml-3">Route</span>
              
          </a>
        </li>
        ) :

        (<></>)
}

{
        localStorage.getItem('pageCode')?.includes("sta, ") || localStorage.getItem('role') === "Administrator" || localStorage.getItem('role') === "User Admin" ? 
        (
        <li>
          <a
              onClick={() => navigate("/station")}
              className={`no-underline relative  flex items-center text-2xl mt-4 p-2 text-neutral-100  hover:bg-indigo-950 ${
              location.pathname === "/station" ? 'bg-indigo-700' : ''
              }`}
          >
              {location.pathname === "/station" && (
              <div className="absolute top-0 left-0 h-full bg-white w-2 hover: rounded-e-sm"></div>
              )}
              <div className="mr-4"></div>
              <BsFillTruckFrontFill  />
              <span className="ml-3">Station</span>
              
          </a>
        </li>
        ) :

        (<></>)
}

{
        localStorage.getItem('pageCode')?.includes("veh, ") || localStorage.getItem('role') === "Administrator" || localStorage.getItem('role') === "User Admin" ? 
        (
        <li>
          <a
              onClick={() => navigate("/vehicle")}
              className={`no-underline relative  flex items-center text-2xl mt-4 p-2 text-neutral-100  hover:bg-indigo-950 ${
              location.pathname === "/vehicle" ? 'bg-indigo-700' : ''
              }`}
          >
              {location.pathname === "/vehicle" && (
              <div className="absolute top-0 left-0 h-full bg-white w-2 hover: rounded-e-sm"></div>
              )}
              <div className="mr-4"></div>
              <BsCarFrontFill  />
              <span className="ml-3">Vehicle</span>
              
          </a>
        </li>
        ) :

        (<></>)
}

{
        localStorage.getItem('pageCode')?.includes("emp, ") || localStorage.getItem('role') === "Administrator" || localStorage.getItem('role') === "User Admin" ? 
        (
        <li>
          <a
              onClick={() => navigate("/employee")}
              className={`no-underline relative  flex items-center text-2xl mt-4 p-2 text-neutral-100  hover:bg-indigo-950 ${
              location.pathname === "/employee" ? 'bg-indigo-700' : ''
              }`}
          >
              {location.pathname === "/employee" && (
              <div className="absolute top-0 left-0 h-full bg-white w-2 hover: rounded-e-sm"></div>
              )}
              <div className="mr-4"></div>
              <BsPersonWorkspace  />
              <span className="ml-3">Employee</span>
              
          </a>
        </li>
        ) :

        (<></>)
}

{
        localStorage.getItem('pageCode')?.includes("dev, ") || localStorage.getItem('role') === "Administrator" || localStorage.getItem('role') === "User Admin" ? 
        (
        <li>
          <a
              onClick={() => navigate("/device")}
              className={`no-underline relative  flex items-center text-2xl mt-4 p-2 text-neutral-100  hover:bg-indigo-950 ${
              location.pathname === "/device" ? 'bg-indigo-700' : ''
              }`}
          >
              {location.pathname === "/device" && (
              <div className="absolute top-0 left-0 h-full bg-white w-2 hover: rounded-e-sm"></div>
              )}
              <div className="mr-4"></div>
              <BsDeviceSsd />
              <span className="ml-3">Device</span>
              
          </a>
        </li>
        ) :

        (<></>)
}



{
        localStorage.getItem('role') === "Administrator" ? 
        (
        <li>
          <a
              onClick={() => navigate("/cooperative")}
              className={`no-underline relative  flex items-center text-2xl mt-4 p-2 text-neutral-100  hover:bg-indigo-950 ${
              location.pathname === "/cooperative" ? 'bg-indigo-700' : ''
              }`}
          >
              {location.pathname === "/cooperative" && (
              <div className="absolute top-0 left-0 h-full bg-white w-2 hover: rounded-e-sm"></div>
              )}
              <div className="mr-4"></div>
              <BsPeopleFill  />
              <span className="ml-3">Cooperative</span>
              
          </a>
        </li>
        ) :

        (<></>)
      }

      {
        localStorage.getItem('pageCode')?.includes("user, ") || localStorage.getItem('role') === "Administrator" || localStorage.getItem('role') === "User Admin" ? 
        (
        <li>
          <a
              onClick={() => navigate("/user")}
              className={`no-underline relative  flex items-center text-2xl mt-4 p-2 text-neutral-100  hover:bg-indigo-950 ${
              location.pathname === "/user" ? 'bg-indigo-700' : ''
              }`}
          >
              {location.pathname === "/user" && (
              <div className="absolute top-0 left-0 h-full bg-white w-2 hover: rounded-e-sm"></div>
              )}
              <div className="mr-4"></div>
              <BsPersonFillLock />
              <span className="ml-3">User</span>
              
          </a>
        </li>
        ) :

        (<></>)
      } 
      

      {
         localStorage.getItem('role') === "Administrator" || localStorage.getItem('role') === "Attorney" ? 
        (
        <li>
          <a
              onClick={() => navigate("/attorney")}
              className={`no-underline relative  flex items-center text-2xl mt-4 p-2 text-neutral-100  hover:bg-indigo-950 ${
              location.pathname === "/attorney" ? 'bg-indigo-700' : ''
              }`}
          >
              {location.pathname === "/attorney" && (
              <div className="absolute top-0 left-0 h-full bg-white w-2 hover: rounded-e-sm"></div>
              )}
              <div className="mr-4"></div>
              <TbPigMoney  />
              <span className="ml-3">Attorney</span>
              
          </a>
        </li>
        ) :

        (<></>)
      } 

<li>
        <li>
          <a
              onClick={() => navigate("/log")}
              className={`no-underline relative  flex items-center text-2xl mt-4 p-2 text-neutral-100  hover:bg-indigo-950 ${
              location.pathname === "/log" ? 'bg-indigo-700' : ''
              }`}
          >
              {location.pathname === "/log" && (
              <div className="absolute top-0 left-0 h-full bg-white w-2 hover: rounded-e-sm"></div>
              )}
              <div className="mr-4"></div>
              <BsCardList />
              <span className="ml-3">Logs</span>
              
          </a>
        </li>

       
{/* 
        <button type="button" className="flex items-center w-full p-2 text-base text-neutral-100 transition duration-75 rounded-lg group hover:bg-indigo-950 mt-4" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example" onClick={() =>{
              if(localStorage.getItem("reportIsOpen") === "true"){
                localStorage.setItem("reportIsOpen", "false");
              }else{
                localStorage.setItem("reportIsOpen", "true");
              }
              setReportIsOpen(!reportIsOpen)
            } }>
            <div className="mr-4"></div>
                 <BsFillFileEarmarkBarGraphFill className ="text-2xl" />
                  <span className="flex-1 ml-3 text-left whitespace-nowrap text-2xl ">Reports</span>
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                      </svg>
                  </button>
                  <ul id="dropdown-example" className= {`py-2 space-y-2 ${localStorage.getItem("reportIsOpen") === "true" ? "" : "hidden"}`}>


                  <li>
                        <a
                            onClick={() => navigate("/employeereport")}
                            className={`no-underline relative  flex items-center text-2xl mt-4 p-2 text-neutral-100  hover:bg-indigo-950 ${
                            location.pathname === "/employeereport" ? 'bg-indigo-700' : ''
                            }`}
                        >
                            {location.pathname === "/employeereport" && (
                            <div className="absolute top-0 left-0 h-full bg-white w-2 hover: rounded-e-sm "></div>
                            )}
                            <div className="mr-4 ml-5"></div>
                            <BsPersonWorkspace />
                            <span className="ml-3">Employee</span>
                            
                        </a>
                      </li>



                  </ul> */}
            


            <button type="button" className="flex items-center w-full p-2 text-base text-neutral-100 transition duration-75 rounded-lg group hover:bg-indigo-950 mt-4" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example" onClick={() =>{
              if(localStorage.getItem("torIsOpen") === "true"){
                localStorage.setItem("torIsOpen", "false");
              }else{
                localStorage.setItem("torIsOpen", "true");
              }
              setTorIsOpen(!torIsOpen)
            } }>
            <div className="mr-4"></div>
                 <BsFillFileEarmarkBarGraphFill className ="text-2xl" />
                  <span className="flex-1 ml-3 text-left whitespace-nowrap text-2xl ">TOR</span>
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                      </svg>
                  </button>
                  <ul id="dropdown-example" className= {`py-2 space-y-2 ${localStorage.getItem("torIsOpen") === "true" ? "" : "hidden"}`}>
             
                    {
                    localStorage.getItem('pageCode')?.includes("tMain, ") || localStorage.getItem('role') === "Administrator" ||  localStorage.getItem('role') === "User Admin" || localStorage.getItem('role') === "Attorney" ? ( 
                  
                      <li>
                        <a
                            onClick={() => navigate("/tormain")}
                            className={`no-underline relative  flex items-center text-2xl mt-4 p-2 text-neutral-100  hover:bg-indigo-950 ${
                            location.pathname === "/tormain" ? 'bg-indigo-700' : ''
                            }`}
                        >
                            {location.pathname === "/tormain" && (
                            <div className="absolute top-0 left-0 h-full bg-white w-2 hover: rounded-e-sm "></div>
                            )}
                            <div className="mr-4 ml-5"></div>
                            <BsPersonFillLock />
                            <span className="ml-3">Main</span>
                            
                        </a>
                      </li>

                //   <li>
                //     <NavLink to= "/tormain" className="no-underline flex items-center w-full p-2 text-neutral-100 transition duration-75 rounded-lg pl-11 group hover:bg-indigo-950  text-2xl mt-4"> <BsFileEarmarkTextFill className ="mr-4"  />Main </NavLink>
        
                //  </li>
                 ) : (<></>)
              }
                 
                 {
                localStorage.getItem('pageCode')?.includes("tTicket, ") || localStorage.getItem('role') === "Administrator" || localStorage.getItem('role') === "User Admin" || localStorage.getItem('role') === "Attorney" ? (

                    <li>
                        <a
                            onClick={() => navigate("/torticket")}
                            className={`no-underline relative  flex items-center text-2xl mt-4 p-2 text-neutral-100  hover:bg-indigo-950 ${
                            location.pathname === "/torticket" ? 'bg-indigo-700' : ''
                            }`}
                        >
                            {location.pathname === "/torticket" && (
                            <div className="absolute top-0 left-0 h-full bg-white w-2 hover: rounded-e-sm"></div>
                            )}
                            <div className="mr-4 ml-5"></div>
                            <BsTicketPerforatedFill />
                            <span className="ml-3">Ticket</span>
                            
                        </a>
                      </li>


                  //  <li>
                  //   <NavLink to= "/torticket" className="no-underline flex items-center w-full p-2 text-neutral-100 transition duration-75 rounded-lg pl-11 group hover:bg-indigo-950  text-2xl mt-4"> <BsTicketPerforatedFill className ="mr-4"  />Ticket </NavLink>
                  
                  // </li>
                 ) : (<></>)}

                 {
                localStorage.getItem('pageCode')?.includes("tFuel, ") || localStorage.getItem('role') === "Administrator" || localStorage.getItem('role') === "User Admin" || localStorage.getItem('role') === "Attorney"? (
                  <li>
                  <a
                      onClick={() => navigate("/torfuel")}
                      className={`no-underline relative  flex items-center text-2xl mt-4 p-2 text-neutral-100  hover:bg-indigo-950 ${
                      location.pathname === "/torfuel" ? 'bg-indigo-700' : ''
                      }`}
                  >
                      {location.pathname === "/torfuel" && (
                      <div className="absolute top-0 left-0 h-full bg-white w-2 hover: rounded-e-sm"></div>
                      )}
                      <div className="mr-4 ml-5"></div>
                      <BsFillFuelPumpFill />
                      <span className="ml-3">Fuel</span>
                      
                  </a>
                </li>

                    // <li>
                    //   <NavLink to= "/torfuel" className="no-underline flex items-center w-full p-2 text-neutral-100 transition duration-75 rounded-lg pl-11 group hover:bg-indigo-950  text-2xl mt-4"> <BsFillFuelPumpFill className ="mr-4"  />Fuel </NavLink>
                    // </li>
                 ) : (<></>)}
                  
                  {
                  localStorage.getItem('pageCode')?.includes("tRem, ") || localStorage.getItem('role') === "Administrator" || localStorage.getItem('role') === "User Admin" || localStorage.getItem('role') === "Attorney"? (
                      // <li>
                      //   <NavLink to= "/torremittance" className="no-underline flex items-center w-full p-2 text-neutral-100 transition duration-75 rounded-lg pl-11 group hover:bg-indigo-950  text-2xl mt-4"> <BsCurrencyExchange className ="mr-4"  />Remittance </NavLink>
                      // </li>
                      <li>
                      <a
                          onClick={() => navigate("/torremittance")}
                          className={`no-underline relative  flex items-center text-2xl mt-4 p-2 text-neutral-100  hover:bg-indigo-950 ${
                          location.pathname === "/torremittance" ? 'bg-indigo-700' : ''
                          }`}
                      >
                          {location.pathname === "/torremittance" && (
                          <div className="absolute top-0 left-0 h-full bg-white w-2 hover: rounded-e-sm"></div>
                          )}
                          <div className="mr-4 ml-5"></div>
                          <BsCurrencyExchange />
                          <span className="ml-3">Remittance</span>
                          
                      </a>
                    </li>
    
                  ) :(<></>)}
                  
                  {
                  localStorage.getItem('pageCode')?.includes("tTrip, ") || localStorage.getItem('role') === "Administrator" || localStorage.getItem('role') === "User Admin" || localStorage.getItem('role') === "Attorney" ? (
                    // <li>
                    //     <NavLink to= "/tortrip" className="no-underline flex items-center w-full p-2 text-neutral-100 transition duration-75 rounded-lg pl-11 group hover:bg-indigo-950  text-2xl mt-4"> <BsFillSignpostFill className ="mr-4"  />Trip </NavLink>
                    // </li>
                    <li>
                    <a
                        onClick={() => navigate("/tortrip")}
                        className={`no-underline relative  flex items-center text-2xl mt-4 p-2 text-neutral-100  hover:bg-indigo-950 ${
                        location.pathname === "/tortrip" ? 'bg-indigo-700' : ''
                        }`}
                    >
                        {location.pathname === "/tortrip" && (
                        <div className="absolute top-0 left-0 h-full bg-white w-2 hover: rounded-e-sm"></div>
                        )}
                        <div className="mr-4 ml-5"></div>
                        <BsFillSignpostFill />
                        <span className="ml-3">Trip</span>
                        
                    </a>
                  </li>
                  ) : (<></>)}

                  {
                  localStorage.getItem('pageCode')?.includes("tIns, ") || localStorage.getItem('role') === "Administrator" || localStorage.getItem('role') === "User Admin" || localStorage.getItem('role') === "Attorney"? (   
                  
                  <li>
                  <a
                      onClick={() => navigate("/torinspection")}
                      className={`no-underline relative  flex items-center text-2xl mt-4 p-2 text-neutral-100  hover:bg-indigo-950 ${
                      location.pathname === "/torinspection" ? 'bg-indigo-700' : ''
                      }`}
                  >
                      {location.pathname === "/torinspection" && (
                      <div className="absolute top-0 left-0 h-full bg-white w-2 hover: rounded-e-sm"></div>
                      )}
                      <div className="mr-4 ml-5"></div>
                      <BsFillClipboardCheckFill />
                      <span className="ml-3">Inspection</span>
                      
                  </a>
                </li>
                  ):( <></>)}
                  
                  {
                  localStorage.getItem('pageCode')?.includes("tVio, ") || localStorage.getItem('role') === "Administrator" || localStorage.getItem('role') === "User Admin" || localStorage.getItem('role') === "Attorney" ? (
                 
                    <li>
                    <a
                        onClick={() => navigate("/torviolation")}
                        className={`no-underline relative  flex items-center text-2xl mt-4 p-2 text-neutral-100  hover:bg-indigo-950 ${
                        location.pathname === "/torviolation" ? 'bg-indigo-700' : ''
                        }`}
                    >
                        {location.pathname === "/torviolation" && (
                        <div className="absolute top-0 left-0 h-full bg-white w-2 hover: rounded-e-sm"></div>
                        )}
                        <div className="mr-4 ml-5"></div>
                        <BsFillExclamationTriangleFill />
                        <span className="ml-3">Violation</span>
                        
                    </a>
                  </li>
                  ) :(<></>)}
                  
                  {
                  localStorage.getItem('pageCode')?.includes("tTro, ") || localStorage.getItem('role') === "Administrator" || localStorage.getItem('role') === "User Admin" || localStorage.getItem('role') === "Attorney" ? 
                  (
 
                  <li>
                    <a
                        onClick={() => navigate("/tortrouble")}
                        className={`no-underline relative  flex items-center text-2xl mt-4 p-2 text-neutral-100  hover:bg-indigo-950 ${
                        location.pathname === "/tortrouble" ? 'bg-indigo-700' : ''
                        }`}
                    >
                        {location.pathname === "/tortrouble" && (
                        <div className="absolute top-0 left-0 h-full bg-white w-2 hover: rounded-e-sm"></div>
                        )}
                        <div className="mr-4 ml-5"></div>
                        <BsEmojiDizzyFill />
                        <span className="ml-3">Trouble</span>
                        
                    </a>
                  </li>
                  ) :(<> </>)
                  }
                   
                  
            </ul>
         </li>
      </ul>
   </div>
</aside>

<div className="p-10 mt-10 sm:ml-60 sm:p-10">
   
{children}

</div>

        </>
    )

}