/* eslint-disable @typescript-eslint/no-explicit-any */
import NavBar from "../components/NavBar";
import Paper from "../components/Paper";
import { DataGrid, GridColDef, GridRowsProp, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport, GridToolbarQuickFilter} from '@mui/x-data-grid';
import {useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import {  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, LinearProgress, TextField } from "@mui/material";
//import PersonAddIcon from '@mui/icons-material/PersonAdd';
import axios from 'axios';
import HeaderCard from "../components/HeaderCard";
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddIcon from '@mui/icons-material/AddCard';

const columns: GridColDef[] = [
  
  { 
    field: 'riderId', 
    headerName: 'RIDER ID', 
    flex: 1,
        minWidth: 0,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    editable: true,
   
  },

  { 
    field: 'cardId', 
    headerName: 'CARD ID', 
    flex: 1,
        minWidth: 0,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    editable: true,
   
  },

  { 
    field: 'balance', 
    headerName: 'BALANCE', 
    
    flex: 1,
        minWidth: 0,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    editable: false,
    valueFormatter: (params) => `₱ ${params.value}`
    
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




export function MasterCard(){
    const [tableRows, setTableRows] = useState(rows)
    const navigate = useNavigate();
    
    useEffect(() =>{
      console.log(localStorage.getItem('role'))
   
        GetAllData();
        setTableRows(rows)
        if(localStorage.getItem('role') !== "Administrator"){
          navigate("/dashboard")
        }
    
        return () =>{}

    },[])
<<<<<<< HEAD

  
  
=======
 
>>>>>>> 2baac73cb76a93a87dc93f715972741aa7c9e6dc
    async function GetAllData(){

        try{
          
          const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/mastercard`,{
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


    // "riderId" : "6535ee6209cc1d199faf2cbd",
    // "cardId": "123456",
    // "balance" : 100000

    const [riderId, setRiderId] = useState("")

    const [cardId, setCardId] = useState("")

    const [balance, setBalance] = useState("")

    const [isModalOpen, setIsModalOpen] = useState(false)

    async function RegisterCard() {
      try {

        event?.preventDefault()
        // Define the request data as an object
        const requestData = {
          riderId: riderId, // Assuming empNo and cardId are variables in your scope
          cardId: cardId,
          balance: balance,
        };
    
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/mastercard`,
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
          Register card
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
        backgroundColor: '#f1f5f9',
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
          Add Master Card
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
            id="riderId"
            name ="riderId"
            label="Rider Id"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(event) => setRiderId(event.target.value)}
          />

          <TextField
            autoFocus
            margin="dense"
            id="cardId"
            name ="cardId"
            label="Card Id"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(event) => setCardId(event.target.value)}
            />

          <TextField
            autoFocus
            margin="dense"
            id="balance"
            name ="balance"
            label="Balance"
            type="number"
            fullWidth
            variant="outlined"
            onChange={(event) => setBalance(event.target.value)}
          />

        
         
        </DialogContent>
        
        <DialogActions sx={{marginRight: 2, marginLeft: 2}}>
        
          <Button onClick={() => setIsModalOpen(!isModalOpen)}>Cancel</Button>
          <Button type ="submit" variant="contained" color="success">Save</Button>
        </DialogActions>
        </form>
  </Dialog>


    <HeaderCard title ="MASTER CARD" />
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


