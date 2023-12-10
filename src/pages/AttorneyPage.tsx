// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
import NavBar from "../components/NavBar";
import Paper from "../components/Paper";
import { GridColDef, GridRowsProp, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarDensitySelector, GridToolbarExport,  } from '@mui/x-data-grid';
import { DataGridPremium } from '@mui/x-data-grid-premium/DataGridPremium';
import {useEffect,  useState} from 'react'
import Box from '@mui/material/Box';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, LinearProgress, MenuItem, Select, Tab, Tabs, TextField } from "@mui/material";
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
import { BsCurrencyExchange,BsTicketPerforatedFill,BsBagCheck,BsFillSignpostFill,BsFillBusFrontFill,BsFillClipboardCheckFill,BsExclamationTriangle, BsFillEmojiSmileFill     } from "react-icons/bs";
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


export  function AttorneyPage(){


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



const columns: GridColDef[] = [
  { 
    field: 'tor_no', 
    headerName: 'TOR NO', 
    headerClassName: 'super-app-theme--header',
    editable: false,
    width: 220,
    headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'reference_no', 
    headerName: 'REFERENCE NO', 
    headerClassName: 'super-app-theme--header',
    editable: false,
    width: 180,
    headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'bus_unit', 
    headerName: 'BUS UNIT', 
    headerClassName: 'super-app-theme--header',
    editable: false,
    width: 180,
    headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'trip', 
    headerName: 'TRIP', 
    headerClassName: 'super-app-theme--header',
    editable: false,
    width: 180,
    headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'route', 
    headerName: 'ROUTE', 
    headerClassName: 'super-app-theme--header',
    editable: false,
    width: 280,
    headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'no_of_passenger', 
    headerName: 'NO OF PASSENGER', 
    headerClassName: 'super-app-theme--header',
    editable: false,
    width: 180,
    headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'no_of_baggage', 
    headerName: 'NO OF BAGGAGE', 
    headerClassName: 'super-app-theme--header',
    editable: false,
    width: 180,
    headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'cash_collection', 
    headerName: 'CASH OF COLLECTION', 
    headerClassName: 'super-app-theme--header',
    editable: false,
    width: 180,
    headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'dateCreated', 
    headerName: 'DATETIME', 
    headerClassName: 'super-app-theme--header',
    editable: false,
    width: 280,
    headerAlign: 'center',
    align: 'center',
    valueFormatter: (params) => {
      return moment(params.value).format('MMMM D, YYYY HH:mm');
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


    // const [isSyncing, setIsSyncing] = useState(false);

   

    useEffect(() =>{

      return () =>{}
    },[fromDate, toDate])
      
   
 
  
      
    

    useEffect(() =>{

    },[tableRows])

    async function SyncData(){


    } 

      //Toolbar
function CustomToolbar() {

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

    const request = await axios.post(`${import.meta.env.VITE_BASE_URL}/summary-ticket/filter`,bodyParameters,{
      headers :{
          Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
      }
  })
      
      const response = await request.data;
  
      if(response.messages[0].code === 0){
  
  
        if(JSON.stringify(response.response) !== JSON.stringify(tableRows)){
          
      
          
       
            setTableRows(
            
              response.response.map((data : any) =>{

                console.log(`This is the response`)
                console.log(data)
            
                return {id: data._id, ...data}
              })
            )
             
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


const [isModalOpen, setIsModalOpen] = useState(false)

const [referenceNo, setReferenceNo] = useState("")

const [traceNo, setTraceNo] = useState("")

const [batchNo, setBatchNo] = useState("")

const [fundingAccountNo, setFundingAccountNo] = useState("");

const [senderName, setSenderName] = useState("");

const [destinationBank, setDestinationBank] = useState("");

const [recipientName, setRecipientName] = useState("");

const [amount, setAmount] = useState(0);

const [totalFee, setTotalFee] = useState(0);

const [status, setStatus] = useState("");

const [remarks, setRemarks] = useState("");

const [date, setDate] = useState(null);


async function AddData() {

  if(isReferenceNoError !== true){
    try {

    
      event?.preventDefault()
      // Define the request data as an object
  
      // "reference_no": "1233234",
      // "trace_no":"1233233",
      // "transaction_date_and_time": "06/12/2023 05:03 pm",
      // "batch_no": "231223233",
      // "funding_account_no": "232323123",
      // "sender_name": "string",
      // "destination_bank": "string",
      // "recipient_name": "string",
      // "amount": 5000,
      // "total_fee": 5000,
      // "status": "POSTED",
      // "remarks": ""
      const requestData = {
        "reference_no": referenceNo,
        "trace_no": traceNo,
        "transaction_date_and_time": date,
        "batch_no": batchNo,
        "funding_account_no": fundingAccountNo,
        "sender_name": senderName,
        "destination_bank": destinationBank,
        "recipient_name": recipientName,
        "amount": amount,
        "total_fee": totalFee,
        "status": status,
        "remarks":remarks
      };
  
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/transaction-report`,
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
        if(responseData.messages[0].code === 0){
       
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
      GetTransactionData()
      setIsModalOpen(!isModalOpen)
    }
  }else{
  
    toast.error(`Invalid Fields`, {
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
 
}

const [isReferenceNoError, setIsReferenceNoError] = useState(false);

async function GetDataPerReferenceNo(){

  try {

    event?.preventDefault()
    
   

    const request = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/summary-ticket/reference-no/${referenceNo}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
        },
      }
    );

    const response = await request.data;
   

   
      if(response.messages[0].code === 0){
        console.log("This is the response in reference no: ")
        console.log(response)
        if(response.response.length > 0){
          setIsReferenceNoError(() => false)

          let totalAmount = 0;
         
          response.response.map((data : any)=>{

            console.log(data.cash_collection)
            totalAmount = totalAmount + data.cash_collection;
            
          })
          console.log(`totalAmount this  ${totalAmount}`)
          setAmount(() => totalAmount)
        }else{
          setAmount(() => 0)
          setIsReferenceNoError(() => true)
        }
      
       }else{
       
       }
 

  } catch (error) {
   console.log(`Error in getting per reference no ${error}`)
  }

}


useEffect(() =>{
  GetDataPerReferenceNo();
  return () =>{
   
  }

},[referenceNo])

useEffect(() =>{

  return ()=>{}
},[isReferenceNoError])

useEffect(() =>{

  return () =>{
    console.log(`This is the total amount ${amount}`)
  }
},[amount])

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
    <Dialog open={isModalOpen} onClose={() => setIsModalOpen(!isModalOpen)} fullWidth>
     <form onSubmit={AddData}>

         <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add Transaction
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
   
         {filterType === "reference_no" && filterData !== "" && Object(tableRows).length > 0 ?
          <TextField
          autoFocus
          margin="dense"
          id="referenceNo"
          name ="referenceNo"
          label="Reference No"
          type="text"
          fullWidth
          variant="outlined"
          defaultValue={filterData}
          onChange={(event) => setReferenceNo(() => event.target.value)}
          required
          error = {isReferenceNoError}
          helperText= {
            isReferenceNoError ? 
            "Please input valid reference no."
            :
            ""
          }
        />
        :
        <TextField
          autoFocus
          margin="dense"
          id="referenceNo"
          name ="referenceNo"
          label="Reference No"
          type="text"
          fullWidth
          variant="outlined"
          error = {isReferenceNoError}
          onChange={(event) => setReferenceNo(event.target.value)}
          helperText= {
            isReferenceNoError ? 
            "Please input valid reference no."
            :
            ""
          }
          required
        />
        }
           

            <TextField
              autoFocus
              margin="dense"
              id="traceNo"
              name ="traceNo"
              label="Trace No"
              type="text"
              fullWidth
              variant="outlined"
              onChange={(event) => setTraceNo(event.target.value)}
              required
            />
          
          <TextField
              autoFocus
              margin="dense"
              id="batchNo"
              name ="batchNo"
              label="Batch No"
              type="text"
              fullWidth
              variant="outlined"
              onChange={(event) => setBatchNo(event.target.value)}
              required
            />

            <TextField
              autoFocus
              margin="dense"
              id="fundingAccountNo"
              name ="fundingAccountNo"
              label="Funding Account No"
              type="text"
              fullWidth
              variant="outlined"
              onChange={(event) => setFundingAccountNo(event.target.value)}
              required
            />

              <TextField
              autoFocus
              margin="dense"
              id="senderName"
              name ="senderName"
              label="Sender Name"
              type="text"
              fullWidth
              variant="outlined"
              onChange={(event) => setSenderName(event.target.value)}
              required
            />

<TextField
              autoFocus
              margin="dense"
              id="destinationBank"
              name ="destinationBank"
              label="Destination Bank"
              type="text"
              fullWidth
              variant="outlined"
              onChange={(event) => setDestinationBank(event.target.value)}
              required
            />

<TextField
              autoFocus
              margin="dense"
              id="recipientName"
              name ="recipientName"
              label="Recipient Name"
              type="text"
              fullWidth
              variant="outlined"
              onChange={(event) => setRecipientName(event.target.value)}
              required
            />

<TextField
       
              margin="dense"
              id="amount"
              name ="amount"
              label="Amount"
              type="number"
              fullWidth
              value={amount}
              defaultValue={amount}
              variant="outlined"
              // onChange={(event) => setAmount(parseFloat(event.target.value))}
              disabled
          
            />

<TextField
              autoFocus
              margin="dense"
              id="totalFee"
              name ="totalFee"
              label="Total Fee"
              type="number"
              fullWidth
              variant="outlined"
              onChange={(event) => setTotalFee(parseFloat(event.target.value))}
              required
            />

<TextField
              autoFocus
              margin="dense"
              id="status"
              name ="status"
              label="Status"
              type="text"
              fullWidth
              variant="outlined"
              onChange={(event) => setStatus(event.target.value)}
              required
            />

<TextField
              autoFocus
              margin="dense"
              id="remarks"
              name ="status"
              label="Remarks"
              type="text"
              fullWidth
              variant="outlined"
              onChange={(event) => setRemarks(event.target.value)}
              required
            />

<LocalizationProvider dateAdapter={AdapterDayjs} >
          <DemoContainer components={['DateTimePicker']} >
            <DateTimePicker label="Date Remitted" 
            value={date}
            onChange ={(newValue) => setDate(newValue)}
            sx={{ width: '100%' }}
            />
          </DemoContainer>
        </LocalizationProvider>

        </DialogContent>
    
        <DialogActions sx={{marginRight: 2, marginLeft: 2}}>
        
          <Button onClick={() => setIsModalOpen(!isModalOpen)}>Cancel</Button>
          <Button type ="submit" variant="contained" color="success" disabled = {isReferenceNoError}>Save</Button>
        </DialogActions>
        </form>
  </Dialog>

    <div className="invisible absolute">
    <ComponentToPrint  
    ref={componentRef} 
    rows ={tableRows} 
    columns ={columns}
    grandTotal ={grandTotal}
    />
    </div>
      
  
   
    <div className="relative block mt-10  p-12 bg-white border border-gray-200 rounded-lg shadow-lg"
        style ={{
            height: 'auto'
        }}
        >
            <h1 className="mb-2 text-5xl  font-bold tracking-tight text-indigo-900">ATTORNEY</h1>
        </div>


        <div className="sm:py-6">
  <div className="space-y-0 md:grid md:grid-cols-0 lg:grid-cols-4 xl:grid-cols-3 md:gap-2 md:space-y-0">
  
     
<div className=" bg-white border border-gray-200 rounded-lg shadow-lg p-4">  
  <div className="flex items-center">
    <div className="inline-flex flex-shrink-0 justify-center items-center w-12 h-12 text-white bg-gradient-to-br from-blue-900 to-[#161d6f] rounded-lg" >
      
        {<BiMoney  />}
    </div>
    <div className="flex-shrink-0 ml-3">
      <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl"> <CountUp end={total} /></span>
      <h3 className="text-base font-normal text-gray-500">{"TOTAL REMITTED "}</h3>
    </div>
  </div>
</div>

<div className=" bg-white border border-gray-200 rounded-lg shadow-lg p-4">  
  <div className="flex items-center">
    <div className="inline-flex flex-shrink-0 justify-center items-center w-12 h-12 text-white bg-gradient-to-br from-blue-900 to-[#161d6f] rounded-lg" >
      
        {<BiBus    />}
    </div>
    <div className="flex-shrink-0 ml-3">
      <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl"><CountUp end={totalTicket} /></span>
      <h3 className="text-base font-normal text-gray-500">{"TOTAL BUS "}</h3>
    </div>
  </div>
</div>

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
</div>



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
                    {columns.map((column) => (
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
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Remitted" {...a11yProps(0)} />
          <Tab label="Bank Transfer" {...a11yProps(1)} />
          {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
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
            rows={tableRows} columns={columns}
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


      <CustomTabPanel value={value} index={1}>
      <Box sx = {{
            '& .super-app-theme--header': {
            backgroundColor: '#161d6f',
            color:'white',
            },
            height:700
            }}>
             
            <StyledDataGrid
            initialState={{ pinnedColumns: { left: ['reference_no']} }}
            rows={bankTableRows} columns={columnsBank}
            loading = {isLoading}
             slots={{toolbar: BankCustomToolbar, loadingOverlay: LinearProgress}}
             sx={{
              '& .MuiDataGrid-cell': {
                fontSize: '1rem',
                padding: '15px',
              },
            }}

            onRowSelectionModelChange={(newRowSelectionModel) => {
          
              console.log(newRowSelectionModel)
             const selectedRow = bankTableRows.find(row => row.id == newRowSelectionModel);

             const selectedReferenceNo = selectedRow.reference_no;
            console.log(`Selected reference number: ${selectedReferenceNo}`);
            setFilterData(() => selectedReferenceNo)
              setFilterType(() => "reference_no")

           
           setValue(() => 0)
            }}
            />
         </Box>
      </CustomTabPanel>

      </Box>
        </Box>
        </Paper>   
    </NavBar>
    </div>)
}


