/* eslint-disable @typescript-eslint/no-explicit-any */


import HeaderCard from "../components/HeaderCard";
import NavBar from "../components/NavBar";
import Paper from "../components/Paper";
import { DataGrid, GridColDef, GridRowsProp, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport, GridToolbarQuickFilter} from '@mui/x-data-grid';
import {useEffect,  useLayoutEffect,  useState} from 'react'
import Box from '@mui/material/Box';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputLabel, LinearProgress, MenuItem, Select, TextField } from "@mui/material";
//import PersonAddIcon from '@mui/icons-material/PersonAdd';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsDeviceSsd } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

            // "_id": "655321a339c1307c069616e9",
            // "cooperativeName": "Del Monte Land Transport Bus Company",
            // "cooperativeCodeName": "DLTB",
            // "createdAt": "2023-10-12T07:48:34.337Z"

interface ICooperative{

 id: string,
 cooperativeName : string,
 cooperativeCodeName: string,
 createdAt: string
}

const columns: GridColDef[] = [
  
  // { 
  //   field: 'id', 
  //   headerName: 'ID', 
  //   flex: 1,
  //       minWidth: 0,
  //   headerClassName: 'super-app-theme--header',
  //   headerAlign: 'center',
  //   align: 'center',
  //   editable: false,
   
  // },
  { 
    field: 'deviceId', 
    headerName: 'DEVICE ID', 
    flex: 1,
        minWidth: 0,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    editable: false,
   
  },

  { 
    field: 'coopId', 
    headerName: 'COOP ID', 
    flex: 1,
        minWidth: 0,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    editable: false,
   
  },


  { 
    field: 'dateCreated', 
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

  // { 
  //   field: 'updatedAt', 
  //   headerName: 'LAST MODIFIED', 
  //   flex: 1,
  //       minWidth: 0,
  //   headerClassName: 'super-app-theme--header',
  //   headerAlign: 'center',
  //   align: 'center',
  //   editable: false,
  //   valueFormatter: (params) => {
  //     return moment(params.value).format('MMMM D, YYYY');
  //   },
  // }
 
  ];
  
  const rows: GridRowsProp = [
   
  ];






export function Device(){

  const navigate = useNavigate();
  useEffect(() =>{

    if(!localStorage.getItem('token')){
      localStorage.clear();
      navigate('/login')
    }
    
    if(!localStorage.getItem('pageCode')?.includes("dev, ")){
        navigate('/dashboard')
    }

   

    return () =>{}

},[])


    const [tableRows, setTableRows] = useState(rows);
    const [cooperativeDropdown, setCooperativeDropdown]  = useState<any>([])
 
    useEffect(() =>{
   
        GetAllData();
        setTableRows(rows)
       
        return () =>{}

    },[])

 
    async function GetAllData(){

        try{
          
          const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/device`,{
            headers :{
                Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
            }
        })
            
            const response = await request.data;
        console.log("TEST HERE")
            console.log(response)
         

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

    async function GetAllCoop(){

      try{
        
        const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/cooperative`,{
          headers :{
              Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
          }
      })
          
          const response = await request.data;

       

          if(response.messages[0].code === '0'){

            setCooperativeDropdown(
              
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



    // {"deviceId" : "123458", "coopId" : "655321a339c1307c069616e9",   "deviceName": "sumni",
    // "deviceType": "mobile"}
const [deviceId, setDeviceId]  = useState("");
const [coopId, setCoopId] = useState("655321a339c1307c069616e9");
const [deviceName, setDeviceName] = useState("");
const [deviceType, setDeviceType] =  useState("");   

const [isModalOpen, setIsModalOpen] = useState(false)


    async function AddData() {
      try {
      

        event?.preventDefault()
        // Define the request data as an object
        const requestData = {
          "deviceId" : deviceId,
          "coopId" : coopId,
          "deviceName" : deviceName,
          "deviceType" : deviceType
        };
    
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/device`,
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
          <Button variant="contained"  startIcon = {<BsDeviceSsd />} color="success"  onClick={ () =>{
            setIsModalOpen(true)
          }}>
          Add device
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


  useLayoutEffect(() =>{
    GetAllData();
    GetAllCoop();

    return () =>{}

  },[isModalOpen])

  useEffect(() =>{
    console.log(cooperativeDropdown)
    return () =>{}
  },[cooperativeDropdown])

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
     <form onSubmit={AddData}>

         <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add Device
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
            id="deviceId"
            name ="deviceId"
            label="Device Id"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(event) => setDeviceId(event.target.value)}
          />

<FormControl fullWidth margin="dense">
  <InputLabel id="demo-simple-select-label">Cooperative</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={coopId}
    defaultValue= {coopId}
    label="Cooperative"
    onChange={(event) => setCoopId(event?.target.value)}
  >
    {cooperativeDropdown.map((coop : ICooperative) =>{
      console.log(coop)
      console.log(coop.cooperativeCodeName)
      return (
        <MenuItem value={coop.id}>{coop.cooperativeCodeName}</MenuItem>
      )

    })
    }
   
  </Select>
</FormControl>

<FormControl fullWidth  margin="dense">
  <InputLabel id="deviceNameLabel">Name</InputLabel>
  <Select
    labelId="deviceNameLabel"
    id="deviceName"
    value={deviceName}
    label="Device Name"
    onChange={(event) => setDeviceName(event?.target.value)}
  >
   
        <MenuItem value={"sumni"}>SUMNI</MenuItem>

  </Select>
</FormControl>

<FormControl fullWidth  margin="dense">
  <InputLabel id="deviceTypeLbl">Type</InputLabel>
  <Select
    labelId="deviceTypeLbl"
    id="deviceType"
    value={deviceType}
    label="Device Type"
    onChange={(event) => setDeviceType(event?.target.value)}
  >
    
        <MenuItem value={"Mobile"}>Mobile</MenuItem>

   
  </Select>
</FormControl>

        </DialogContent>
        
        <DialogActions sx={{marginRight: 2, marginLeft: 2}}>
        
          <Button onClick={() => setIsModalOpen(!isModalOpen)}>Cancel</Button>
          <Button type ="submit" variant="contained" color="success">Save</Button>
        </DialogActions>
        </form>
  </Dialog>

    <HeaderCard title ="DEVICE" />
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


