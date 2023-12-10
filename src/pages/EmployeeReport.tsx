// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
import NavBar from "../components/NavBar";
import Paper from "../components/Paper";
import { DataGrid, GridColDef, GridRowsProp, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarDensitySelector, GridToolbarExport,  } from '@mui/x-data-grid';
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
import { BsCurrencyExchange,BsTicketPerforatedFill,BsBagCheck  } from "react-icons/bs";
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import PrintIcon from '@mui/icons-material/Print';
import { ComponentToPrint } from '../components/ComponentToPrint';
import CountUp from 'react-countup';
  const rows: GridRowsProp = [
   
  ];

  // function CustomFooterStatusComponent(props) {
  //   return (
  //     <Box sx={{ p: 1, display: 'flex' }}>
  //       {/* <FiberManualRecordIcon
  //         fontSize="small"
  //         sx={{
  //           mr: 1,
  //           color: props.status === 'connected' ? '#4caf50' : '#d9182e',
  //         }}
  //       /> */}
  //      TOTAL FARE: ₱ {parseFloat(props.total).toFixed(2)}
  //     </Box>
  //   );
  // }


export function EmployeeReport(){

  const [isSyncing, setIsSyncing] = useState(false)
  const [total, setTotal] = useState(0);

  const [totalTicket, setTotalTicket] = useState(0);

  const [totalBaggage, setTotalBaggage] = useState(0);

  const [grandTotal, setGrandTotal] = useState(0);

  

  const [coopList, setCoopList] = useState([]);
  const [filterTableCompanyId, setFilterTableCompanyId] = useState(localStorage.getItem('companyId'));



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
},[filterTableCompanyId])
  const columns: GridColDef[] = [
  
    // { 
    //   field: 'UUID', 
    //   headerName: 'UUID', 
    //   headerClassName: 'super-app-theme--header',
    //   editable: false,
    //   width: 180,
    //   headerAlign: 'center',
    //   align: 'center',
    // },
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
      flex:1,
      minWidth: 180,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'fare',
      headerName: 'FARE',
      headerClassName: 'super-app-theme--header',
      type: 'number',
      editable: false,
      width: 180,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) => `${Math.round(parseFloat(params.value))}`,
    },
    {
      field: 'subtotal',
      headerName: 'SUBTOTAL',
      headerClassName: 'super-app-theme--header',
      type: 'number',
      editable: false,
      width: 180,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) => `${Math.round(parseFloat(params.value))}`,
    },
    {
      field: 'baggage',
      headerName: 'BAGGAGE',
      headerClassName: 'super-app-theme--header',
      type: 'number',
      editable: false,
      width: 180,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) => `${Math.round(parseFloat(params.value))}`,
    },
    { 
      field: 'bus_no', 
      headerName: 'BUS NO', 
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
      width: 330,
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
      field: 'ticket_no', 
      headerName: 'TICKET NO', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 240,
      headerAlign: 'center',
      align: 'center',
  
    },
  
    { 
      field: 'ticket_type', 
      headerName: 'TICKET TYPE', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 180,
      headerAlign: 'center',
      align: 'center',
  
    },
  
    { 
      field: 'from_place', 
      headerName: 'FROM PLACE', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 230,
      headerAlign: 'center',
      align: 'center',
  
    },
  
    { 
      field: 'to_place', 
      headerName: 'TO PLACE', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 180,
      headerAlign: 'center',
      align: 'center',
  
    },
  
    { 
      field: 'from_km', 
      headerName: 'FROM KM', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 180,
      headerAlign: 'center',
      align: 'center',
  
    },
  
    { 
      field: 'to_km', 
      headerName: 'TO KM', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 180,
      headerAlign: 'center',
      align: 'center',
  
    },
  
    { 
      field: 'km_run', 
      headerName: 'KM RUN', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 180,
      headerAlign: 'center',
      align: 'center',
  
    },
 
    { 
      field: 'card_no', 
      headerName: 'CARD NO', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 180,
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
      field:'previous_balance', 
      headerName: 'PREVIOUS BALANCE', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      type:"number",
      width: 180,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) => `₱${parseFloat(params.value).toFixed(2)}`,
  
    },
  
    { 
      field: 'current_balance', 
      headerName: 'CURRENT BALANCE', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 180,
      type:"number",
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) => `₱${parseFloat(params.value).toFixed(2)}`,
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
    

    if(!localStorage.getItem('pageCode')?.includes("tTicket, ") && localStorage.getItem('role') !== "Administrator" && localStorage.getItem('role') !== "User Admin"){
      navigate('/dashboard')
    }

    return () =>{}

},[])

    const [tableRows, setTableRows] = useState(rows)



    // const [isSyncing, setIsSyncing] = useState(false);

    const [fromDate , setFromDate] = useState(null);

    const [toDate,  setToDate] = useState(null)

    useEffect(() =>{

      },[fromDate, toDate])
      
   
    useEffect(() =>{

    },[fromDate, toDate])
    
 
  
      
    

    useEffect(() =>{

    },[tableRows])

    async function SyncData(){
      console.log("")
      // setIsSyncing(true);
      // try{

      //   const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/tor/main`,{
      //     headers :{
      //         Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
      //     }
      // })
          
      //     const response = await request.data;

      //     if(response.messages[0].code === '0'){

      //       setIsSyncing(false);
           
      //     }

      //     setIsSyncing(false);
      // }catch(e){
      //   console.error("Error in syncing data: "+e);
      //   setIsSyncing(false);
      // }
      // setTimeout(GetAllData, 5000)

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

useEffect(() => {


  return () => {}
}, [tableRows])


useEffect(() =>{

  return () =>{}
},[tableRows])

const [filterType, setFilterType] = useState(null);

const [filterData, setFilterData] = useState(null);


async function GetFilterData(){

    setTotal(() => 0.00);
    try{
      
          const bodyParameters = {
            filterData: filterData,
            filterType: filterType,
            fromDate: fromDate,
            toDate:toDate,
          }


          console.log("PARAMETERS")
          console.log(bodyParameters)
      const request = await axios.post(`${import.meta.env.VITE_BASE_URL}/tor/ticket/filter/${filterTableCompanyId}`,bodyParameters,{
        headers :{
            Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
        }
    })
        
        const response = await request.data;

        console.log("This is the message")
        console.log(response.messages[0].code)

        if(response.messages[0].code === 0){
          console.log("DATA")
          console.log(response)
            setTableRows(
            
              response.response.map((data : any) =>{
               console.log(data)
                return {id: data._id, ...data}
              })
            )
             
            let totalFare = 0.00;

            response.response.map((data : any) =>{
              totalFare = totalFare + data.fare;
             })
            
            setTotal(() => totalFare)
         
            setTotalTicket(() => 0)
            setTotalTicket(() => response.response.length)

            let totalBaggage = 0;

            response.response.map((data : any) =>{
              totalBaggage = totalBaggage + data.baggage;
            })

            setTotalBaggage(() => totalBaggage);

            let grandTotal = 0;

            response.response.map((data : any) =>{
              grandTotal = grandTotal + data.subtotal;
            })

            setGrandTotal(() => grandTotal)
        }
   

      //  setTimeout(GetFilterData, 15000)
    }catch(e){
     
        console.log("ERROR = "+ e)
    }
  


}


useEffect(()=>{
  console.log(filterType)
  GetFilterData();

  return () =>{
   
  }

},[filterData, filterType, toDate, fromDate ])

useEffect(() =>{

return() =>{}
},[filterData, filterType, toDate, fromDate])



const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });



return(
      <div 
       style={{
        backgroundColor: '#e2e8f0',
        height:'auto'
      }}
      >
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
            <h1 className="mb-2 text-5xl  font-bold tracking-tight text-indigo-900">EMPLOYEE REPORT</h1>
        </div>


        <div className="sm:py-6">
  <div className="space-y-0 md:grid md:grid-cols-0 lg:grid-cols-3 xl:grid-cols-3 md:gap-2 md:space-y-0">
  
     
<div className=" bg-white border border-gray-200 rounded-lg shadow-lg p-4">  
  <div className="flex items-center">
    <div className="inline-flex flex-shrink-0 justify-center items-center w-12 h-12 text-white bg-gradient-to-br from-blue-900 to-[#161d6f] rounded-lg" >
      
        {<BsCurrencyExchange />}
    </div>
    <div className="flex-shrink-0 ml-3">
      <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl">₱ <CountUp end={total} /></span>
      <h3 className="text-base font-normal text-gray-500">{"TOTAL FARE "}</h3>
    </div>
  </div>
</div>

<div className=" bg-white border border-gray-200 rounded-lg shadow-lg p-4">  
  <div className="flex items-center">
    <div className="inline-flex flex-shrink-0 justify-center items-center w-12 h-12 text-white bg-gradient-to-br from-blue-900 to-[#161d6f] rounded-lg" >
      
        {<BsTicketPerforatedFill />}
    </div>
    <div className="flex-shrink-0 ml-3">
      <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl"><CountUp end={totalTicket} /></span>
      <h3 className="text-base font-normal text-gray-500">{"TOTAL TICKET "}</h3>
    </div>
  </div>
</div>

<div className=" bg-white border border-gray-200 rounded-lg shadow-lg p-4">  
  <div className="flex items-center">
    <div className="inline-flex flex-shrink-0 justify-center items-center w-12 h-12 text-white bg-gradient-to-br from-blue-900 to-[#161d6f] rounded-lg" >
      
        {<BsBagCheck  />}
    </div>
    <div className="flex-shrink-0 ml-3">
      <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl"><CountUp end={totalBaggage} /></span>
      <h3 className="text-base font-normal text-gray-500">{"TOTAL BAGGAGE "}</h3>
    </div>
  </div>
</div>

  </div>

  <div className=" bg-white border border-gray-200 rounded-lg shadow-lg p-4 mt-4">  
  <div className="flex items-center">
    <div className="inline-flex flex-shrink-0 justify-center items-center w-12 h-12 text-white bg-gradient-to-br from-blue-900 to-[#161d6f] rounded-lg" >
      
        {<BsBagCheck  />}
    </div>
    <div className="flex-shrink-0 ml-3">
      <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl">₱ <CountUp end={grandTotal} /></span>
      <h3 className="text-base font-normal text-gray-500">{"GRAND TOTAL "}</h3>
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
                    onChange={(event) => setFilterType(event.target.value)}
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

            <DataGrid
           
            rows={tableRows} columns={columns}
            
             slots={{toolbar: CustomToolbar, loadingOverlay: LinearProgress,}}

            slotProps={{
                toolbar: {
                showQuickFilter: true,
                quickFilterProps: {
                    variant: 'filled',
                    size: "medium"
                },  
              },
              footer: { total },
            }}
           
            sx={{
              '& .MuiDataGrid-cell': {
                fontSize: '1rem',
                padding: '15px',
              },
            }}

            initialState={{ 

              pagination: { 
                paginationModel: { 
                  pageSize: 5 
                } 
              }, 
            }} 
            pageSizeOptions={[5, 10, 25]}
           
            />
        </Box>
        </Paper>   
    </NavBar>
    </div>)
}


