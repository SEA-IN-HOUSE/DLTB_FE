// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
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

import { FormControl, InputLabel,  MenuItem, Select} from "@mui/material";
import { useInterval } from '../components/useInterval'
import BasicRangeShortcuts from "../components/DateRange";

//DA

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

const companyIdInitialState = localStorage.getItem('companyId')

const initialValues = {
    start: new Date('2023-01-01'),
    end: new Date('2023-01-10'),
};

export function Dashboard() : JSX.Element{

    const [coopList, setCoopList] = useState([]);
    const [filterTableCompanyId, setFilterTableCompanyId] = useState(companyIdInitialState);
    const navigate = useNavigate();

    const [torMainNumber, setTorMainNumber] = useState(0);

    const [torTicket, setTorTicketNumber] = useState(0);

    const [torFuel, setTorFuelNumber] = useState(0);

    const [torRemittance, setTorRemittance] = useState(0);

    const [torTrip, setTorTrip] = useState(0);

    const [torInspection, setTorInspection] = useState(0);

    const [torViolation, setTorViolation] = useState(0);

    const [torTrouble, setTorTrouble] = useState(0);

    const [data, setData] = useState(initialState);

    const [grossSales, setGrossSales] = useState(0);

    const [isTorMainLoading, setIsTorMainLoading] = useState(true);

    const [isTorTicketLoading, setTorTicketIsLoading] = useState(true);

    const [isTorFuelLoading, setIsTorFuelLoading] = useState(true);

    const [isTorRemittanceLoading, setIsTorRemittanceLoading] = useState(true);

    const [isTorTripLoading, setIsTorTripLoading] = useState(true);

    const [torInspectionLoading, setTorInspectionLoading] = useState(true);

    const [torViolationLoading, setTorViolationLoading] = useState(true);

    const [torTroubleLoading, setTorTroubleLoading] = useState(true);

    //DATERANGE
   

    const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);


    useEffect(() =>{

        return () =>{}
    },[isTorMainLoading, isTorTicketLoading, isTorFuelLoading, isTorRemittanceLoading, isTorTripLoading, torInspectionLoading, torViolationLoading, torTroubleLoading])

    useEffect(() =>{
  
      if(!localStorage.getItem('token')){
        localStorage.clear();
        navigate('/login')
      }
 
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

    async function GetTotalGrossSales(){

        try{

            const bodyParameters = {
                filterData: "",
                filterType: "",
                fromDate: fromDate,
                toDate:toDate,
              }
              
              console.log("Sample date ", fromDate)
      
      
          const request = await axios.post(`${import.meta.env.VITE_BASE_URL}/tor/ticket/filter/${filterTableCompanyId}`,bodyParameters,{
            headers :{
                Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
            }
        })

            const response = await request.data;
            console.log(`Response`)
            console.log(response)
            let totalFare = 0.00;
           
            response.response.map((data : any) =>{
              totalFare = totalFare + data.fare + data.additionalFare + data.baggage;
             })
             
             console.log(`total fare ${totalFare}`)
             setGrossSales(() => totalFare)

            setData((prevState) =>
            prevState.map((item) =>
                item.name === "Total Gross Sales" ? { ...item, total: totalFare } : item
            )
            );

        }catch(e){
            console.error("Error in getting all the tor main: "+e)
        }
  
    }


    async function GetAllTORMain(){

        try{
            const bodyParameters = {
                filterData: "",
                filterType: "",
                fromDate: fromDate,
                toDate:toDate,
              }
              
              console.log("Sample date ", fromDate)
      
      
          const request = await axios.post(`${import.meta.env.VITE_BASE_URL}/tor/main/filter/${filterTableCompanyId}`,bodyParameters,{
            headers :{
                Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
            }
        })
          

            const response = await request.data;
            console.log("tor main")
            console.log(response.response.length)
            if(response.response.length !== torMainNumber){
                setTorMainNumber(response.response.length)
            }
            
            
            setData((prevState) =>
            prevState.map((item) =>
                item.name === "Main" ? { ...item, total: response.response.length } : item
            )
            );

        }catch(e){
            console.error("Error in getting all the tor main: "+e)
        }

        

    }

    async function GetAllTORTicket(){

        try{

            const bodyParameters = {
                filterData: "",
                filterType: "",
                fromDate: fromDate,
                toDate:toDate,
              }
              
              console.log("Sample date ", fromDate)
      
      
          const request = await axios.post(`${import.meta.env.VITE_BASE_URL}/tor/ticket/filter/${filterTableCompanyId}`,bodyParameters,{
            headers :{
                Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
            }
        })

            const response = await request.data;
            if(response.response.length !== torTicket){
                setTorTicketNumber(response.response.length)
            }
          

            setData((prevState) =>
            prevState.map((item) =>
                item.name === "Ticket" ? { ...item, total: response.response.length } : item
            )
            );

        }catch(e){
            console.error("Error in getting all the tor main: "+e)
        }
        
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

            if(response.response.length !== torFuel){
                setTorFuelNumber(response.response.length)
            }

           

            setData((prevState) =>
            prevState.map((item) =>
                item.name === "Fuel" ? { ...item, total: response.response.length } : item
            )
            );

        }catch(e){
            console.error("Error in getting all the tor main: "+e)
        }
       
    }

    async function GetAllTORRemittance(){

        try{

            const bodyParameters = {
                filterData: "",
                filterType: "",
                fromDate: fromDate,
                toDate:toDate,
              }
              
              console.log("Sample date ", fromDate)
      
      
          const request = await axios.post(`${import.meta.env.VITE_BASE_URL}/tor/remittance/filter/${filterTableCompanyId}`,bodyParameters,{
            headers :{
                Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
            }
        })

            const response = await request.data;


            if(response.response.length !== torRemittance){
                setTorRemittance(response.response.length)
            }

            

            setData((prevState) =>
            prevState.map((item) =>
                item.name === "Remittance" ? { ...item, total: response.response.length } : item
            )
            );

        }catch(e){
            console.error("Error in getting all the tor remittance: "+e)
        }
    
    }

    async function GetAllTORTrip(){

        try{

            const bodyParameters = {
                filterData: "",
                filterType: "",
                fromDate: fromDate,
                toDate:toDate,
              }
              
              console.log("Sample date ", fromDate)
      
      
          const request = await axios.post(`${import.meta.env.VITE_BASE_URL}/tor/trip/filter/${filterTableCompanyId}`,bodyParameters,{
            headers :{
                Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
            }
        })

            const response = await request.data;

            if(response.response.length !== torTrip){
                setTorTrip(response.response.length)
            }
            

            setData((prevState) =>
            prevState.map((item) =>
                item.name === "Trip" ? { ...item, total: response.response.length } : item
            )
            );

        }catch(e){
            console.error("Error in getting all the tor main: "+e)
        }
      
    }

    async function GetAllTORInspection(){

        try{

            const bodyParameters = {
                filterData: "",
                filterType: "",
                fromDate: fromDate,
                toDate:toDate,
              }
              
              console.log("Sample date ", fromDate)
      
      
          const request = await axios.post(`${import.meta.env.VITE_BASE_URL}/tor/inspection/filter/${filterTableCompanyId}`,bodyParameters,{
            headers :{
                Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
            }
        })

            const response = await request.data;

            if(response.respose.length !== torInspection){
                setTorInspection(response.response.length)
            }

           

            setData((prevState) =>
            prevState.map((item) =>
                item.name === "Inspection" ? { ...item, total: response.response.length } : item
            )
            );

        }catch(e){
            console.error("Error in getting all the tor main: "+e)
        }
   
    }


    async function GetAllTORViolation(){

        try{

            const bodyParameters = {
                filterData: "",
                filterType: "",
                fromDate: fromDate,
                toDate:toDate,
              }
              
              console.log("Sample date ", fromDate)
      
      
          const request = await axios.post(`${import.meta.env.VITE_BASE_URL}/tor/violation/filter/${filterTableCompanyId}`,bodyParameters,{
            headers :{
                Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
            }
        })

            const response = await request.data;

            if(response.response.length !== torViolation){
                setTorViolation(response.response.length)
            }

            

            setData((prevState) =>
            prevState.map((item) =>
                item.name === "Violation" ? { ...item, total: response.response.length } : item
            )
            );

        }catch(e){
            console.error("Error in getting all the tor main: "+e)
        }

    }

    async function GetAllTORTrouble(){

        try{

            const bodyParameters = {
                filterData: "",
                filterType: "",
                fromDate: fromDate,
                toDate:toDate,
              }
              
              console.log("Sample date ", fromDate)
      
      
          const request = await axios.post(`${import.meta.env.VITE_BASE_URL}/tor/trouble/filter/${filterTableCompanyId}`,bodyParameters,{
            headers :{
                Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
            }
        })

            const response = await request.data;

            if(response.response.length !== torTrouble){    
                setTorTrouble(response.response.length)
            }   

           

            setData((prevState) =>
            prevState.map((item) =>
                item.name === "Trouble" ? { ...item, total: response.response.length } : item
            )
            );

        }catch(e){
            console.error("Error in getting all the tor main: "+e)
        }
       
    }

    useInterval(() => {
       
        GetAllTORRemittance();

        GetAllTORMain();

        GetAllTORTicket();

        GetAllTORFuel();

        GetAllTORTrip();

        GetAllTORInspection();

        GetAllTORViolation(); 

        GetAllTORTrouble();

        GetTotalGrossSales();
     
          return() =>{}
       
      }, 15000);

    useEffect(() =>{

        GetAllTORRemittance();

        GetAllTORMain();

        GetAllTORTicket();

        GetAllTORFuel();

        GetAllTORTrip();

        GetAllTORInspection();

        GetAllTORViolation(); 

        GetAllTORTrouble();

        GetTotalGrossSales();

        return () =>{}

    },[filterTableCompanyId, fromDate, toDate])
    
    useEffect(() => {

        return () => {}

    },[torMainNumber, torTicket, torFuel, torRemittance, torTrip, torInspection, torViolation, torTrouble])
    return(
        <div style={{
            backgroundColor: '#e2e8f0',
            height:'auto'
        }}>
        <NavBar>
           <HeaderCard title="DASHBOARD"/>
          
           <div className="mt-3  bg-white border border-gray-200 rounded-lg shadow-lg p-4"> 
           {localStorage.getItem('role') === "Administrator" ? 
            <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
                <InputLabel id="filter-company-demo-simple-select-autowidth-label">Company</InputLabel>
                <Select
                labelId="filter-company-demo-demo-simple-select-autowidth-label"
                id="filter-company-demo-demo-simple-select-autowidth"
                value={filterTableCompanyId}
                defaultValue={filterTableCompanyId}
                onChange={(event) => setFilterTableCompanyId(event.target.value)}
                autoWidth
                label="Company"
                >
                
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
            </FormControl> 
                :
                null
           }

         <BasicRangeShortcuts 
         fromDate={fromDate}
         setFromDate={setFromDate}
         toDate={toDate}
         setToDate={setToDate}
          />

            </div>
               
           <div className="py-8 mt-1 sm:py-16 ">
  <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-12 md:space-y-0">

         
          <DashboardCard icon ={<BsFileEarmarkTextFill /> } title="TOR MAIN" cardNumber={torMainNumber} onClick ={() => navigate("/tor/main")} isLoading = {isTorMainLoading}/>
          
          <DashboardCard icon ={<BsTicketPerforatedFill /> } title="TOR TICKET" cardNumber={torTicket} onClick ={() => navigate("/tor/ticket")} isLoading = {isTorTicketLoading} />

          <DashboardCard icon ={<BsFillFuelPumpFill /> } title="TOR FUEL" cardNumber={torFuel} onClick ={() => navigate("/tor/fuel")} isLoading = {isTorFuelLoading} />

          <DashboardCard icon ={<BsCurrencyExchange /> } title="TOR REMITTANCE" cardNumber={torRemittance} onClick ={() => navigate("/tor/remittance")}  isLoading = {isTorRemittanceLoading} />

          <DashboardCard icon ={<BsFillSignpostFill /> } title="TOR TRIP" cardNumber={torTrip} onClick ={() => navigate("/tor/trip")} isLoading = {isTorTripLoading}/>

          <DashboardCard icon ={<BsFillClipboardCheckFill />} title="TOR INSPECTION" cardNumber={torInspection} onClick ={() => navigate("/tor/inspection")} isLoading = {torInspectionLoading}/>

          <DashboardCard icon ={<BsFillExclamationTriangleFill />} title="TOR VIOLATION" cardNumber={torViolation} onClick ={() => navigate("/tor/violation")} isLoading ={torViolationLoading}/>
          
          <DashboardCard icon ={<BsEmojiDizzyFill />} title="TOR TROUBLE" cardNumber={torTrouble} onClick ={() => navigate("/tor/trouble")} isLoading ={torTroubleLoading}/>

        </div>
        <div className= "mt-4">
        <DashboardCard  icon ={<BsCurrencyExchange /> } title="TOTAL GROSS SALES" cardNumber={grossSales}/>
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
        </BarChart>
        </ResponsiveContainer>
      
    </div>

        </NavBar>
        </div>
    )

}