/* eslint-disable @typescript-eslint/no-explicit-any */
//@ts-nocheck
import NavBar from "../components/NavBar";
import Paper from "../components/Paper";
import { DataGrid, GridColDef, GridRowsProp, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport, GridToolbarQuickFilter} from '@mui/x-data-grid';
import {useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import {  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputLabel, LinearProgress, MenuItem, Select, TextField } from "@mui/material";
//import PersonAddIcon from '@mui/icons-material/PersonAdd';
import axios from 'axios';
import HeaderCard from "../components/HeaderCard";
import CloseIcon from '@mui/icons-material/Close';
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddIcon from '@mui/icons-material/Add';
import { ICooperative } from "./Employee";
import { useNavigate } from "react-router-dom";
import {useInterval} from '../components/useInterval'


//DATAGRID PREMIUM HACK

import { styled} from '@mui/system';
import { DataGridPremium } from '@mui/x-data-grid-premium/DataGridPremium';
import '../styles/RemoveProWaterMark.css'

export interface IVehicle {
    _id: string,
    coopId: string
    vehicle_no: number,
    plate_no: number,
    createdAt: string,
}

  const rows: GridRowsProp = [
   
  ];


  const StyledDataGrid = styled(DataGridPremium)(() => ({
    "& .MuiDataGrid-sortIcon": {
    opacity: 1,
    color: "white",
    },
    "& .MuiDataGrid-menuIconButton": {
    opacity: 1,
    color: "white"
    },
    }));

export function Vehicle(){
  
  const navigate = useNavigate();
  useEffect(() =>{

    if(!localStorage.getItem('token')){
      localStorage.clear();
      navigate('/login')
    }
    
    if(!localStorage.getItem('pageCode')?.includes("veh, ") && localStorage.getItem('role') !== "Administrator" && localStorage.getItem('role') !== "User Admin"){
        navigate('/dashboard')
    }

   

    return () =>{}

},[])


const [coopList, setCoopList] = useState([]);
const [filterTableCompanyId, setFilterTableCompanyId] = useState(localStorage.getItem('companyId'));

const columns: GridColDef[] = [
  
  { 
    field: 'vehicle_no', 
    headerName: 'VEHICLE NO', 
    flex: 1,
        minWidth: 0,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    editable: false,
   
  },

  { 
    field: 'plate_no', 
    headerName: 'PLATE NO', 
    flex: 1,
        minWidth: 0,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    editable: false,
   
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
      renderCell: (params) => {
        
        const formattedDate = moment(params.value).format('YYYY-MM-DD h:mm:ss a');
        return <div>{formattedDate}</div>;
      },
  },


  ];
  
    const [tableRows, setTableRows] = useState(rows)

    
    useEffect(() =>{
      
   
        GetAllData();
        GetCooperative();
        setTableRows(rows)
       
        return () =>{}

    },[])

  
  
    async function GetAllData(){

        try{
          
          const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/vehicle/${filterTableCompanyId}`,{
            headers :{
                Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
            }
        })
            const response = await request.data;
        
            if(response.messages[0].code === 0){

              setTableRows(
                
                response.response.map((data : any) =>{
                  return {id: data._id, ...data}
                }).sort((a, b) => {
                  const dateCreatedA = new Date(a.dateCreated).getTime();
                  const dateCreatedB = new Date(b.dateCreated).getTime();
                  return dateCreatedB - dateCreatedA; // Sort by dateCreated in descending order
                })
              )
            }else{
              setTableRows([])
            }
       

            // setClientTableRows(newRows)
        }catch(e){
            console.log("ERROR IN GETTING ALL EMPLOYEE = "+ e)
        }
 
    }   


    
    useEffect(() =>{
      GetAllData();
      return () =>{}
    },[filterTableCompanyId])

    useInterval(() => {
     
      GetAllData();
       return () =>{}
     
    }, 15000);
    // "riderId" : "6535ee6209cc1d199faf2cbd",
    // "cardId": "123456",
    // "balance" : 100000

    const [vehicle_no, setVehicleNo] = useState(0);
    const [plate_no, setPlateNo] = useState(0);

    const [isModalOpen, setIsModalOpen] = useState(false)

    // const [coopList, setCoopList] = useState([]);

  const [coopId, setCoopId] = useState("");

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


    async function RegisterCard() {
      try {

        event?.preventDefault()
        // Define the request data as an object
        const requestData = {
          coopId: coopId,
          vehicle_no: vehicle_no,
          plate_no: plate_no
        };
    
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/vehicle`,
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
        console.log("This is the response")
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
          Add vehicle
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
        style={
          {
            width: "100%",
          }
        }
        />

    <NavBar>


<Dialog open={isModalOpen} onClose={() => setIsModalOpen(!isModalOpen)} fullWidth>
     <form onSubmit={RegisterCard}>
     <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add Vehicle
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
            id="vehicle_no"
            name ="vehicle_no"
            label="Bus No"
            type="number"
            fullWidth
            variant="outlined"
            onChange={(event) => setVehicleNo(parseFloat(event.target.value))}
          />

<TextField
            autoFocus
            margin="dense"
            id="plate_no"
            name ="plate_no"
            label="Plate No"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(event) => setPlateNo(parseFloat(event.target.value))}
          />
          
         
        
         
        </DialogContent>
        
        <DialogActions sx={{marginRight: 2, marginLeft: 2}}>
        
          <Button onClick={() => setIsModalOpen(!isModalOpen)}>Cancel</Button>
          <Button type ="submit" variant="contained" color="success">Save</Button>
        </DialogActions>
        </form>
  </Dialog>


    <HeaderCard title ="VEHICLE" />
        <Paper style={{width: '100%', marginTop: '10px' }}>
            <Box sx = {{
            '& .super-app-theme--header': {
            backgroundColor: '#161d6f',
            color:'white',
            },
            height:700
            }}>

            <StyledDataGrid rows={tableRows} columns={columns}
            slots={{toolbar: CustomToolbar, loadingOverlay: LinearProgress}}
           
             slots={{toolbar: CustomToolbar, loadingOverlay: LinearProgress}}
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


