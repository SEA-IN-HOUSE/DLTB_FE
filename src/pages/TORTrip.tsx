/* eslint-disable @typescript-eslint/no-explicit-any */
import NavBar from "../components/NavBar";
import Paper from "../components/Paper";
import { DataGrid, GridColDef, GridRowsProp, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport, GridToolbarQuickFilter} from '@mui/x-data-grid';
import {useEffect, useState} from 'react'
import Box from '@mui/material/Box';

//import PersonAddIcon from '@mui/icons-material/PersonAdd';
import axios from 'axios';
import HeaderCard from "../components/HeaderCard";
import SyncIcon from '@mui/icons-material/Sync';
import { useNavigate } from "react-router-dom";
import { ICooperative } from "./Employee";
import { Button, FormControl, InputLabel, LinearProgress, MenuItem, Select } from "@mui/material";

  const rows: GridRowsProp = [
   
  ];



export function TORTrip(){

  const [coopList, setCoopList] = useState([]);
  const [filterTableCompanyId, setFilterTableCompanyId] = useState(localStorage.getItem('companyId'));

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
      width: 180,
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
      width: 180,
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
      field: 'departed_place', 
      headerName: 'DEPARTED PLACE', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 180,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'departed_time', 
      headerName: 'DEPARTED TIME', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 180,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'departed_dispatcher_id', 
      headerName: 'DEPARTED DISPATCHER ID', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 220,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'departed_dispatcher', 
      headerName: 'DEPARTED DISPATCHER', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 240,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'arrived_place', 
      headerName: 'ARRIVED PLACE', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 180,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'arrived_time', 
      headerName: 'ARRIVED TIME', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 180,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'arrived_dispatcher_id', 
      headerName: 'ARRIVED DISPATCHER ID', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 250,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'arrived_dispatcher', 
      headerName: 'ARRIVED DISPATCHER', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 210,
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
      field: 'ticket_revenue_atm', 
      headerName: 'TICKET REVENUE ATM', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 180,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'ticket_count_atm', 
      headerName: 'TICKET COUNT ATM', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 180,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'ticket_revenue_atm_passenger', 
      headerName: 'TICKET REVENUE ATM PASSENGER', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 270,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'ticket_revenue_atm_baggage', 
      headerName: 'TICKET REVENUE ATM BAGGAGE', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 270,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'ticket_count_atm_passenger', 
      headerName: 'TICKET COUNT ATM PASSENGER', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 250,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'ticket_count_atm_baggage', 
      headerName: 'TICKET COUNT ATM BAGGAGE', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 230,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'ticket_revenue_punch', 
      headerName: 'TICKET REVENUE PUNCH', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 220,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'ticket_count_punch', 
      headerName: 'TICKET COUNT PUNCH', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 180,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'ticket_revenue_punch_passenger', 
      headerName: 'TICKET REVENUE PUNCH PASSENGER', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 290,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'ticket_revenue_punch_baggage', 
      headerName: 'TICKET REVENUE PUNCH BAGGAGE', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 270,
      headerAlign: 'center',
      align: 'center',
    },
    { 
      field: 'ticket_count_punch_passenger', 
      headerName: 'TICKET COUNT PUNCH PASSENGER', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 270,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'ticket_count_punch_baggage', 
      headerName: 'TICKET COUNT PUNCH BAGGAGE', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 270,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'ticket_revenue_charter', 
      headerName: 'TICKET REVENUE CHARTER', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 220,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'ticket_count_charter', 
      headerName: 'TICKET COUNT CHARTER', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 240,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'ticket_revenue_waybill', 
      headerName: 'TICKET REVENUE WAYBILL', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 240,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'ticket_count_waybill', 
      headerName: 'TICKET COUNT WAYBILL', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 230,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'ticket_revenue_card', 
      headerName: 'TICKET REVENUE CARD', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 200,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'ticket_count_card', 
      headerName: 'TICKET COUNT CARD', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 180,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'ticket_revenue_reserved', 
      headerName: 'TICKET REVENUE RESERVED', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 220,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'ticket_count_reserved', 
      headerName: 'TICKET COUNT RESERVED', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 220,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'ticket_amount_cancelled', 
      headerName: 'TICKET AMOUNT CANCELLED', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 230,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'ticket_count_cancelled', 
      headerName: 'TICKET COUNT CANCELLED', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 240,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'ticket_amount_passes', 
      headerName: 'TICKET AMOUNT PASSES', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 220,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'ticket_count_passes', 
      headerName: 'TICKET COUNT PASSES', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 180,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'passenger_revenue', 
      headerName: 'PASSENGER REVENUE', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 180,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'baggage_revenue', 
      headerName: 'BAGGAGE REVENUE', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 180,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'gross_revenue', 
      headerName: 'GROSS REVENUE', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 180,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'passenger_count', 
      headerName: 'PASSENGER COUNT', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 180,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'baggage_count', 
      headerName: 'BAGGAGE COUNT', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 180,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'departure_timestamp', 
      headerName: 'DEPARTURE TIMESTAMP', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 240,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'departure_lat', 
      headerName: 'DEPARTURE LAT', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 180,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'departure_long', 
      headerName: 'DEPARTURE LONG', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 180,
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


    if(!localStorage.getItem('pageCode')?.includes("tTrip, ") && localStorage.getItem('role') !== "Administrator" && localStorage.getItem('role') !== "User Admin"){
      navigate('/dashboard')
    }

    return () =>{}

},[])

    const [tableRows, setTableRows] = useState(rows)

    const [isLoading , setIsLoading] = useState(false);

    const [isSyncing, setIsSyncing] = useState(false);

   


   
  
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
            setTableRows(rows)
            GetCooperative();
            return () =>{}
    
        },[filterTableCompanyId])

    useEffect(() =>{
      
        GetAllData();
        setTableRows(rows)

        return () =>{}

    },[])

    async function GetAllData(){

      setIsLoading(true);
      try{
          
          const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/tor/trip/${filterTableCompanyId}`,{
            headers :{
                Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
            }
        })
            
            const response = await request.data;
            console.log("HERE is the reponse in get")
            console.log(response)

            if(response.messages[0].code === 0){
              console.log("HEREUUUU")

              console.log(response.response.fieldData)
              setTableRows(
                
                response.response[0].fieldData.map((data : any) =>{
                 console.log(data)
                  return {id: data._id, ...data}
                })
              )
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

    return(
      <div  style={{
        backgroundColor: '#e2e8f0',
        height:'auto'
      }}>
    <NavBar>
      <HeaderCard title="TOR TRIP"/>
        <Paper style={{width: '100%', marginTop: '10px' }}>
            <Box sx = {{
            '& .super-app-theme--header': {
            backgroundColor: '#161d6f',
            color:'white',
            },
            height:'400'
            }}>

            <DataGrid rows={tableRows} columns={columns}
            slots={{toolbar: CustomToolbar, loadingOverlay: LinearProgress}}
            loading ={isLoading}
            slotProps={{
                toolbar: {
                showQuickFilter: true,
                quickFilterProps: {
                    variant: 'filled',
                    size: "medium"
                },  
              },
            }}
            sx={{
              '& .MuiDataGrid-cell': {
                fontSize: '1rem',
                padding: '15px',
              },
            }}
            />
        </Box>
        </Paper>
     

 
       
    </NavBar>
    </div>)
}


