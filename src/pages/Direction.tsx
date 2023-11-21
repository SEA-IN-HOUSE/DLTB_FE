/* eslint-disable @typescript-eslint/no-explicit-any */


import HeaderCard from "../components/HeaderCard";
import NavBar from "../components/NavBar";
import Paper from "../components/Paper";
import { DataGrid, GridColDef, GridRowsProp, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport, GridToolbarQuickFilter} from '@mui/x-data-grid';
import {useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputLabel, LinearProgress, MenuItem, Select, TextField } from "@mui/material";
//import PersonAddIcon from '@mui/icons-material/PersonAdd';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddIcon from '@mui/icons-material/AddHomeWork';
import { ICooperative } from "./Employee";

const columns: GridColDef[] = [
  
  { 
    field: 'bound', 
    headerName: 'BOUND', 
    flex: 1,
        minWidth: 0,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    editable: true,
   
  },
  { 
    field: 'origin', 
    headerName: 'ORIGIN', 
    flex: 1,
        minWidth: 0,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    editable: true,
   
  },

  { 
    field: 'destination', 
    headerName: 'DESTINATION', 
    flex: 1,
    minWidth: 0,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    editable: true,
   
  },

  { 
    field: 'route_code', 
    headerName: 'ROUTE CODE', 
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





export function Direction(){
    const [tableRows, setTableRows] = useState(rows)
    const navigate = useNavigate()
    useEffect(() =>{
      console.log(localStorage.getItem('role'))
    if(localStorage.getItem('role') !== "Administrator"){
      navigate("/tormain")
    }
    GetCooperative();
        GetAllData();
        setTableRows(rows)
        if(localStorage.getItem('role') !== "Administrator" && localStorage.getItem('role') !== "UserAdmin"){
          navigate("/dashboard")
        }
   
        return () =>{}

    },[])


  
    async function GetAllData(){

        try{
          
          const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/directions/${import.meta.env.VITE_DLTB_COOP_ID}`,{
            headers :{
                Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
            }
        })
            
            const response = await request.data;

         

            if(response.messages[0].code === '0'){

              setTableRows(
                
                response.response.map((data : any) =>{
                  console.log(data.destination)
                  return {id: data._id, ...data}
                })
              )
            }
       

            // setClientTableRows(newRows)
        }catch(e){
            console.log("ERROR IN GETTING ALL EMPLOYEE = "+ e)
        }
      
    }   

  //   {
  //     "bound": "SOUTH",
  //     "origin" : "PITX",
  //     "destination" : ""
  // }

  const [bound , setBound] = useState("")
  const [origin, setOrigin] = useState("")
  const [route_code, setRouteCode] = useState("")
  const [destination, setDestination] = useState("")
  
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

  async function AddData() {
    try {

      event?.preventDefault()
      // Define the request data as an object
      const requestData = {
        coopId: coopId,
        bound: bound, // Assuming empNo and cardId are variables in your scope
        origin: origin,
        code : route_code,
        destination: destination,
      };
  
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/directions`,
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
   
  
    }catch (error) {
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

  useEffect(() =>{

    return() =>{}

  },[isModalOpen, bound, origin, destination,route_code])

  
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
          Add Route
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
     <form onSubmit={AddData}>
     <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add Route
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
         
          <FormControl fullWidth sx ={{marginTop: 1}}>
        <InputLabel id="demo-simple-select-helper-label">Bound</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={bound}
          label="Bound"
          required
          defaultValue={""}        
          onChange={(event) => setBound(event.target.value)}
        >
          <MenuItem value={"NORTH"}>NORTH</MenuItem>
          <MenuItem value={"EAST"}>EAST</MenuItem>
          <MenuItem value={"WEST"}>WEST</MenuItem>
          <MenuItem value={"SOUTH"}>SOUTH</MenuItem>
            
        </Select>
        {/* <FormHelperText>With label + helper text</FormHelperText> */}
      </FormControl>

          <TextField
            autoFocus
            margin="dense"
            id="origin"
            name ="origin"
            label="Origin"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(event) => setOrigin(event.target.value)}
          />

          <TextField
            autoFocus
            margin="dense"
            id="route_code"
            name ="route_code"
            label="Route Code"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(event) => setRouteCode(event.target.value)}
          />
          
          <TextField
            autoFocus
            margin="dense"
            id="destination"
            name ="destination"
            label="Destination"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(event) => setDestination(event.target.value)}
          />
        
         
        </DialogContent>
        
        <DialogActions sx={{marginRight: 2, marginLeft: 2}}>
        
          <Button onClick={() => setIsModalOpen(!isModalOpen)}>Cancel</Button>
          <Button type ="submit" variant="contained" color="success">Save</Button>
        </DialogActions>
        </form>
  </Dialog>

    <HeaderCard title ="ROUTE" />
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


