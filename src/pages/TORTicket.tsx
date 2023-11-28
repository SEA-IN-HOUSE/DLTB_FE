// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
import NavBar from "../components/NavBar";
import Paper from "../components/Paper";
import { DataGrid, GridColDef, GridRowsProp, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport, GridToolbarQuickFilter, useGridApiContext, gridFilteredSortedRowIdsSelector,useGridApiRef  } from '@mui/x-data-grid';
import {useEffect,  useState} from 'react'
import Box from '@mui/material/Box';
import { Button, FormControl, InputLabel, LinearProgress, MenuItem, Select } from "@mui/material";
//import PersonAddIcon from '@mui/icons-material/PersonAdd';
import axios from 'axios';
import HeaderCard from "../components/HeaderCard";
import SyncIcon from '@mui/icons-material/Sync';
import { useNavigate } from "react-router-dom";
import { ICooperative } from "./Employee";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

  const rows: GridRowsProp = [
   
  ];

  function CustomFooterStatusComponent(props) {
    return (
      <Box sx={{ p: 1, display: 'flex' }}>
        {/* <FiberManualRecordIcon
          fontSize="small"
          sx={{
            mr: 1,
            color: props.status === 'connected' ? '#4caf50' : '#d9182e',
          }}
        /> */}
       TOTAL FARE: ₱ {parseFloat(props.total).toFixed(2)}
      </Box>
    );
  }


export function TORTicket(){

 

  const [coopList, setCoopList] = useState([]);
  const [filterTableCompanyId, setFilterTableCompanyId] = useState(localStorage.getItem('companyId'));

  
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
  GetAllData();
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
      width: 230,
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
      valueGetter: (params) => `₱${parseFloat(params.value).toFixed(2)}`,
    },
  
    // { 
    //   field: 'date_of_trip', 
    //   headerName: 'DATE OF TRIP', 
    //   headerClassName: 'super-app-theme--header',
    //   editable: false,
    //   width: 180,
    //   headerAlign: 'center',
    //   align: 'center',
    // },
  
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
      width: 180,
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
  
    // { 
    //   field: 'ticket_status', 
    //   headerName: 'TICKET STATUS', 
    //   headerClassName: 'super-app-theme--header',
    //   editable: false,
    //   width: 180,
    //   headerAlign: 'center',
    //   align: 'center',
  
    // },
  
  
    // { 
    //   field: 'timestamp', 
    //   headerName: 'TIMESTAMP', 
    //   headerClassName: 'super-app-theme--header',
    //   editable: false,
    //   width: 180,
    //   headerAlign: 'center',
    //   align: 'center',
  
    // },
  
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
  
    // { 
    //   field: 'status', 
    //   headerName: 'STATUS', 
    //   headerClassName: 'super-app-theme--header',
    //   editable: false,
    //   width: 180,
    //   headerAlign: 'center',
    //   align: 'center',
  
    // },
  
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
  
    // { 
    //   field: 'created_on', 
    //   headerName: 'CREATED ON', 
    //   headerClassName: 'super-app-theme--header',
    //   editable: false,
    //   width: 180,
    //   headerAlign: 'center',
    //   align: 'center',
  
    // },
    // { 
    //   field: 'updated_on', 
    //   headerName: 'UPDATED ON', 
    //   headerClassName: 'super-app-theme--header',
    //   editable: false,
    //   width: 180,
    //   headerAlign: 'center',
    //   align: 'center',
  
    // },
  
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
      
        const formattedDate = moment(params.value).format('YYYY-MM-DD HH:mm:ss');
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

    const [isLoading , setIsLoading] = useState(false);

    const [isSyncing, setIsSyncing] = useState(false);

    const [fromDate , setFromDate] = useState(null);

    const [toDate,  setToDate] = useState(null)

    useEffect(() =>{

      },[fromDate, toDate])
      
   
    useEffect(() =>{

    },[fromDate, toDate])
    
  async function GetAllDataByFilterDate (){

    if(fromDate !== null && toDate !== null){

    
      try{
        console.log(`From date ${fromDate}`)
        console.log(`To date ${toDate}`)
          const request = await axios.post(`${import.meta.env.VITE_BASE_URL}/tor/ticket/${filterTableCompanyId}`,
          {
            "fromDate": fromDate,
            "toDate": toDate
        },
          {
            headers :{
                Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
            }
        })
            
            const response = await request.data;
        
            console.log(response)

            if(response.messages[0].code == 0){
          
              setTableRows(
                
                response.response.map((data : any) =>{
                  return {id: data._id, ...data}
                })
              )
            }
          

            // setClientTableRows(newRows)
        }catch(e){
       
            console.log("ERROR = "+ e)
        }

    }
  
    
  } 


    // useEffect(() =>{
      
    //     GetAllData();
    //     setTableRows(rows)

    //     return () =>{}

    // },[filterTableCompanyId])

    async function GetAllData(){

      setIsLoading(true);
      try{
          
          const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/tor/ticket/${filterTableCompanyId}`,{
            headers :{
                Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
            }
        })
            
            const response = await request.data;
            console.log("HEREs")
            console.log(response.messages[0].code)

            if(response.messages[0].code === 0){
              console.log("HERE")

              if (JSON.stringify(response.response) !== JSON.stringify(tableRows)) {
                console.log("it match")

                console.log(JSON.stringify(response.response))
                setTableRows(
                
                  response.response.map((data : any) =>{
                   console.log(data)
                    return {id: data._id, ...data}
                  })
                )
              }else{
                console.log("does not match")
              }
              
            }
            setIsLoading(false)

            // setClientTableRows(newRows)
        }catch(e){
          setIsLoading(false)
            console.log("ERROR = "+ e)
        }
        setTimeout(GetAllData, 15000)
    }   

    useEffect(() =>{

    },[tableRows])

    async function SyncData(){
      setIsSyncing(true);
      try{

        const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/tor/main`,{
          headers :{
              Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
          }
      })
          
          const response = await request.data;

          if(response.messages[0].code === '0'){

            setIsSyncing(false);
           
          }

          setIsSyncing(false);
      }catch(e){
        console.error("Error in syncing data: "+e);
        setIsSyncing(false);
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
         {localStorage.getItem('role') === "Administrator" ? 
            <Button variant="contained"  onClick ={SyncData} color="success" startIcon={<SyncIcon style={spinnerStyle} />}>{isSyncing ? "SYNCING..." : "SYNC"}</Button>
            :
            null
          }
         
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
const calculateTotalFare = (rows) => {
  let totalFare = 0;
  for (const row of rows) {
    totalFare += row.fare;
  }
  return totalFare;
};


const totalFare = calculateTotalFare(tableRows);
function CustomFooter(){

  return(
    <h1>{totalFare}</h1>
  )
}


const apiRef = useGridApiRef();
console.log("HERE")

const [total, setTotal] = useState(0);

useEffect(() => {

  if(Object(tableRows).length > 0 ){
    console.log(`this is is filtered: ${gridFilteredSortedRowIdsSelector(apiRef)}`)
    setTotal(0)
    for(const id of gridFilteredSortedRowIdsSelector(apiRef))
    {
      const matchingData = tableRows.find(item => item.id === id);

      if(matchingData){
        setTotal(
          (total) => total = total + matchingData.fare
        )
      }else{
        console.log("does not match")
      }
      
    }
  }

  return () => {}
}, [tableRows])

return(
      <div 
       style={{
        backgroundColor: '#e2e8f0',
        height:'auto'
      }}
      >
    <NavBar>
      <HeaderCard title ="TOR TICKET" />
        <Paper style={{width: '100%', marginTop: '10px' }}>
            <Box sx = {{
            '& .super-app-theme--header': {
            backgroundColor: '#161d6f',
            color:'white',
            },
            height:'400'
            }}>
              {localStorage.getItem('role') === "Administrator" ?
              
              <div className="flex flex-row flex-wrap md:flex-no-wrap mb-4 md:mb-0">
              
        
              <LocalizationProvider dateAdapter={AdapterDayjs} >
                   <DemoContainer components={['DatePicker']} >
                     <DatePicker label="From" value={fromDate} onChange={(newValue) => 
                       {
                         setFromDate(newValue)
                         GetAllDataByFilterDate();
                       }
                       }/>
                   </DemoContainer>
                 </LocalizationProvider>
              -
              <LocalizationProvider dateAdapter={AdapterDayjs} >
                   <DemoContainer components={['DatePicker']} >
                     <DatePicker label="To" value = {toDate} onChange={(newValue) => {
               setToDate(newValue);
               GetAllDataByFilterDate();
                     }
                       
                     } />
                   </DemoContainer>
                 </LocalizationProvider>
                     </div>
                     :
                     null
            }
                    
                     
            <DataGrid rows={tableRows} columns={columns}
            apiRef={apiRef}
             slots={{toolbar: CustomToolbar, loadingOverlay: LinearProgress, footer :CustomFooterStatusComponent}}
            //  onStateChange={(e) => {
            //   console.log("HEY")
            //   console.log(e)
            //   console.log(e.rowSelection)
            // }}
          
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


