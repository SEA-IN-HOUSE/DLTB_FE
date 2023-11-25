/* eslint-disable @typescript-eslint/no-explicit-any */
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

export interface IVehicle {
    _id: string,
    coopId: string
    vehicle_no: number,
    plate_no: number,
    createdAt: string,
}

const columns: GridColDef[] = [
  
  { 
    field: 'vehicle_no', 
    headerName: 'Vehicle No', 
    flex: 1,
        minWidth: 0,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    editable: false,
   
  },

  { 
    field: 'plate_no', 
    headerName: 'Plate No', 
    flex: 1,
        minWidth: 0,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    editable: false,
   
  },

  { 
    field: 'createdAt', 
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
  },


  ];
  
  const rows: GridRowsProp = [
   
  ];




export function Vehicle(){
  
  const navigate = useNavigate();
  useEffect(() =>{

    if(!localStorage.getItem('token')){
      localStorage.clear();
      navigate('/login')
    }
    
    if(!localStorage.getItem('pageCode')?.includes("veh, ")){
        navigate('/dashboard')
    }

   

    return () =>{}

},[])

    const [tableRows, setTableRows] = useState(rows)

    
    useEffect(() =>{
      
   
        GetAllData();
        GetCooperative();
        setTableRows(rows)
       
        return () =>{}

    },[])

  
  
    async function GetAllData(){

        try{
          
          const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/vehicle/${import.meta.env.VITE_DLTB_COOP_ID}`,{
            headers :{
                Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
            }
        })
            const response = await request.data;
        
            if(response.messages[0].code === 0){

              setTableRows(
                
                response.response.map((data : any) =>{
                  return {id: data._id, ...data}
                })
              )
            }
       

            // setClientTableRows(newRows)
        }catch(e){
            console.log("ERROR IN GETTING ALL EMPLOYEE = "+ e)
        }
      
    }   


    // "riderId" : "6535ee6209cc1d199faf2cbd",
    // "cardId": "123456",
    // "balance" : 100000

    const [vehicle_no, setVehicleNo] = useState(0);
    const [plate_no, setPlateNo] = useState(0);

    const [isModalOpen, setIsModalOpen] = useState(false)

    const [coopList, setCoopList] = useState([]);

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
            
          </GridToolbarContainer>
         
        </>
        );
  
  }   

    return(
      <div  style={{
        backgroundColor: '#e2e8f0',
        height:'100vh'
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
            label="Vehicle No"
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
            type="number"
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
            height:'400'
            }}>

            <DataGrid rows={tableRows} columns={columns}
            slots={{toolbar: CustomToolbar, loadingOverlay: LinearProgress}}
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


