/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode,  useEffect, useState } from "react";
//import { useNavigate, useLocation } from "react-router-dom";
import { BsCurrencyExchange, BsEmojiDizzyFill, BsFileEarmarkTextFill, BsFillClipboardCheckFill, BsFillCreditCard2FrontFill, BsFillCreditCardFill, BsFillExclamationTriangleFill, BsFillFileEarmarkBarGraphFill, BsFillFuelPumpFill, BsFillMapFill, BsFillSignpostFill, BsFillTruckFrontFill,  BsMenuButtonWide, BsPersonFillLock, BsPersonWorkspace, BsTicketPerforatedFill } from 'react-icons/bs';
import NavList, { ProfileBoxList } from "./NavList";
import NotificationBell from "./NotificationBell";
import axios from "axios";
import { useNavigate, useLocation, NavLink } from "react-router-dom";

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
    const NavBarPages = [
        
        
        {id: 2, pageName: "Employee", url: "/employee", iconUrl: <BsPersonWorkspace />},
        {id: 3, pageName: "Staff", url: "/staff", iconUrl: <BsPersonFillLock /> },
        {id: 4, pageName: "Employee Card", url :"/employeecard" , iconUrl: <BsFillCreditCard2FrontFill />},
        {id: 5, pageName: "Master Card", url :"/mastercard", iconUrl: <BsFillCreditCardFill />},
        {id: 6, pageName: "Route", url: "/direction", iconUrl: <BsFillMapFill />},
        {id: 7, pageName: "Station", url :"/station" , iconUrl : <BsFillTruckFrontFill />}
    ]

    const ProfileDropdown = [
        {id : 1, name : "Logout" , pageUrl: "/signout"}
    ]

    const UserInformation : IUserInformation  = 
        {id: 1, firstName:"Emmanuel", middleName:"", lastName: "Zuiga", role: "Administrator", email: "admin@gmail.com", profileImageUrl: "https://flowbite.com/docs/images/people/profile-picture-5.jpg"} 
  

export default function NavBar ({children} : NavBarProps) : JSX.Element{
    
    
  
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(UserInformation)

   

    //const location = useLocation();

    //const [activePage, setActivePage] = useState<string>("");

    const [torIsOpen , setTorIsOpen] = useState(false);

    const [userInformation] = useState(UserInformation)

    const [isBurgerClicked, setIsBurgerClicked] = useState(false)

    ////////////////////////////////////////////////////////
    /////// Profile Box State
    ///////////////////////////////////////////////////////

    const  [isOpenProfileBox, setIsOpenProfileBox] = useState(false);

   
    //if coop

    // const [isAllowedToTorFuel ,setIsAllowedToTorFuel] = useState(false)
    // const [isAllowedToTorInspection ,setIsAllowedToTorInspection] = useState(false)
    // const [isAllowedToTorMain ,setIsAllowedToTorMain] = useState(false)
    // const [isAllowedToTorRemittance ,setIsAllowedToTorRemittance] = useState(false)
    // const [isAllowedToTorTicket ,setIsAllowedToTorTicket] = useState(false)
    // const [isAllowedToTorTrip ,setIsAllowedToTorTrip] = useState(false)
    // const [isAllowedToTorTrouble ,setIsAllowedToTorTrouble] = useState(false)
    // const [isAllowedToTorViolation ,setIsAllowedToTorViolation] = useState(false)

    
    function handleBtnProfileBox() : any{
        setIsOpenProfileBox(!isOpenProfileBox)
    }

    useEffect(() =>{

    
     //setUserRole(localStorage.getItem('role') || "Coop");
      // setIsAllowedToTorMain(localStorage.getItem('isTorMain') === "true" ? true : false)
      // setIsAllowedToTorFuel(localStorage.getItem('isTorFuel') === "true" ? true : false)
      // setIsAllowedToTorInspection(localStorage.getItem('isTorInspection') === "true" ? true : false)
      // setIsAllowedToTorMain(localStorage.getItem('isTorMain') === "true" ? true : false)
      // setIsAllowedToTorRemittance(localStorage.getItem('isTorRemittance') === "true" ? true : false)
      // setIsAllowedToTorTicket(localStorage.getItem('isTorTicket') === "true" ? true : false)
      // setIsAllowedToTorTrip(localStorage.getItem('isTorTrip') === "true" ? true : false)
      // setIsAllowedToTorTrouble(localStorage.getItem('isTorTrouble') === "true" ? true : false)
      // setIsAllowedToTorViolation(localStorage.getItem('isTorViolation') === "true" ? true : false)


      return () =>{}

    },[])

    useEffect( () =>{
    
      if(!localStorage.getItem('token')){
      navigate("/login");
      }

      
        return () => {}
    },[userInformation, isOpenProfileBox,isBurgerClicked,torIsOpen])

  
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
      console.log("Email ",email)
      console.log("response:", response)
      setUser(response.response)

      localStorage.setItem('role' , response.response.role)
      }catch(e){
        console.log(`Error in getting user: ${e}`)
      }

    }

    useEffect(() =>{
      GetUserByEmail()
    },[])
    
    useEffect(() =>{
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
         
             {/* <a href= "#" className="no-underline flex ml-2 md:mr-24">
                <span className="self-center text-white text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">FILIPAY / DLTB</span>
             </a> */}
             
             <div className="bg-white w-full rounded-lg p-2 shadow-md">
            <img
              className="w-full h-16 rounded-lg "
              src="http://filipworks.com/fmd/assets/Filipay-logo.png"
              alt="logo"
            />
        </div>

        
      </div>
    
      {/* <h1 className="text-white">{lastPart?.toUpperCase()}</h1> */}

<div className="z-50 flex items-center relative ml-3">

<NotificationBell />
  <div>
    
    <button type="button" className="flex items-center text-sm bg-gray rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" onClick={handleBtnProfileBox}>
        <img className="w-8 h-8 rounded-full mr-2" src={user.profileImageUrl} alt="user photo" />
        <p className="text-sm text-white  flex-grow">{user.firstName + " " + user.middleName + " " + user.lastName}</p>
    </button>
    

    {isOpenProfileBox && (
      <div className="absolute z-50 right-0 mt-2 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
        <div className="px-4 py-3" role="none">
          <p className="text-sm text-gray-900 " role="none">
            {user.firstName + " " + user.middleName + " " + user.lastName}
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
  </div>
</nav>

<aside id="logo-sidebar" className= {isBurgerClicked ? ("fixed top-0 left-0 z-40 w-64 h-screen pt-0 transition-transform -translate-x-full bg-primary border-r border-gray-200 sm:translate-x-0 ") : ("fixed top-0 left-0 z-40 w-64 h-screen pt-0 bg-primary border-r border-gray-200 sm:translate-x-0 ")} aria-label="Sidebar">
   <div className="h-full mt-4 px-0 m1 pb-4 overflow-y-auto bg-gradient-to-b from-blue-900 to-[#161d6f] dark:bg-primary">
     <div className="mt-32"></div>
      <ul className="space-y-2 font-medium p-0">

      <li>
            <a
                onClick={() => navigate("/dashboard")}
                className={`no-underline relative  flex items-center text-2xl mt-4 p-2 text-neutral-100  hover:bg-indigo-950 ${
                location.pathname === "/dashboard" ? 'bg-indigo-700 pl-4' : ''
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
        localStorage.getItem("role") === "Administrator" ? (NavBarPages.map((page) =>{
          return(
         <>
         
            <NavList 
            iconUrl= {page.iconUrl}
            pageName= {page.pageName}
            url= {page.url}
            id = {page.id}
            key = {page.id}
            />
         </>
          ) 
        })) : (<></>)
        }
      
      

        
<li>

            <button type="button" className="flex items-center w-full p-2 text-base text-neutral-100 transition duration-75 rounded-lg group hover:bg-indigo-950 mt-4" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example" onClick={() => setTorIsOpen(!torIsOpen)}>
            <div className="mr-4"></div>
                 <BsFillFileEarmarkBarGraphFill className ="text-2xl" />
                  <span className="flex-1 ml-3 text-left whitespace-nowrap text-2xl ">TOR</span>
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                      </svg>
                  </button>
                  <ul id="dropdown-example" className= {`py-2 space-y-2 ${torIsOpen ? "" : "hidden"}`}>
             
                    {
                    localStorage.getItem('isTorMain') === "true" ? ( 
                  
                  <li>
                    <NavLink to= "/tormain" className="no-underline flex items-center w-full p-2 text-neutral-100 transition duration-75 rounded-lg pl-11 group hover:bg-indigo-950 dark:text-white text-2xl mt-4"> <BsFileEarmarkTextFill className ="mr-4"  />Main </NavLink>
                    {/* <a href="/tormain" className="no-underline flex items-center w-full p-2 text-neutral-100 transition duration-75 rounded-lg pl-11 group hover:bg-indigo-950 text-2xl mt-4"><BsFileEarmarkTextFill className ="mr-4" />Main</a> */}
                 </li>) : (<></>)
              }
                 
                 {
                localStorage.getItem('isTorTicket') === "true" ? (
                   <li>
                    <NavLink to= "/torticket" className="no-underline flex items-center w-full p-2 text-neutral-100 transition duration-75 rounded-lg pl-11 group hover:bg-indigo-950 dark:text-white text-2xl mt-4"> <BsTicketPerforatedFill className ="mr-4"  />Ticket </NavLink>
                   {/* <a href="/torticket" className="no-underline flex items-center w-full p-2 text-neutral-100 transition duration-75 rounded-lg pl-11 group hover:bg-indigo-950 dark:text-white text-2xl mt-4"> <BsTicketPerforatedFill className ="mr-4" /> Ticket</a> */}
                  </li>
                 ) : (<></>)}

                 {
                 localStorage.getItem('isTorFuel') === "true" ? (
                    <li>
                      <NavLink to= "/torfuel" className="no-underline flex items-center w-full p-2 text-neutral-100 transition duration-75 rounded-lg pl-11 group hover:bg-indigo-950 dark:text-white text-2xl mt-4"> <BsFillFuelPumpFill className ="mr-4"  />Fuel </NavLink>
                    {/* <a href="/torfuel" className="no-underline flex items-center w-full p-2 text-neutral-100 transition duration-75 rounded-lg pl-11 group hover:bg-indigo-950 dark:text-white text-2xl mt-4"> <BsFillFuelPumpFill className ="mr-4"/> Fuel</a> */}
                 </li>
                 ) : (<></>)}
                  
                  {
                  localStorage.getItem('isTorRemittance') === "true" ? (
                      <li>
                        <NavLink to= "/torremittance" className="no-underline flex items-center w-full p-2 text-neutral-100 transition duration-75 rounded-lg pl-11 group hover:bg-indigo-950 dark:text-white text-2xl mt-4"> <BsCurrencyExchange className ="mr-4"  />Remittance </NavLink>
                      {/* <a href="/torremittance" className="no-underline flex items-center w-full p-2 text-neutral-100 transition duration-75 rounded-lg pl-11 group hover:bg-indigo-950 dark:text-white text-2xl mt-4"><BsCurrencyExchange className ="mr-4"/> Remittance</a> */}
                   </li>
                  ) :(<></>)}
                  
                  {
                  localStorage.getItem('isTorTrip') === "true" ? (
                    <li>
                        <NavLink to= "/tortrip" className="no-underline flex items-center w-full p-2 text-neutral-100 transition duration-75 rounded-lg pl-11 group hover:bg-indigo-950 dark:text-white text-2xl mt-4"> <BsFillSignpostFill className ="mr-4"  />Trip </NavLink>
                     {/* <a href="/tortrip" className="no-underline flex items-center w-full p-2 text-neutral-100 transition duration-75 rounded-lg pl-11 group hover:bg-indigo-950 dark:text-white text-2xl mt-4"><BsFillSignpostFill className ="mr-4"/> Trip</a> */}
                  </li>
                  ) : (<></>)}

                  {
                  localStorage.getItem('isTorInspection') === "true" ? (   
                  <li>
                     <NavLink to= "/torinspection" className="no-underline flex items-center w-full p-2 text-neutral-100 transition duration-75 rounded-lg pl-11 group hover:bg-indigo-950 dark:text-white text-2xl mt-4"> <BsFillClipboardCheckFill className ="mr-4"  />Inspection </NavLink>
                     {/* <a href="/torinspection" className="no-underline flex items-center w-full p-2 text-neutral-100 transition duration-75 rounded-lg pl-11 group hover:bg-indigo-950 dark:text-white text-2xl mt-4"><BsFillClipboardCheckFill className ="mr-4" /> Inspection</a> */}
                  </li>):( <></>)}
                  
                  {
                  localStorage.getItem('isTorViolation') === "true" ? (
                    <li>
                      <NavLink to= "/torviolation" className="no-underline flex items-center w-full p-2 text-neutral-100 transition duration-75 rounded-lg pl-11 group hover:bg-indigo-950 dark:text-white text-2xl mt-4"> <BsFillExclamationTriangleFill className ="mr-4"  />Violation </NavLink>
                    {/* <a href="/torviolation" className="no-underline flex items-center w-full p-2 text-neutral-100 transition duration-75 rounded-lg pl-11 group hover:bg-indigo-950 dark:text-white text-2xl mt-4"> <BsFillExclamationTriangleFill className="mr-4"/> Violation</a> */}
                 </li>
                  ) :(<></>)}
                  
                  {
                  localStorage.getItem('isTorTrouble') === "true" ? 
                  (
                    <li>
                      <NavLink to= "/tortrouble" className="no-underline flex items-center w-full p-2 text-neutral-100 transition duration-75 rounded-lg pl-11 group hover:bg-indigo-950 dark:text-white text-2xl mt-4"> <BsEmojiDizzyFill className ="mr-4"  />Trouble </NavLink>
                    {/* <a href="/tortrouble" className="no-underline flex items-center w-full p-2 text-neutral-100 transition duration-75 rounded-lg pl-11 group hover:bg-indigo-950 dark:text-white text-2xl mt-4"><BsEmojiDizzyFill className ="mr-4"/> Trouble</a> */}
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