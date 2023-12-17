// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
import NavBar from "../components/NavBar";
import Paper from "../components/Paper";
import { GridColDef, GridRowsProp, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarDensitySelector, GridToolbarExport,  } from '@mui/x-data-grid';
import { DataGridPremium,  GridActionsCellItem  } from '@mui/x-data-grid-premium/DataGridPremium';
import {useEffect,  useState} from 'react'
import Box from '@mui/material/Box';
import { Button, FormControl, InputLabel, LinearProgress, MenuItem, Select, TextField } from "@mui/material";
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
import { BsCurrencyExchange,BsTicketPerforatedFill,BsBagCheck,BsFillSignpostFill,BsFillBusFrontFill,BsSpeedometer   } from "react-icons/bs";
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import PrintIcon from '@mui/icons-material/Print';
import { ComponentToPrint } from '../components/ComponentToPrint';
import CountUp from 'react-countup';
import '../styles/RemoveProWaterMark.css'
import Chip from '@mui/material/Chip';
import { styled} from '@mui/system';
import { useInterval } from 'usehooks-ts'
import { ToastContainer, toast } from 'react-toastify';
  const rows: GridRowsProp = [
   
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
export function TORViolation(){

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
  GetFilterData();
  return () =>{}
},[filterTableCompanyId])

const columns: GridColDef[] = [
  
  
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
    field: 'isUploaded', 
    headerName: 'SYNC STATUS', 
    width: 180, 
    headerClassName: 'super-app-theme--header',
    editable: false,
    headerAlign: 'center',
    align: 'center',
    renderCell: (cellValues) => {
          
      return(
      <>
    {cellValues.value === true ? (<Chip  label={"Synchronized"} color ="success" size = "small" variant = "outlined"/>) : (<Chip label={"Unsynchronized"} color ="error" size = "small" variant = "outlined"/>)}
          
    
      </>
      );
    }
  },
  { 
    field: 'device_id', 
    headerName: 'DEVICE ID', 
    headerClassName: 'super-app-theme--header',
    editable: false,
    width: 180,
    headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'control_no', 
    headerName: 'CONTROL NO', 
    headerClassName: 'super-app-theme--header',
    editable: false,
    width: 280,
    headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'tor_no', 
    headerName: 'TOR NO', 
    headerClassName: 'super-app-theme--header',
    editable: false,
    width: 180,
    headerAlign: 'center',
    align: 'center',
  },
  
  { 
    field: 'date_of_trip', 
    headerName: 'DATE OF TRIP', 
    headerClassName: 'super-app-theme--header',
    editable: false,
    width: 280,
    headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'bus_no', 
    headerName: 'BUS NO', 
    headerClassName: 'super-app-theme--header',
    editable: false,
    width: 180,
    headerAlign: 'center',
    align: 'center',
    type:"number"
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
    field: 'route_code', 
    headerName: 'ROUTE CODE', 
    headerClassName: 'super-app-theme--header',
    editable: false,
    width: 180,
    headerAlign: 'center',
    align: 'center',
  },

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
    field: 'trip_no', 
    headerName: 'TRIP NO', 
    headerClassName: 'super-app-theme--header',
    editable: false,
    width: 180,
    headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'inspector_emp_no', 
    headerName: 'INSPECTOR EMP NO', 
    headerClassName: 'super-app-theme--header',
    editable: false,
    width: 180,
    headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'inspector_emp_name', 
    headerName: 'INSPECTOR EMP NAME', 
    headerClassName: 'super-app-theme--header',
    editable: false,
    width: 180,
    headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'onboard_time', 
    headerName: 'ONBOARD TIME', 
    headerClassName: 'super-app-theme--header',
    editable: false,
    width: 280,
    headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'onboard_place', 
    headerName: 'ONBOARD PLACE', 
    headerClassName: 'super-app-theme--header',
    editable: false,
    width: 180,
    headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'onboard_km_post', 
    headerName: 'ONBOARD KM POST', 
    headerClassName: 'super-app-theme--header',
    editable: false,
    width: 180,
    headerAlign: 'center',
    align: 'center',
    type:'number'
  },

  { 
    field: 'employee_name', 
    headerName: 'EMPLOYEE NAME', 
    headerClassName: 'super-app-theme--header',
    editable: false,
    width: 280,
    headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'employee_violation', 
    headerName: 'EMPLOYEE VIOLATION', 
    headerClassName: 'super-app-theme--header',
    editable: false,
    width: 480,
    headerAlign: 'center',
    align: 'center',
  },

  
  { 
    field: 'timestamp', 
    headerName: 'TIMESTAMP', 
    headerClassName: 'super-app-theme--header',
    editable: false,
    width: 280,
    headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'lat', 
    headerName: 'LAT', 
    headerClassName: 'super-app-theme--header',
    editable: false,
    width: 180,
    headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'long', 
    headerName: 'LONG', 
    headerClassName: 'super-app-theme--header',
    editable: false,
    width: 180,
    headerAlign: 'center',
    align: 'center',
  },

  {
    field: 'dateCreated',
    headerName: 'DATE CREATED',
    width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => {
      const formattedDate = moment(params.value).format('YYYY-MM-DD h:mm:ss a');
      return <div>{formattedDate}</div>;
    },
  }


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



    // const [isSyncing, setIsSyncing] = useState(false);

   

    async function SyncData(){

      setIsSyncing(true)
  try{

    const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/tor/violation/sync/${import.meta.env.VITE_DLTB_COOP_ID}`,{
      headers :{
          Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
      }
  })
      
      const response = await request.data;
  
      if(response){
        setIsSyncing(false)
        
  toast.success("Sync succesfully!", {
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

        
  
      
  }catch(e){
    console.log(`Error in getting coops: ${e}`)
    setIsSyncing(false)
    toast.error("Please check your internet connection, thank you!", {
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
         {localStorage.getItem('role') === "Administrator" && filterTableCompanyId === import.meta.env.VITE_DLTB_COOP_ID? 
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

    const request = await axios.post(`${import.meta.env.VITE_BASE_URL}/tor/violation/filter/${filterTableCompanyId}`,bodyParameters,{
      headers :{
          Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
      }
  })
      
      const response = await request.data;
  
      console.log(`This is the response`)

      console.log(response)

      if(response.messages[0].code === 0){
  
  
        if(JSON.stringify(response.response) !== JSON.stringify(tableRows)){
          
      
          
       
            setTableRows(
            
              response.response.map((data : any) =>{

                console.log(`This is the response`)
                console.log(data.fieldData[0])
            
                return {id: data.fieldData[0]._id, ...data.fieldData[0]}
              }).sort((a, b) => {
                const dateCreatedA = new Date(a.dateCreated).getTime();
                const dateCreatedB = new Date(b.dateCreated).getTime();
                return dateCreatedB - dateCreatedA; // Sort by dateCreated in descending order
              })
            )
             
            let totalViolation = response.response.length;
  
            
            
            setTotal(() => totalViolation)
         
            setTotalTicket(() => 0)
            
  
            let totalBus = 0;

            let totalOnBoardKmPost = 0;
  
            response.response.map((data : any) =>{

              totalBus = totalBus + parseFloat(data.fieldData[0].bus_no)
              totalOnBoardKmPost = totalOnBoardKmPost + data.fieldData[0].onboard_km_post
            
            })

            setTotalTicket(() =>totalBus)
  
            setTotalBaggage(() => totalOnBoardKmPost);
  
            setGrandTotal(() => totalOnBoardKmPost)
  
          
  
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
  }else{
    () =>{}
  }
 
}, 15000);


useEffect(()=>{
  
  GetFilterData();

  return () =>{
   
  }

},[filterData, filterType, toDate, fromDate])

useEffect(() =>{

 
  return () => {
    console.log(`Table refresh`)
  }

}, [tableRows])

return(
      <div 
       style={{
        backgroundColor: '#e2e8f0',
        height:'auto'
      }}
      >
        
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

    <NavBar>
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
            <h1 className="mb-2 text-5xl  font-bold tracking-tight text-indigo-900">TOR VIOLATION</h1>
        </div>


        <div className="sm:py-6">
  <div className="space-y-0 md:grid md:grid-cols-0 lg:grid-cols-0 xl:grid-cols-0 md:gap-0 md:space-y-0">
  
     
<div className=" bg-white border border-gray-200 rounded-lg shadow-lg p-4">  
  <div className="flex items-center">
    <div className="inline-flex flex-shrink-0 justify-center items-center w-12 h-12 text-white bg-gradient-to-br from-blue-900 to-[#161d6f] rounded-lg" >
      
        {<BsFillSignpostFill />}
    </div>
    <div className="flex-shrink-0 ml-3">
      <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl"> <CountUp end={total} /></span>
      <h3 className="text-base font-normal text-gray-500">{"TOTAL VIOLATION "}</h3>
    </div>
  </div>
</div>


{/* <div className=" bg-white border border-gray-200 rounded-lg shadow-lg p-4">  
  <div className="flex items-center">
    <div className="inline-flex flex-shrink-0 justify-center items-center w-12 h-12 text-white bg-gradient-to-br from-blue-900 to-[#161d6f] rounded-lg" >
      
        {<BsSpeedometer    />}
    </div>
    <div className="flex-shrink-0 ml-3">
      <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl"><CountUp end={totalBaggage} /></span>
      <h3 className="text-base font-normal text-gray-500">{"TOTAL ONBOARD KM POST "}</h3>
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
                    {columns.map((column) => (
                      <MenuItem value={column.field}>{column.field.replace(/_/g, ' ').toUpperCase()}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                 id="filterData" 
                label="Filter Data" 
                variant="outlined" 
                margin="dense"
                value={filterData}
                style={{ width: '100%'}}
                onChange={(event) => setFilterData(() => event.target.value)}
                 />
             
              </div>

              <div>
         
        
        </div>
        <Box sx = {{
            '& .super-app-theme--header': {
            backgroundColor: '#161d6f',
            color:'white',
            },
            height:700
            }}>
             
            <StyledDataGrid
            initialState={{ pinnedColumns: { left: ['employee_name']} }}
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
        </Box>
        </Paper>   
    </NavBar>
    </div>)
}


