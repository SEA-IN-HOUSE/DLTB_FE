// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
import NavBar from "../components/NavBar";
import Paper from "../components/Paper";
import { GridColDef, GridRowsProp, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter  } from '@mui/x-data-grid';
import { DataGridPremium } from '@mui/x-data-grid-premium/DataGridPremium';
import {useEffect,  useState} from 'react'
import Box from '@mui/material/Box';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputLabel, LinearProgress, MenuItem, Select, Tab, Tabs, TextField } from "@mui/material";
//import PersonAddIcon from '@mui/icons-material/PersonAdd';
import axios from 'axios';
import SyncIcon from '@mui/icons-material/Sync';
import { useNavigate } from "react-router-dom";
import { ICooperative } from "./Employee";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import moment from 'moment'
import { BsCurrencyExchange,BsTicketPerforatedFill,BsBagCheck,BsFillSignpostFill,BsFillBusFrontFill,BsFillClipboardCheckFill,BsExclamationTriangle, BsFillEmojiSmileFill ,BsFillTruckFrontFill,BsFillMapFill    } from "react-icons/bs";
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import PrintIcon from '@mui/icons-material/Print';
import { ComponentToPrint } from '../components/ComponentToPrint';
import CountUp from 'react-countup';
import '../styles/RemoveProWaterMark.css'
import Chip from '@mui/material/Chip';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { useInterval } from 'usehooks-ts'

import { BiBus, BiMoney,BiTrip } from "react-icons/bi";

import { IoIosPeople } from "react-icons/io";

import { LuBaggageClaim } from "react-icons/lu";

import { SiCashapp } from "react-icons/si";

import { ToastContainer, toast } from 'react-toastify';

import CloseIcon from '@mui/icons-material/Close';
import { FaCashRegister } from "react-icons/fa";

import { styled} from '@mui/system';

import AddIcon from '@mui/icons-material/AddHomeWork';
  const rows: GridRowsProp = [
   
  ];

  const bankRows: GridRowsProp = [
   
  ];

  const StyledDataGrid = styled(DataGridPremium)((theme) => ({
    "& .MuiDataGrid-sortIcon": {
    opacity: 1,
    color: "white",
    },
    "& .MuiDataGrid-menuIconButton": {
    opacity: 1,
    color: "white"
    },
    }));


  

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 0, marginTop: 2 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }


export  function RoutesPage(){


  //tab

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const [isSyncing, setIsSyncing] = useState(false)
  const [total, setTotal] = useState(0);

  const [totalTicket, setTotalTicket] = useState(0);

  const [totalBaggage, setTotalBaggage] = useState(0);

  const [grandTotal, setGrandTotal] = useState(0);

  const [coopList, setCoopList] = useState([]);

  const [filterTableCompanyId, setFilterTableCompanyId] = useState(localStorage.getItem('companyId'));

  const [fromDate , setFromDate] = useState(null);

  const [toDate,  setToDate] = useState(null)

  const [filterType, setFilterType] = useState("");

  const [filterData, setFilterData] = useState(null);
  
  const [filterApplied, setFilterApplied] = useState(false)

  const [isLoading, setIsLoading] = useState(false);

  const [totalPassenger, setTotalPassenger] = useState(0);

  const [totalBaggageGet, setTotalBaggageGet] = useState(0);

  const [totalCashCollection, setTotalCashCollection] = useState(0);

  const [dataPerReferenceNo, setDataPerReferenceNo] = useState([]);

  const [numberOfRoutes, setNumberOfRoutes] = useState(0);


async function GetCooperative(){
  setIsSyncing(false)
  try{

    const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/cooperative`,{
      headers :{
          Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
      }
  })
      
      const response = await request.data;
      
      if(response.messages[0].code === '0'){
  
        setCoopList(
          
          // eslint-disable-next-line @typescript-eslint/no-explicit-any  
          response.response.map((coop : any ) =>{
    
            
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
},[filterTableCompanyId])


const routeColumns: GridColDef[] = [
  
  { 
    field: 'bound', 
    headerName: 'BOUND', 
    headerClassName: 'super-app-theme--header',
    editable: false,
    width: 180,
    headerAlign: 'center',
    align: 'center',
   
  },
  { 
    field: 'origin', 
    headerName: 'ORIGIN', 
    headerClassName: 'super-app-theme--header',
      editable: false,
      width: 280,
      headerAlign: 'center',
      align: 'center',
  },

  { 
    field: 'destination', 
    headerName: 'DESTINATION', 
    headerClassName: 'super-app-theme--header',
    editable: false,
    width: 280,
    headerAlign: 'center',
    align: 'center',
   
  },

  { 
    field: 'code', 
    headerName: 'ROUTE CODE', 
    headerClassName: 'super-app-theme--header',
    editable: false,
    width: 180,
    headerAlign: 'center',
    align: 'center',
   
  },
  { 
    field: 'minimum_fare', 
    headerName: 'MINIMUM FARE', 
    headerClassName: 'super-app-theme--header',
      editable: false,
      width: 180,
      headerAlign: 'center',
      align: 'center',
   
  },

  { 
    field: 'discount', 
    headerName: 'DISCOUNT', 
    headerClassName: 'super-app-theme--header',
    editable: false,
    width: 180,
    headerAlign: 'center',
    align: 'center',
   
  },
  { 
    field: 'first_km', 
    headerName: 'FIRST KM', 
    headerClassName: 'super-app-theme--header',
      editable: false,
      width: 180,
      headerAlign: 'center',
      align: 'center',
   
  },
  { 
    field: 'pricePerKM', 
    headerName: 'PRICE PER KM', 
    headerClassName: 'super-app-theme--header',
      editable: false,
      width: 180,
      headerAlign: 'center',
      align: 'center',
   
  },
  {
    field: 'coopId', // Assuming you have a 'name' field in your data source
    headerName: 'COMPANY',
    flex: 1,
    minWidth: 180,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    editable: false,
    valueGetter: (params) => {
      // Assuming your data source is an array of objects with 'coopId' and 'name' fields
      const { coopId } = params.row;
      // Assuming your data is stored in a variable named 'data'
      const matchingItem : any = coopList.find((item : ICooperative) => item.id === coopId);
      return matchingItem ? matchingItem.cooperativeCodeName : ''; // Display the name or an empty string if not found
    },
  },

  { 
    field: 'createdAt', 
    headerName: 'DATE CREATED', 
    headerClassName: 'super-app-theme--header',
      editable: false,
      width: 180,
      headerAlign: 'center',
      align: 'center',
    valueFormatter: (params) => {
      return moment(params.value).format('MMMM D, YYYY');
    },
  },

  ];
  


  

  const columnsBank: GridColDef[] = [
    { 
      field: 'reference_no', 
      headerName: 'REFERENCE NO', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 220,
      headerAlign: 'center',
      align: 'center',
    },

    { 
      field: 'trace_no', 
      headerName: 'TRACE NO', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 220,
      headerAlign: 'center',
      align: 'center',
    },

    { 
      field: 'batch_no', 
      headerName: 'BATCH NO', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 220,
      headerAlign: 'center',
      align: 'center',
    },

    { 
      field: 'funding_account_no', 
      headerName: 'FUNDING ACCOUNT NO', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 220,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'sender_name', 
      headerName: 'SENDER NAME', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 220,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'destination_bank', 
      headerName: 'DESTINATION BANK', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 220,
      headerAlign: 'center',
      align: 'center',
    },

    { 
      field: 'recipient_name', 
      headerName: 'RECIPIENT NAME', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 220,
      headerAlign: 'center',
      align: 'center',
    },

    { 
      field: 'amount', 
      headerName: 'AMOUNT', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 220,
      headerAlign: 'center',
      align: 'center',
    },

    { 
      field: 'total_fee', 
      headerName: 'TOTAL FEE', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 220,
      headerAlign: 'center',
      align: 'center',
    },

    { 
      field: 'status', 
      headerName: 'STATUS', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 220,
      headerAlign: 'center',
      align: 'center',
    },

    { 
      field: 'remarks', 
      headerName: 'REMARKS', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 220,
      headerAlign: 'center',
      align: 'center',
    },

    { 
      field: 'transaction_date_and_time', 
      headerName: 'DATE/TIME OF TRANSACTION', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 220,
      headerAlign: 'center',
      align: 'center',
    },

    { 
      field: 'date', 
      headerName: 'DATE REMITTED', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 220,
      headerAlign: 'center',
      align: 'center',
    },

    { 
      field: 'dateCreated', 
      headerName: 'DATE CREATED', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 220,
      headerAlign: 'center',
      align: 'center',
    },

    ];
    
    

  const navigate = useNavigate();
  useEffect(() =>{

    if(!localStorage.getItem('token')){
      localStorage.clear();
      navigate('/login')
    }
    

    if(!localStorage.getItem('pageCode')?.includes("tTicket, ") && localStorage.getItem('role') !== "Administrator" && localStorage.getItem('role') !== "User Admin" && localStorage.getItem('role') !== "Attorney"){
      navigate('/dashboard')
    }

    return () =>{}

},[])

    const [tableRows, setTableRows] = useState(rows)

    const [bankTableRows, setBankTableRows] = useState(bankRows)

    const [bound , setBound] = useState("")
    const [origin, setOrigin] = useState("")
    const [route_code, setRouteCode] = useState("")
    const [destination, setDestination] = useState("")
    
    const [isModalOpen, setIsModalOpen] = useState(false)
  
    const [coopId, setCoopId] = useState("");
  
    const [minimum_fare, setMinimumFare] = useState(0);
  
    const [discount , setDiscount] = useState(0);
  
    const [firstKm, setFirstKm] = useState(0);
  
    const [pricePerKM, setPricePerKM] = useState(0);

   

    useEffect(() =>{

      return () =>{}
    },[fromDate, toDate])
      
   
 
  
      
    

    useEffect(() =>{

    },[tableRows])

    async function SyncData(){


    } 

    async function AddData() {
      try {
  
        // minimum_fare
        // 61
        // discount
        // 20
        // first_km
        // 26
        // pricePerKM
        // 2.35
        event?.preventDefault()
        // Define the request data as an object
        const requestData = {
          coopId: coopId,
          bound: bound, // Assuming empNo and cardId are variables in your scope
          origin: origin,
          code : route_code,
          destination: destination,
          minimum_fare: minimum_fare,
          discount: discount,
          first_km: firstKm,
          pricePerKM: pricePerKM,
        };
    
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/directions`,
          requestData, // Use the requestData object as the request data
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
            },
          }
        );
    
        // Note that there's no need to use `await` on response.data directly
        // as axios already returns the response data.
        const responseData = response.data;
          console.log(responseData)
  
          if(responseData.messages[0].code === "0"){
            
            GetAllData();
        
            toast.success("Success", {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              });
           }else{
            toast.warning(responseData.messages[0].message, {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              });
           }
     
    
      }catch (error) {
          console.error(error);
          toast.error(`Action failed error: ${error}`, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        }finally{
          setIsModalOpen(!isModalOpen)
        }
    }

      //Toolbar
      function CustomToolbar() {

        return (<>
            
            <GridToolbarContainer
            style=
            {{
              marginBottom: '2px',
            }}
            >
            <Button variant="contained"  startIcon = {<AddIcon />} color="success" onClick={ () =>{
              setIsModalOpen(true)
            }}>
            Add Route
          </Button>
    
          <GridToolbarColumnsButton style ={{color:"#161d6f"}} />
              <GridToolbarFilterButton style ={{color:"#161d6f"}} />
              <GridToolbarDensitySelector style ={{color:"#161d6f"}} />
              <GridToolbarExport style ={{color:"#161d6f"}} />
              <GridToolbarQuickFilter  style ={{color:"#161d6f"}}/>
              {localStorage.getItem('role') === "Administrator" ? 
            
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
      null
            }
            </GridToolbarContainer>
           
          </>
          );
        } 


function BankCustomToolbar() {

  const spinnerStyle = {
    animation: 'spin 1s linear infinite',
  };

  const keyframesStyle = `
    @keyframes spin {
      0% { transform: rotate(360deg); }
      100% { transform: rotate(0deg); }
    }
  `;


  return (
    <>
     
     <GridToolbarContainer
          style=
          {{
            marginBottom: '2px',
          }}
        >
          
          {isSyncing ?  (<style>{keyframesStyle}</style>) : null}
         {localStorage.getItem('role') === "Administrator" ? 
            <Button variant="contained"  onClick ={SyncData} color="success" startIcon={<SyncIcon style={spinnerStyle} />}>{isSyncing ? "SYNCING..." : "SYNC"}</Button>
            :
            null
          }
          <Button variant="contained"  startIcon = {<FaCashRegister  />} color="success"  onClick={ () =>{
          setIsModalOpen(true)
        }}>
        Add Transaction
      </Button>
            <GridToolbarColumnsButton style ={{color:"#161d6f"}} />
            {/* <GridToolbarFilterButton style ={{color:"#161d6f"}} /> */}
            <GridToolbarDensitySelector style ={{color:"#161d6f"}} />
            <GridToolbarExport style ={{color:"#161d6f"}} />

{/* 
            <Button onClick={handlePrint} startIcon={<PrintIcon />} style ={{color:"#161d6f"}}>
              Print
            </Button>    */}
            {/* <GridToolbarQuickFilter  style ={{color:"#161d6f"}}/> */}
            {localStorage.getItem('role') === "Administrator" ? 
        
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
      
          return (
            <MenuItem value={coop.id}>{coop.cooperativeCodeName}</MenuItem>
          )

        })
        }
            
            </Select>
    </FormControl> :
    null
          }
      </GridToolbarContainer>
    </>
  );

}   


const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });



  async function GetFilterData(){

   
      
      try{
        setIsLoading(true)
        const bodyParameters = {
          filterData: filterData,
          filterType: filterType,
          fromDate: fromDate,
          toDate:toDate,
        }

    const request = await axios.post(`${import.meta.env.VITE_BASE_URL}/directions/filter/${filterTableCompanyId}`,bodyParameters,{
      headers :{
          Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
      }
  })
      
      const response = await request.data;

      console.log("THIS IS THE ROUTE RESPONSE")
      console.log(response)
  
      if(response.messages[0].code === 0){
  
  
        if(JSON.stringify(response.response) !== JSON.stringify(tableRows)){
          
      
          
       
            setTableRows(
            
              response.response.map((data : any) =>{

                console.log(`This is the response`)
                console.log(data)
            
                return {id: data._id, ...data}
              })
            )
            
            setNumberOfRoutes(() => response.response.length)

            let totalTrip = 0;
  
            response.response.map((data : any) =>{
              totalTrip = totalTrip + 1;
             })
            
            setTotal(() => totalTrip)
         
            setTotalTicket(() => 0)
            
             let totalBus = 0;

             let totalTrips = 0;

             let totalNumberOfPassenger = 0;
             
             let totalBaggageNumber = 0;

             let totalRevenueAtm = 0;
  
            response.response.map((data : any) =>{

            totalBus = totalBus + data.bus_unit;

            totalTrips = totalTrips + data.trip;

            totalNumberOfPassenger = totalNumberOfPassenger + data.no_of_passenger;   
            
            totalBaggageNumber = totalBaggageNumber + data.no_of_baggage

            totalRevenueAtm = totalRevenueAtm + data.cash_collection;
            })

            setTotalTicket(() =>totalBus)
  
            setTotalBaggage(() => totalTrips);
  
            setGrandTotal(() => totalNumberOfPassenger)

            setTotalPassenger(() =>totalNumberOfPassenger)

            setTotalBaggageGet(() =>totalBaggageNumber)
  
            setTotalCashCollection(() => totalRevenueAtm)
  
        }     
     
      }
  
      setIsLoading(false)
  
  }catch(e){
 
      console.log("ERROR = "+ e)
  }finally{
    setIsLoading(false)
  }
  

}




async function GetTransactionData(){

   
      
  try{
    setIsLoading(true)
  

const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/transcation-report`,{
  headers :{
      Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
  }
})
  
  const response = await request.data;

  if(response.messages[0].code === 0){


    if(JSON.stringify(response.response) !== JSON.stringify(bankRows)){
      
  
      
      console.log(`Bank transfer`)
      console.log(response.response)
        setBankTableRows(
        
          response.response.map((data : any) =>{

            console.log(`This is the response`)
            console.log(data)
        
            return {id: data._id, ...data}
          })
        )
         
       
    }     
 
  }

  setIsLoading(false)

}catch(e){

  console.log("ERROR = "+ e)
}finally{
setIsLoading(false)
}


}



useInterval(() => {
  if(!isLoading){
    GetFilterData();
    GetTransactionData();
  }else{
    () =>{}
  }
 
}, 15000);


useEffect(()=>{
  
  GetFilterData();
  GetTransactionData();
  return () =>{
   
  }

},[filterData, filterType, toDate, fromDate])

useEffect(() =>{

 
  return () => {
    console.log(`Table refresh`)
  }

}, [tableRows, bankTableRows])

useEffect(() =>{

  return() =>{}
}, [filterData])





return(
      <div 
       style={{
        backgroundColor: '#e2e8f0',
        height:'auto'
      }}
      >
    <NavBar>

    <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        />
 

    <div className="invisible absolute">
    <ComponentToPrint  
    ref={componentRef} 
    rows ={tableRows} 
    columns ={routeColumns}
    grandTotal ={grandTotal}
    />
    </div>
    <Dialog open={isModalOpen} onClose={() => setIsModalOpen(!isModalOpen)} fullWidth>
     <form onSubmit={AddData}>
     <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add Route
        </DialogTitle>
      
        <IconButton
          aria-label="close"
          onClick={() => setIsModalOpen(!isModalOpen)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
      
          <CloseIcon />
        </IconButton>

        <DialogContent dividers>
          <DialogContentText>
            {/* To subscribe to this website, please enter your email address here. We
            will send updates occasionally. */}
          </DialogContentText>

          <FormControl fullWidth margin="dense">
  <InputLabel id="demo-simple-select-label">Cooperative</InputLabel>
  <Select
    labelId="demo-simple-select-label-coopId"
    id="demo-simple-select-coopId"
    value={coopId}
    defaultValue= {coopId}
    label="Cooperative"
    onChange={(event) => setCoopId(event?.target.value)}
    required
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
         
          <FormControl fullWidth sx ={{marginTop: 1}}>
        <InputLabel id="demo-simple-select-helper-label">Bound</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={bound}
          label="Bound"
          required
          defaultValue={""}        
          onChange={(event) => setBound(event.target.value)}
        >
          <MenuItem value={"NORTH"}>NORTH</MenuItem>
          <MenuItem value={"EAST"}>EAST</MenuItem>
          <MenuItem value={"WEST"}>WEST</MenuItem>
          <MenuItem value={"SOUTH"}>SOUTH</MenuItem>
            
        </Select>
        {/* <FormHelperText>With label + helper text</FormHelperText> */}
      </FormControl>

          <TextField
            autoFocus
            margin="dense"
            id="origin"
            name ="origin"
            label="Origin"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(event) => setOrigin(event.target.value)}
          />

          <TextField
            autoFocus
            margin="dense"
            id="route_code"
            name ="route_code"
            label="Route Code"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(event) => setRouteCode(event.target.value)}
          />
          
          <TextField
            autoFocus
            margin="dense"
            id="destination"
            name ="destination"
            label="Destination"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(event) => setDestination(event.target.value)}
          />

          <TextField
            autoFocus
            margin="dense"
            id="discount"
            name ="discount"
            label="Discount"
            type="number"
            fullWidth
            variant="outlined"
            onChange={(event) => setDiscount(parseFloat(event.target.value))}
          />
           <TextField
            autoFocus
            margin="dense"
            id="firstKm"
            name ="firstKm"
            label="First KM"
            type="number"
            fullWidth
            variant="outlined"
            onChange={(event) => setFirstKm(parseFloat(event.target.value))}
          />

<TextField
            autoFocus
            margin="dense"
            id="miniumFare"
            name ="miniumFare"
            label="Minimum Fare"
            type="number"
            fullWidth
            variant="outlined"
            onChange={(event) => setMinimumFare(parseFloat(event.target.value))}
          />

<TextField
            autoFocus
            margin="dense"
            id="pricePerKM"
            name ="pricePerKM"
            label="Price Per KM"
            type="number"
            fullWidth
            variant="outlined"
            onChange={(event) => setPricePerKM(parseFloat(event.target.value))}
          />
        
        
         
        </DialogContent>
        
        <DialogActions sx={{marginRight: 2, marginLeft: 2}}>
        
          <Button onClick={() => setIsModalOpen(!isModalOpen)}>Cancel</Button>
          <Button type ="submit" variant="contained" color="success">Save</Button>
        </DialogActions>
        </form>
  </Dialog>
  
   
    <div className="relative block mt-10  p-12 bg-white border border-gray-200 rounded-lg shadow-lg"
        style ={{
            height: 'auto'
        }}
        >
            <h1 className="mb-2 text-5xl  font-bold tracking-tight text-indigo-900">ROUTES / STATIONS</h1>
        </div>


        <div className="sm:py-6">
  <div className="space-y-0 md:grid md:grid-cols-0 lg:grid-cols-1 xl:grid-cols-1 md:gap-1 md:space-y-0">
  
     
<div className=" bg-white border border-gray-200 rounded-lg shadow-lg p-4">  
  <div className="flex items-center">
    <div className="inline-flex flex-shrink-0 justify-center items-center w-12 h-12 text-white bg-gradient-to-br from-blue-900 to-[#161d6f] rounded-lg" >
      
        {<BsFillTruckFrontFill  />}
    </div>
    <div className="flex-shrink-0 ml-3">
      <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl"> <CountUp end={total} /></span>
      <h3 className="text-base font-normal text-gray-500">{"NO. ROUTES"}</h3>
    </div>
  </div>
</div>

{/* <div className=" bg-white border border-gray-200 rounded-lg shadow-lg p-4">  
  <div className="flex items-center">
    <div className="inline-flex flex-shrink-0 justify-center items-center w-12 h-12 text-white bg-gradient-to-br from-blue-900 to-[#161d6f] rounded-lg" >
      
        {<BsFillMapFill    />}
    </div>
    <div className="flex-shrink-0 ml-3">
      <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl"><CountUp end={totalTicket} /></span>
      <h3 className="text-base font-normal text-gray-500">{"TOTAL STATION "}</h3>
    </div>
  </div>
</div> */}
{/* 
<div className=" bg-white border border-gray-200 rounded-lg shadow-lg p-4">  
  <div className="flex items-center">
    <div className="inline-flex flex-shrink-0 justify-center items-center w-12 h-12 text-white bg-gradient-to-br from-blue-900 to-[#161d6f] rounded-lg" >
      
        {<BiTrip    />}
    </div>
    <div className="flex-shrink-0 ml-3">
      <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl"><CountUp end={totalBaggage} /></span>
      <h3 className="text-base font-normal text-gray-500">{"TOTAL TRIP "}</h3>
    </div>
  </div>
</div>


<div className=" bg-white border border-gray-200 rounded-lg shadow-lg p-4">  
  <div className="flex items-center">
    <div className="inline-flex flex-shrink-0 justify-center items-center w-12 h-12 text-white bg-gradient-to-br from-blue-900 to-[#161d6f] rounded-lg" >
      
        {<IoIosPeople     />}
    </div>
    <div className="flex-shrink-0 ml-3">
      <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl"><CountUp end={totalPassenger} /></span>
      <h3 className="text-base font-normal text-gray-500">{"TOTAL PASSENGER "}</h3>
    </div>
  </div>
</div>

<div className=" bg-white border border-gray-200 rounded-lg shadow-lg p-4">  
  <div className="flex items-center">
    <div className="inline-flex flex-shrink-0 justify-center items-center w-12 h-12 text-white bg-gradient-to-br from-blue-900 to-[#161d6f] rounded-lg" >
      
        {<LuBaggageClaim     />}
    </div>
    <div className="flex-shrink-0 ml-3">
      <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl"><CountUp end={totalBaggageGet} /></span>
      <h3 className="text-base font-normal text-gray-500">{"TOTAL BAGGAGE "}</h3>
    </div>
  </div>
</div>


<div className=" bg-white border border-gray-200 rounded-lg shadow-lg p-4">  
  <div className="flex items-center">
    <div className="inline-flex flex-shrink-0 justify-center items-center w-12 h-12 text-white bg-gradient-to-br from-blue-900 to-[#161d6f] rounded-lg" >
      
        {<SiCashapp     />}
    </div>
    <div className="flex-shrink-0 ml-3">
      <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl">₱ <CountUp end={totalCashCollection} /></span>
      <h3 className="text-base font-normal text-gray-500">{"TOTAL CASH COLLECTION "}</h3>
    </div>
  </div>
</div> */}



  </div>


  </div>



        <Paper style={{width: '100%', marginTop: '10px' }}>
            <Box sx = {{
            '& .super-app-theme--header': {
            backgroundColor: '#161d6f',
            color:'white',
            },
            height:'400'
            }}>
           
           <div className="flex flex-row space-x-4 items-center mb-2">
           <LocalizationProvider dateAdapter={AdapterDayjs}  >
              <DemoContainer components={['DateTimePicker']} >
                <DateTimePicker 
                label="Filter From" 
             
                onChange={(newValue) => setFromDate(() => newValue)}
                 />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DateTimePicker']} >
                <DateTimePicker 
                label="Filter To" 
                onChange={(newValue) => setToDate(() => newValue)}
         
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>

        

              <div className="flex flex-row space-x-4 items-center">
                <FormControl  margin="dense"  style={{ width: '100%', maxWidth: '500px' }}>
                  <InputLabel id="demo-simple-select-label">Filter By</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filterType}
                    label="Filter By"
                    value={filterType}
                    onChange={(event) => setFilterType( () => event.target.value)}
                    MenuProps={{ PaperProps: { style: { maxHeight: 264 } } }}
                  >
                    <MenuItem value={"None"}>{"None"}</MenuItem>
                    {routeColumns.map((column) => (
                      <MenuItem value={column.field}>{column.field.replace(/_/g, ' ').toUpperCase()}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                 id="filterData" 
                label="Filter Data" 
                variant="outlined" 
                value={filterData}
                margin="dense"
                fullWidth
                onChange={(event) => setFilterData(() => event.target.value)}
                 />
             
              </div>

              <div>
         
        
        </div>
        <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
        value={value} 
        onChange={handleChange} 
        aria-label="basic tabs example"
        variant="scrollable"
        scrollButtons="auto"
        >
        <Tab label="Routes" {...a11yProps(0)} />
          {
            Object(tableRows).length > 0  ?
            tableRows.map((data : any , index) =>{
              return <Tab label={data.origin+"-"+data.destination} {...a11yProps(index+1)} />
            }) 
            :
            <></>
          }
          
          
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
      <Box sx = {{
            '& .super-app-theme--header': {
            backgroundColor: '#161d6f',
            color:'white',
            },
            height:700
            }}>
             
            <StyledDataGrid
           initialState={{ pinnedColumns: { left: ['reference_no']} }}
            rows={tableRows} columns={routeColumns}
            loading = {isLoading}
             slots={{toolbar: CustomToolbar, loadingOverlay: LinearProgress}}
             sx={{
              '& .MuiDataGrid-cell': {
                fontSize: '1rem',
                padding: '15px',
              },
            }}
            />
         </Box>
      </CustomTabPanel>

      {
            Object(tableRows).length > 0  ?
            tableRows.map((data : any , index) =>{
              console.log(`ROUTE ID ${data.id}`)
              console.log(`COOP ID ${data.coopId}`)
              return (
                <CustomTabPanel value={value} index={index+1}>
                <Box sx = {{
                      '& .super-app-theme--header': {
                      backgroundColor: '#161d6f',
                      color:'white',
                      },
                      height:700
                      }}>
                       
                      <StationDatatables
                  routeId = {data.id}
                  coopId = {data.coopId}
                  coops = {coopList}
                      />
                   </Box>
                </CustomTabPanel>
              )
            }) 
            :
            <></>
          }
   

      </Box>
        </Box>
        </Paper>   
    </NavBar>
    </div>)
}


function StationDatatables(props){

  const [isLoading ,setIsLoading] = useState(false)

  const [coopList, setCoopList] = useState(props.coops)

  const [isModalOpen, setIsModalOpen] = useState(false)
  

  const stationColumns: GridColDef[] = [

    { 
      field: 'stationName', 
      headerName: 'STATION NAME', 
      flex: 1,
          minWidth: 0,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center',
      editable: false,
     
    },
    { 
      field: 'km', 
      headerName: 'KILOMETER', 
      flex: 1,
          minWidth: 0,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center',
      editable: false,
     
    },
 
    { 
      field: 'rowNo', 
      headerName: 'ROW NO', 
      flex: 1,
          minWidth: 0,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center',
      editable: false,
     
    },
  
    { 
      field: 'routeId', 
      headerName: 'ROUTE ID', 
      width: 350,
      headerClassName: 'super-app-theme--header',
      editable: false,
     headerAlign: 'center',
      align: 'center',
     
    },

    {
      field: 'coopId', // Assuming you have a 'name' field in your data source
      headerName: 'COMPANY',
      flex: 1,
      minWidth: 180,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center',
      editable: false,
      valueGetter: (params) => {
        // Assuming your data source is an array of objects with 'coopId' and 'name' fields
        const { coopId } = params.row;
        // Assuming your data is stored in a variable named 'data'
        const matchingItem : any = coopList.find((item : ICooperative) => item.id === coopId);
        return matchingItem ? matchingItem.cooperativeCodeName : ''; // Display the name or an empty string if not found
      },
    },
 
    { 
      field: 'updatedAt', 
      headerName: 'DATE CREATED', 
      flex: 1,
          minWidth: 0,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center',
      editable: false,
      valueFormatter: (params) => {
        return moment(params.value).format('MMMM D, YYYY');
      },
    }
   
    ];

    const stationRows: GridRowsProp = [

    ];

    const [stationTableRows, setStationTableRows] = useState(stationRows)
    
    
    async function GetFilterData(){

   
      
      try{
        setIsLoading(true)
  

    const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/station/${props.routeId}/${props.coopId}`,{
      headers :{
          Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
      }
  })
      
      const response = await request.data;

      console.log("THIS IS THE STATION RESPONSE")
      console.log(response)
  
      if(response.messages[0].code === 0){
  console.log(`TEST PUMASOK SA MESSAGES 0`)

  console.log(response.response)
  
        if(JSON.stringify(response.response) !== JSON.stringify(stationTableRows)){
          
       console.log("PUMASOK DITO!")
          setStationTableRows(
            
              response.response.map((data : any) =>{

                console.log(`This is the response`)
                console.log(data)
            
                return {id: data._id, ...data}
              })
            )
            
    
  
        }     
     
      }
  
      setIsLoading(false)
  
  }catch(e){
 
      console.log("ERROR = "+ e)
  }finally{
    setIsLoading(false)
  }
  

}

useInterval(() => {
  if(!isLoading){
    GetFilterData();
    // GetTransactionData();
  }else{
    () =>{}
  }
 
}, 15000);

useEffect(() =>{
  GetFilterData();
  GetCooperative()
 return () =>{} 
},[])

useEffect(() =>{
  return ()=>{}
},[stationTableRows])

async function GetCooperative(){
  setIsSyncing(false)
  try{

    const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/cooperative`,{
      headers :{
          Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
      }
  })
      
      const response = await request.data;
      
      if(response.messages[0].code === '0'){
  
        setCoopList(
          
          // eslint-disable-next-line @typescript-eslint/no-explicit-any  
          response.response.map((coop : any ) =>{
    
            
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

function CustomToolbar() {

  return (<>
      
      <GridToolbarContainer
      style=
      {{
        marginBottom: '2px',
      }}
      >
      <Button variant="contained"  startIcon = {<AddIcon />} color="success"  onClick={ () =>{
        setIsModalOpen(true)
      }}>
      Add station
    </Button>

    <GridToolbarColumnsButton style ={{color:"#161d6f"}} />
        <GridToolbarFilterButton style ={{color:"#161d6f"}} />
        <GridToolbarDensitySelector style ={{color:"#161d6f"}} />
        <GridToolbarExport style ={{color:"#161d6f"}} />
        <GridToolbarQuickFilter  style ={{color:"#161d6f"}}/>
        {localStorage.getItem('role') === "Administrator" ? 
      
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
null
      }
      </GridToolbarContainer>
     
    </>
    );

}   



const [coopId, setCoopId] = useState("");
    
const [stationName , setStationName] = useState("")

const [km, setKm] = useState("")

const [viceVersaKM, setViceVersaKM] = useState(0)

const [routeId, setRouteId] = useState("");

const [rowNo, setRowNo] = useState(0);





    async function AddStation() {
      try {
      

        event?.preventDefault()
        // Define the request data as an object
        const requestData = {
          coopId: coopId,
          stationName: stationName, // Assuming empNo and cardId are variables in your scope
          km : km,
          viceVersaKM : viceVersaKM,
          routeId : routeId,
          rowNo: rowNo
        };
    
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/station/${filterTableCompanyId}`,
          requestData, // Use the requestData object as the request data
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
            },
          }
        );
    
        // Note that there's no need to use `await` on response.data directly
        // as axios already returns the response data.
        const responseData = response.data;
          console.log(responseData)
       
          if(responseData.messages[0].code === "0"){
          

            GetAllData();
        
            toast.success("Successfully added!", {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              });
           }else{
            toast.warning("Invalid fields!", {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              });
           }
     
    
      } catch (error) {
        console.error(error);
        toast.error(`Action failed error: ${error}`, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      }finally{
        setIsModalOpen(!isModalOpen)
      }
    }
    

    return (<>
     <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={
          {
            width: "100%",
          }
        }
        />

<Dialog open={isModalOpen} onClose={() => setIsModalOpen(!isModalOpen)} fullWidth>
     <form onSubmit={AddStation}>

         <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add Station
        </DialogTitle>
        
        <IconButton
          aria-label="close"
          onClick={() => setIsModalOpen(!isModalOpen)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
      
          <CloseIcon />
        </IconButton>       

        <DialogContent dividers>
          <DialogContentText>
            {/* To subscribe to this website, please enter your email address here. We
            will send updates occasionally. */}
          </DialogContentText>
          
          <FormControl fullWidth margin="dense">
  <InputLabel id="demo-simple-select-label">Cooperative</InputLabel>
  <Select
    labelId="demo-simple-select-label-coopId"
    id="demo-simple-select-coopId"
    value={coopId}
    defaultValue= {coopId}
    label="Cooperative"
    onChange={(event) => setCoopId(event?.target.value)}
    required
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
         
          <TextField
            autoFocus
            margin="dense"
            id="stationName"
            name ="stationName"
            label="Station Name"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(event) => setStationName(event.target.value)}
          />

          <TextField
            autoFocus
            margin="dense"
            id="km"
            name ="km"
            label="Km"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(event) => setKm(event.target.value)}
          />

          {/* <TextField
            autoFocus
            margin="dense"
            id="km"
            name ="viceVersaKM"
            label="Vice Versa Km"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(event) => setViceVersaKM(event.target.value)}
          /> */}

          <TextField
            autoFocus
            margin="dense"
            id="routeId"
            name ="routeId"
            label="Route Id"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(event) => setRouteId(event.target.value)}
          />

          <TextField
            autoFocus
            margin="dense"
            id="rowNo"
            name ="rowNo"
            label="Row Number"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(event) => setRowNo(event.target.value)}
          />

        </DialogContent>
        
        <DialogActions sx={{marginRight: 2, marginLeft: 2}}>
        
          <Button onClick={() => setIsModalOpen(!isModalOpen)}>Cancel</Button>
          <Button type ="submit" variant="contained" color="success">Save</Button>
        </DialogActions>
        </form>
  </Dialog>
  <StyledDataGrid
           initialState={{ pinnedColumns: { left: ['routeId']} }}
            rows={stationTableRows} columns={stationColumns}
            loading = {isLoading}
             slots={{toolbar: CustomToolbar, loadingOverlay: LinearProgress}}
             sx={{
              '& .MuiDataGrid-cell': {
                fontSize: '1rem',
                padding: '15px',
              },
            }}
            />
    </>
      
    )

    
}

