// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
import NavBar from "../components/NavBar";
import Paper from "../components/Paper";
import { GridColDef, GridRowsProp, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport, GridToolbarQuickFilter} from '@mui/x-data-grid';
import {useEffect,useState} from 'react'
import { DataGridPremium  } from '@mui/x-data-grid-premium/DataGridPremium';
import Box from '@mui/material/Box';
import { Button, FormControl, InputLabel, LinearProgress, MenuItem, Select } from "@mui/material";
//import PersonAddIcon from '@mui/icons-material/PersonAdd';
import axios from 'axios';
import HeaderCard from "../components/HeaderCard";
import SyncIcon from '@mui/icons-material/Sync';
import { useNavigate } from "react-router-dom";
import { ICooperative } from "./Employee";
import { styled} from '@mui/system';
import Chip from '@mui/material/Chip';
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

export function TORFuel(){

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
      field: 'refuel_date', 
      headerName: 'REFUEL DATE', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 180,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'refuel_time', 
      headerName: 'REFUEL TIME', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 180,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'fuel_station', 
      headerName: 'FUEL STATION', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 180,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'fuel_liters', 
      headerName: 'FUEL LITERS', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 180,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'fuel_amount', 
      headerName: 'FUEL AMOUNT', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 180,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'fuel_price_per_liter', 
      headerName: 'FUEL PRICE PER LITER', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 180,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'fuel_attendant_id', 
      headerName: 'FUEL ATTENDANT ID', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 180,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'fuel_attendant', 
      headerName: 'FUEL ATTENDANT', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 180,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'fuel_tank', 
      headerName: 'FUEL TANK', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 180,
      headerAlign: 'center',
      align: 'center',
    },
  
    { 
      field: 'timestamp', 
      headerName: 'TIMESTAMP', 
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
      field: 'remarks', 
      headerName: 'REMARKS', 
      headerClassName: 'super-app-theme--header',
      editable: false,
      width: 180,
      headerAlign: 'center',
      align: 'center',
    },
  
    
    ];

    const seaColumns: GridColDef[] = [
  
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
        field: 'refuel_date', 
        headerName: 'REFUEL DATE', 
        headerClassName: 'super-app-theme--header',
        editable: false,
        width: 180,
        headerAlign: 'center',
        align: 'center',
      },
    
      { 
        field: 'refuel_time', 
        headerName: 'REFUEL TIME', 
        headerClassName: 'super-app-theme--header',
        editable: false,
        width: 180,
        headerAlign: 'center',
        align: 'center',
      },
    
      { 
        field: 'fuel_station', 
        headerName: 'FUEL STATION', 
        headerClassName: 'super-app-theme--header',
        editable: false,
        width: 180,
        headerAlign: 'center',
        align: 'center',
      },
    
      { 
        field: 'fuel_liters', 
        headerName: 'FUEL LITERS', 
        headerClassName: 'super-app-theme--header',
        editable: false,
        width: 180,
        headerAlign: 'center',
        align: 'center',
      },
    
      { 
        field: 'fuel_amount', 
        headerName: 'FUEL AMOUNT', 
        headerClassName: 'super-app-theme--header',
        editable: false,
        width: 180,
        headerAlign: 'center',
        align: 'center',
      },
    
      { 
        field: 'fuel_price_per_liter', 
        headerName: 'FUEL PRICE PER LITER', 
        headerClassName: 'super-app-theme--header',
        editable: false,
        width: 180,
        headerAlign: 'center',
        align: 'center',
      },
    
      { 
        field: 'fuel_attendant_id', 
        headerName: 'FUEL ATTENDANT ID', 
        headerClassName: 'super-app-theme--header',
        editable: false,
        width: 180,
        headerAlign: 'center',
        align: 'center',
      },
    
      { 
        field: 'fuel_attendant', 
        headerName: 'FUEL ATTENDANT', 
        headerClassName: 'super-app-theme--header',
        editable: false,
        width: 180,
        headerAlign: 'center',
        align: 'center',
      },
    
      { 
        field: 'fuel_tank', 
        headerName: 'FUEL TANK', 
        headerClassName: 'super-app-theme--header',
        editable: false,
        width: 180,
        headerAlign: 'center',
        align: 'center',
      },
    
      { 
        field: 'timestamp', 
        headerName: 'TIMESTAMP', 
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
        field: 'remarks', 
        headerName: 'REMARKS', 
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
    
    if(!localStorage.getItem('pageCode')?.includes("tFuel, ") && localStorage.getItem('role') !== "Administrator" && localStorage.getItem('role') !== "User Admin" && localStorage.getItem('role') !== "Attorney"){
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


  
    async function SyncAllData(){

      setIsLoading(true);
      try{
          
          const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/sync/tor/fuel`,{
            headers :{
                Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
            }
        })
            
            const response = await request.data;
        
            console.log(response.response)

            if(response.messages[0].code === '0'){

              setTableRows(
                
                response.response.map((data : any) =>{
                 console.log(data.fieldData)
                  return {id: data.fieldData.UUID, ...data.fieldData}
                })
              )
            }
            setIsLoading(false)

            // setClientTableRows(newRows)
        }catch(e){
          setIsLoading(false)
            console.log("ERROR = "+ e)
        }
      
    }   


    async function GetAllData(){

      setIsLoading(true);
      try{
          
          const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/tor/fuel/${filterTableCompanyId}`,{
            headers :{
                Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
            }
        })
            
            const response = await request.data;
            console.log("HEREs")
            console.log(response[0])

            if(response.messages[0].code === 0){
              console.log("HEREUUUU")

              console.log(response.response.fieldData)
              setTableRows(
                
                response.response[0].fieldData.map((data : any) =>{
                 console.log(data)
                  return {id: data._id, ...data}
                }).sort((a, b) => {
                  const dateCreatedA = new Date(a.dateCreated).getTime();
                  const dateCreatedB = new Date(b.dateCreated).getTime();
                  return dateCreatedB - dateCreatedA; // Sort by dateCreated in descending order
                })
              )
            }
            setIsLoading(false)

            // setClientTableRows(newRows)
        }catch(e){
          setIsLoading(false)
            console.log("ERROR = "+ e)
        }
        setTimeout(GetAllData, 5000)
      
    } 

    useEffect(() =>{

    },[tableRows])


    
    async function SyncData(){

      setIsSyncing(true)
  try{

    const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/tor/fuel/sync/${import.meta.env.VITE_DLTB_COOP_ID}`,{
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
    toast.success("Please check your internet connection, thank you!", {
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
      <HeaderCard title ="TOR FUEL"/>
        <Paper style={{width: '100%', marginTop: '10px' }}>
            <Box sx = {{
            '& .super-app-theme--header': {
            backgroundColor: '#161d6f',
            color:'white',
            },
            height:'400'
            }}>

            <StyledDataGrid rows={tableRows} columns={
              filterTableCompanyId === import.meta.env.VITE_DLTB_COOP_ID ?
              columns : seaColumns
            }
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


