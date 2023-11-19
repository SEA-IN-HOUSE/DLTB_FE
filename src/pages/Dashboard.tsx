import {useState, useEffect } from "react";
import HeaderCard from "../components/HeaderCard";
import NavBar from "../components/NavBar";
//import Paper from "../components/Paper";
import axios from "axios";
import DashboardCard from "../components/DashboardCard";
import { BsCurrencyExchange, BsEmojiDizzyFill, BsFileEarmarkTextFill, BsFillClipboardCheckFill, BsFillExclamationTriangleFill, BsFillFuelPumpFill, BsFillSignpostFill, BsTicketPerforatedFill } from "react-icons/bs";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


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

            const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/tor/main`,{
                headers :{
                    Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
                }
            })

            const response = await request.data;

            setTorMainNumber(response.response.response.data.length)
            
            setData((prevState) =>
            prevState.map((item) =>
                item.name === "Main" ? { ...item, total: response.response.response.data.length } : item
            )
            );

        }catch(e){
            console.error("Error in getting all the tor main: "+e)
        }

    }

    async function GetAllTORTicket(){

        try{

            const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/tor/ticket`,{
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

    }

    async function GetAllTORFuel(){

        try{

            const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/tor/fuel`,{
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

    }

    async function GetAllTORRemittance(){

        try{

            const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/tor/remittance`,{
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

    }

    async function GetAllTORTrip(){

        try{

            const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/tor/trip`,{
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

    }

    async function GetAllTORInspection(){

        try{

            const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/tor/inspection`,{
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

    }


    async function GetAllTORViolation(){

        try{

            const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/tor/violation`,{
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

    }

    async function GetAllTORTrouble(){

        try{

            const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/tor/trouble`,{
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


    },[])
    
    useEffect(() => {

    

        return () => {}

    },[torMainNumber, torTicket, torFuel, torRemittance, torTrip, torInspection, torViolation, torTrouble])
    return(
        <div  style={{
            backgroundColor: '#e2e8f0',
            height:'100vh'
          }}>
        <NavBar>
           <HeaderCard title="DASHBOARD"/>
        
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




    <div className="mt-3  bg-white border border-gray-200 rounded-lg shadow-lg p-4">  

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




