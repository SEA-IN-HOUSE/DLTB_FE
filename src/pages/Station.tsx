/* eslint-disable @typescript-eslint/no-explicit-any */
//@ts-nocheck

import HeaderCard from "../components/HeaderCard";
import NavBar from "../components/NavBar";
import Paper from "../components/Paper";
import { DataGrid, GridColDef, GridRowsProp, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport, GridToolbarQuickFilter} from '@mui/x-data-grid';
import {useEffect,  useState} from 'react'
import Box from '@mui/material/Box';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputLabel, LinearProgress, MenuItem, Select, TextField } from "@mui/material";
//import PersonAddIcon from '@mui/icons-material/PersonAdd';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddIcon from '@mui/icons-material/AddHomeWork';
import { ICooperative } from "./Employee";
import { useNavigate } from "react-router-dom";



  const rows: GridRowsProp = [
   
  ];






export function Station(){
  
  // useEffect(() => {
  //   console.log("TEST")
  //   // Check if the socket is connected
  //   if (socket.connected) {
  //     console.log('Connected to the server');
  //   } else {
  //     console.log('Not connected to the server');
  //   }

  //   // Listen for disconnect event
  //   socket.on('disconnect', () => {
  //     console.log('Disconnected from the server');
  //   });

  //   // Clean up the event listener when the component unmounts
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);



  const navigate = useNavigate();
  useEffect(() =>{

    if(!localStorage.getItem('token')){
      localStorage.clear();
      navigate('/login')
    }
   

    if(!localStorage.getItem('pageCode')?.includes("sta, ") && localStorage.getItem('role') !== "Administrator" && localStorage.getItem('role') !== "User Admin"){
      navigate('/dashboard')
    }

    return () =>{}

},[])

const [coopList, setCoopList] = useState([]);
const [filterTableCompanyId, setFilterTableCompanyId] = useState(localStorage.getItem('companyId'));

    const [tableRows, setTableRows] = useState(rows)

    const columns: GridColDef[] = [
  
      { 
        field: 'stationName', 
        headerName: 'STATION NAME', 
        flex: 1,
            minWidth: 0,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center',
        editable: false,
       
      },
      { 
        field: 'km', 
        headerName: 'KILOMETER', 
        flex: 1,
            minWidth: 0,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center',
        editable: false,
       
      },
   
      { 
        field: 'rowNo', 
        headerName: 'ROW NO', 
        flex: 1,
            minWidth: 0,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center',
        editable: false,
       
      },
    
      { 
        field: 'routeId', 
        headerName: 'ROUTE ID', 
        width: 350,
        headerClassName: 'super-app-theme--header',
        editable: false,
       headerAlign: 'center',
        align: 'center',
       
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
        field: 'updatedAt', 
        headerName: 'DATE CREATED', 
        flex: 1,
            minWidth: 0,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center',
        editable: false,
        valueFormatter: (params) => {
          const formattedDate = moment(params.value).format('YYYY-MM-DD h:mm:ss a');
        },
      }
     
      ];
      


    useEffect(() =>{
   
        GetAllData();
        setTableRows(rows)
    
        
        return () =>{}

    },[])

 
    async function GetAllData(){

        try{
          
          const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/station/${filterTableCompanyId}`,{
            headers :{
                Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
            }
        })
            
            const response = await request.data;
          console.log("THIS IS THE RESPONSE:")
            console.log(response)
         

            if(response.messages[0].code === 0){
              if (JSON.stringify(response.response) !== JSON.stringify(tableRows)) {
                setTableRows(
                
                  response.response.map((data : any) =>{
               
                    return {id: data._id, ...data}
                  }).sort((a, b) => {
                    const dateCreatedA = new Date(a.dateCreated).getTime();
                    const dateCreatedB = new Date(b.dateCreated).getTime();
                    return dateCreatedB - dateCreatedA; // Sort by dateCreated in descending order
                  })
                )
              }
             
            }
       

            // setClientTableRows(newRows)
            
        }catch(e){
            console.log("ERROR IN GETTING ALL EMPLOYEE = "+ e)
        }
        setTimeout(GetAllData, 5000)
    }   

    const [coopId, setCoopId] = useState("");
    
const [stationName , setStationName] = useState("")

const [km, setKm] = useState("")

const [viceVersaKM, setViceVersaKM] = useState(0)

const [routeId, setRouteId] = useState("");

const [rowNo, setRowNo] = useState(0);

const [isModalOpen, setIsModalOpen] = useState(false)




    async function AddStation() {
      try {
      

        event?.preventDefault()
        // Define the request data as an object
        const requestData = {
          coopId: coopId,
          stationName: stationName, // Assuming empNo and cardId are variables in your scope
          km : km,
          viceVersaKM : viceVersaKM,
          routeId : routeId,
          rowNo: rowNo
        };
    
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/station/${filterTableCompanyId}`,
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
    
    useEffect(() =>{
      GetAllData();
      return () =>{}
    },[filterTableCompanyId])

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
  

   // {"stationName" : "MOLINO" , "km": 2, "viceVersaKM" : 16, "routeId" : "65164826dea2d77f7b0a76dd"}
  useEffect(() =>{
    GetCooperative();
    return () =>{}

  },[isModalOpen, km, viceVersaKM, routeId ])

    return(
      <div  style={{
        backgroundColor: '#e2e8f0',
        height:'auto'
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
          
          {/* <FormControl fullWidth margin="dense">
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
</FormControl> */}
         
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

          {/* <TextField
            autoFocus
            margin="dense"
            id="km"
            name ="viceVersaKM"
            label="Vice Versa Km"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(event) => setViceVersaKM(event.target.value)}
          /> */}

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

          <TextField
            autoFocus
            margin="dense"
            id="rowNo"
            name ="rowNo"
            label="Row Number"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(event) => setRowNo(event.target.value)}
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


