/* eslint-disable @typescript-eslint/no-explicit-any */


import HeaderCard from "../components/HeaderCard";
import NavBar from "../components/NavBar";
import Paper from "../components/Paper";
import { DataGrid, GridColDef, GridRowsProp, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport, GridToolbarQuickFilter} from '@mui/x-data-grid';
import {useEffect,  useState} from 'react'
import Box from '@mui/material/Box';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, LinearProgress, TextField } from "@mui/material";
//import PersonAddIcon from '@mui/icons-material/PersonAdd';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddIcon from '@mui/icons-material/AddHomeWork';

const columns: GridColDef[] = [
  
  { 
    field: 'stationName', 
    headerName: 'STATION NAME', 
    flex: 1,
        minWidth: 0,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    editable: true,
   
  },
  { 
    field: 'km', 
    headerName: 'KILOMETER', 
    flex: 1,
        minWidth: 0,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    editable: true,
   
  },

  { 
    field: 'viceVersaKM', 
    headerName: 'VICE VERSA KM', 
    flex: 1,
        minWidth: 0,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    editable: true,
   
  },

  { 
    field: 'routeId', 
    headerName: 'ROUTE ID', 
    flex: 1,
        minWidth: 0,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    editable: true,
   
  },

  { 
    field: 'createdAt', 
    headerName: 'DATE CREATED', 
    flex: 1,
    minWidth: 0,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    editable: true,
    valueFormatter: (params) => {
      return moment(params.value).format('MMMM D, YYYY');
    },
  },

  { 
    field: 'updatedAt', 
    headerName: 'LAST MODIFIED', 
    flex: 1,
        minWidth: 0,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    editable: true,
    valueFormatter: (params) => {
      return moment(params.value).format('MMMM D, YYYY');
    },
  }
 
  ];
  
  const rows: GridRowsProp = [
   
  ];






export function Station(){
    const [tableRows, setTableRows] = useState(rows)
    const navigate = useNavigate();
    useEffect(() =>{
   
        GetAllData();
        setTableRows(rows)
        console.log(localStorage.getItem('role'))
        if(localStorage.getItem('role') !== "Administrator"){
          navigate("/tormain")
        }
        return () =>{}

    },[])

 
    async function GetAllData(){

        try{
          
          const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/station`,{
            headers :{
                Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
            }
        })
            
            const response = await request.data;

         

            if(response.messages[0].code === '0'){

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


    // {"stationName" : "MOLINO" , "km": 2, "viceVersaKM" : 16, "routeId" : "65164826dea2d77f7b0a76dd"}

    
const [stationName , setStationName] = useState("")

const [km, setKm] = useState("")

const [viceVersaKM, setViceVersaKM] = useState("")

const [routeId, setRouteId] = useState("");

const [isModalOpen, setIsModalOpen] = useState(false)


    async function AddStation() {
      try {
      

        event?.preventDefault()
        // Define the request data as an object
        const requestData = {
          stationName: stationName, // Assuming empNo and cardId are variables in your scope
          km : km,
          viceVersaKM : viceVersaKM,
          routeId : routeId
        };
    
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/station`,
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
            
          </GridToolbarContainer>
         
        </>
        );
  
  }   


   // {"stationName" : "MOLINO" , "km": 2, "viceVersaKM" : 16, "routeId" : "65164826dea2d77f7b0a76dd"}
  useEffect(() =>{

    return () =>{}

  },[isModalOpen, km, viceVersaKM, routeId ])

    return(
      <div  style={{
        backgroundColor: '#e2e8f0',
        height:'100vh'
      }}>
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

          <TextField
            autoFocus
            margin="dense"
            id="km"
            name ="viceVersaKM"
            label="Vice Versa Km"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(event) => setViceVersaKM(event.target.value)}
          />

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

        </DialogContent>
        
        <DialogActions sx={{marginRight: 2, marginLeft: 2}}>
        
          <Button onClick={() => setIsModalOpen(!isModalOpen)}>Cancel</Button>
          <Button type ="submit" variant="contained" color="success">Save</Button>
        </DialogActions>
        </form>
  </Dialog>

    <HeaderCard title ="STATION" />
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
            />
        </Box>
        </Paper>
     

 
       
    </NavBar>
    </div>)
}


