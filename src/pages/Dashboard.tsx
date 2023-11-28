import {useState, useEffect } from "react";
import HeaderCard from "../components/HeaderCard";
import NavBar from "../components/NavBar";
//import Paper from "../components/Paper";
import axios from "axios";
import DashboardCard from "../components/DashboardCard";
import { BsCurrencyExchange, BsEmojiDizzyFill, BsFileEarmarkTextFill, BsFillClipboardCheckFill, BsFillExclamationTriangleFill, BsFillFuelPumpFill, BsFillSignpostFill, BsTicketPerforatedFill } from "react-icons/bs";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from "react-router-dom";
import { ICooperative } from "./Employee";

import { FormControl, InputLabel,  MenuItem, Select } from "@mui/material";

const initialState = [
  {
    name: "Main",
    total: 0,
  },
  {
    name: "Ticket",
    total: 0,
  },
  {
    name: "Fuel",
    total: 0,
  },
  {
    name: "Remittance",
    total: 0,
  },
  {
    name: "Trip",
    total: 0,
  },
  {
    name: "Inspection",
    total: 0,
  },
  {
    name: "Violation",
    total: 0,
  },
  {
    name: "Trouble",
    total: 0,
  },
];

export function Dashboard() : JSX.Element{

    const [coopList, setCoopList] = useState([]);
    const [filterTableCompanyId, setFilterTableCompanyId] = useState(localStorage.getItem('companyId'));
    const navigate = useNavigate();
    useEffect(() =>{
  
      if(!localStorage.getItem('token')){
        localStorage.clear();
        navigate('/login')
      }
      
    //   if(!localStorage.getItem('pageCode')?.includes("dash, ")){
    //       navigate('/dashboard')
    //   }
  
     
  
      return () =>{}
  
  },[])


  
  async function GetCooperative(){

    try{
  
      const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/cooperative`,{
        headers :{
            Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
        }
    })
        
        const response = await request.data;
        
        if(response.messages[0].code === '0'){
          console.log(response);
          setCoopList(
            
            // eslint-disable-next-line @typescript-eslint/no-explicit-any  
            response.response.map((coop : any ) =>{
              console.log(coop)
              
              if(coop._id){
                return {id: coop._id, ...coop}
              }
              
            })
          )
  
          
        }
        
    }catch(e){
      console.log(`Error in getting coops: ${e}`)
    }
  }

  useEffect(() =>{

      GetCooperative();
      return () =>{}

  },[])
    const [torMainNumber, setTorMainNumber] = useState(0);

    const [torTicket, setTorTicketNumber] = useState(0);

    const [torFuel, setTorFuelNumber] = useState(0);

    const [torRemittance, setTorRemittance] = useState(0);

    const [torTrip, setTorTrip] = useState(0);

    const [torInspection, setTorInspection] = useState(0);

    const [torViolation, setTorViolation] = useState(0);

    const [torTrouble, setTorTrouble] = useState(0);

    const [data, setData] = useState(initialState);


    async function GetAllTORMain(){

        try{

            const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/tor/main/${filterTableCompanyId}`,{
                headers :{
                    Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
                }
            })

            const response = await request.data;
            console.log("tor main")
            console.log(response.response.length)
            setTorMainNumber(response.response.length)
            
            setData((prevState) =>
            prevState.map((item) =>
                item.name === "Main" ? { ...item, total: response.response.length } : item
            )
            );

        }catch(e){
            console.error("Error in getting all the tor main: "+e)
        }

        setTimeout(GetAllTORMain, 5000)

    }

    async function GetAllTORTicket(){

        try{

            const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/tor/ticket/${filterTableCompanyId}`,{
                headers :{
                    Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
                }
            })

            const response = await request.data;

            setTorTicketNumber(response.response.length)

            setData((prevState) =>
            prevState.map((item) =>
                item.name === "Ticket" ? { ...item, total: response.response.length } : item
            )
            );

        }catch(e){
            console.error("Error in getting all the tor main: "+e)
        }
        setTimeout(GetAllTORTicket, 5000)
    }

    async function GetAllTORFuel(){

        try{

            const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/tor/fuel/${filterTableCompanyId}`,{
                headers :{
                    Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
                }
            })

            const response = await request.data;

            console.log(response.response.length)

            setTorFuelNumber(response.response.length)

            setData((prevState) =>
            prevState.map((item) =>
                item.name === "Fuel" ? { ...item, total: response.response.length } : item
            )
            );

        }catch(e){
            console.error("Error in getting all the tor main: "+e)
        }
        setTimeout(GetAllTORFuel, 5000)
    }

    async function GetAllTORRemittance(){

        try{

            const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/tor/remittance/${filterTableCompanyId}`,{
                headers :{
                    Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
                }
            })

            const response = await request.data;


            setTorRemittance(response.response.length)

            setData((prevState) =>
            prevState.map((item) =>
                item.name === "Remittance" ? { ...item, total: response.response.length } : item
            )
            );

        }catch(e){
            console.error("Error in getting all the tor remittance: "+e)
        }
        setTimeout(GetAllTORRemittance, 5000)
    }

    async function GetAllTORTrip(){

        try{

            const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/tor/trip/${filterTableCompanyId}`,{
                headers :{
                    Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
                }
            })

            const response = await request.data;

            setTorTrip(response.response.length)

            setData((prevState) =>
            prevState.map((item) =>
                item.name === "Trip" ? { ...item, total: response.response.length } : item
            )
            );

        }catch(e){
            console.error("Error in getting all the tor main: "+e)
        }
        setTimeout(GetAllTORTrip, 5000)
    }

    async function GetAllTORInspection(){

        try{

            const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/tor/inspection/${filterTableCompanyId}`,{
                headers :{
                    Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
                }
            })

            const response = await request.data;

            setTorInspection(response.response.length)

            setData((prevState) =>
            prevState.map((item) =>
                item.name === "Inspection" ? { ...item, total: response.response.length } : item
            )
            );

        }catch(e){
            console.error("Error in getting all the tor main: "+e)
        }
        setTimeout(GetAllTORInspection, 5000)
    }


    async function GetAllTORViolation(){

        try{

            const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/tor/violation/${filterTableCompanyId}`,{
                headers :{
                    Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
                }
            })

            const response = await request.data;

            setTorViolation(response.response.length)

            setData((prevState) =>
            prevState.map((item) =>
                item.name === "Violation" ? { ...item, total: response.response.length } : item
            )
            );

        }catch(e){
            console.error("Error in getting all the tor main: "+e)
        }
        setTimeout(GetAllTORViolation, 5000)
    }

    async function GetAllTORTrouble(){

        try{

            const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/tor/trouble/${filterTableCompanyId}`,{
                headers :{
                    Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
                }
            })

            const response = await request.data;

            setTorTrouble(response.response.length)

            setData((prevState) =>
            prevState.map((item) =>
                item.name === "Trouble" ? { ...item, total: response.response.length } : item
            )
            );

        }catch(e){
            console.error("Error in getting all the tor main: "+e)
        }
        setTimeout(GetAllTORTrouble, 5000)
    }

    //const navigate = useNavigate();

    useEffect(() =>{

       

        GetAllTORRemittance();

        GetAllTORMain();

        GetAllTORTicket();

        GetAllTORFuel();

        GetAllTORTrip();

        GetAllTORInspection();

        GetAllTORViolation(); 

        GetAllTORTrouble();

        return () =>{}


    },[filterTableCompanyId])
    
    useEffect(() => {

    

        return () => {}

    },[torMainNumber, torTicket, torFuel, torRemittance, torTrip, torInspection, torViolation, torTrouble])
    return(
        <div  >
        <NavBar>
           <HeaderCard title="DASHBOARD"/>
           {localStorage.getItem('role') === "Administrator" ? 
           <div className="mt-3  bg-white border border-gray-200 rounded-lg shadow-lg p-4"> 
           
           
          
          <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
            <InputLabel id="filter-company-demo-simple-select-autowidth-label">Company</InputLabel>
            <Select
              labelId="filter-company-demo-demo-simple-select-autowidth-label"
              id="filter-company-demo-demo-simple-select-autowidth"
              value={filterTableCompanyId}
              onChange={(event) => setFilterTableCompanyId(event.target.value)}
              autoWidth
              label="Company"
            >
              {/* {localStorage.getItem('role') === "Administrator" ? 
          <MenuItem key ="seapps" value={"Sburoot@123" }>Seapps-inc</MenuItem>
          :
          null
          } */}
              {
        Object(coopList).length === 0? (<></>) :
        coopList.map((coop : ICooperative) =>{
          console.log(coop)
          console.log(coop.cooperativeCodeName)
          return (
            <MenuItem value={coop.id}>{coop.cooperativeCodeName}</MenuItem>
          )

        })
        }
            
            </Select>
    </FormControl> :
   
           </div>
           :
           null
    }
           <div className="py-8 mt-1 sm:py-16 ">
  <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-12 md:space-y-0">

          
          <DashboardCard icon ={<BsFileEarmarkTextFill /> } title="TOR MAIN" cardNumber={torMainNumber}/>

          <DashboardCard icon ={<BsTicketPerforatedFill /> } title="TOR TICKET" cardNumber={torTicket}/>

          <DashboardCard icon ={<BsFillFuelPumpFill /> } title="TOR FUEL" cardNumber={torFuel}/>

          <DashboardCard icon ={<BsCurrencyExchange /> } title="TOR REMITTANCE" cardNumber={torRemittance}/>

          <DashboardCard icon ={<BsFillSignpostFill /> } title="TOR TRIP" cardNumber={torTrip}/>
          <DashboardCard icon ={<BsFillClipboardCheckFill />} title="TOR INSPECTION" cardNumber={torInspection}/>

          <DashboardCard icon ={<BsFillExclamationTriangleFill />} title="TOR VIOLATION" cardNumber={torViolation}/>
          
          <DashboardCard icon ={<BsEmojiDizzyFill />} title="TOR TROUBLE" cardNumber={torTrouble}/>
        </div>
        
    
        
    </div>




    <div className="mt-0  bg-white border border-gray-200 rounded-lg shadow-lg p-4">  
   
    <ResponsiveContainer  className="flex items-center" width="100%" height={400}>
   
    <BarChart
     
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#161d6f" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          {/* <Bar dataKey="uv" fill="#ff0000" activeBar={<Rectangle fill="gold" stroke="red" />} /> */}
        </BarChart>
        </ResponsiveContainer>
      
    </div>

        </NavBar>
        </div>
    )

}




