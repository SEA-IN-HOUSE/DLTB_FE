/* eslint-disable @typescript-eslint/no-explicit-any */


import HeaderCard from "../components/HeaderCard";
import NavBar from "../components/NavBar";
import Paper from "../components/Paper";
import { DataGrid, GridColDef, GridRowsProp, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport, GridToolbarQuickFilter} from '@mui/x-data-grid';
import {useEffect,  useLayoutEffect,  useState} from 'react'
import Box from '@mui/material/Box';
import {  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,  IconButton,  LinearProgress,  TextField } from "@mui/material";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import moment from "moment";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddIcon from '@mui/icons-material/AddCard';

const columns: GridColDef[] = [
  
  { 
    field: 'empNo', 
    headerName: 'EMPLOYEE NUMBER', 
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

  //Toolbar

  // function TransitionUp(props) {
  //   return <Slide {...props} direction="up" />;
  // }

export function EmployeeCard(){
    const [tableRows, setTableRows] = useState(rows)

   
    useEffect(() =>{
      
        GetAllData();
        setTableRows(rows)
        if(localStorage.getItem('role') !== "Administrator"){
          navigate("/tormain")
        }
      
        return () =>{}

    },[])

  
    async function GetAllData(){

        try{
          
          const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/employeecard`,{
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
       
        }catch(e){
            console.log("ERROR IN GETTING ALL EMPLOYEE = "+ e)
        }
      
    }   



    const [empNo, setEmpNo] = useState("")

    const [cardId, setCardId] = useState("")

    const [isModalOpen, setIsModalOpen] = useState(false)

    const [employee, setEmployee] = useState<any>([]);

    // const [snackBarStatus, setSnackBarStatus] = useState<AlertColor>('success')
    
    async function GetAllEmployees(){

      // setIsLoading(true)

        try{
          
          const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/employee`,{
            headers :{
                Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
            }
        })
            
            const response = await request.data;
            
            // console.log(` GetAllEmployees response: ${JSON.stringify(response)}`)

            if(response.messages[0].code === '0'){

              response.response[0].map((employee : any ) =>{
              
                // console.log(employee.fieldData[0]);

                // if(employee.fieldData[0]._id){
                //   setEmployee((employee : any) => [...employee, {id: employee.fieldData[0]._id, ...employee.fieldData[0]}])
                // }
                if(employee.fieldData[0].empNo !== undefined && employee.fieldData[0].empNo !== null && employee.fieldData[0].empNo !== "" && employee.fieldData[0]._id !== undefined && employee.fieldData[0]._id !== null && employee.fieldData[0]._id !== ""){
                  
                  // console.log("EMP: " + employee.fieldData[0].empNo)
                  if(employee.fieldData[0].empNo === undefined){
                    console.log("TEST")
                  }
                  // setEmployee((employee : any) => [...employee, {id: employee.fieldData[0].empNo, ...employee.fieldData[0]}])
                  setEmployee((employee : any) => [...employee, {empNo: employee.fieldData[0].empNo}])
                }
              
              })

            }
       
        }catch(e){
            console.log("ERROR IN GETTING ALL EMPLOYEE = "+ e)
      
        }
      
    } 
    
    useLayoutEffect(() =>{

      GetAllEmployees();

      return () => { }
    },[])


    async function RegisterEmployeeCard() {
      try {

        event?.preventDefault()
        // Define the request data as an object
        const requestData = {
          empNo: empNo, // Assuming empNo and cardId are variables in your scope
          cardId: cardId,
        };
    
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/employeecard`,
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
          <GridToolbarContainer style=
          {{
            marginBottom: '2px',
          }}
          >
          <Button variant="contained"  startIcon = {<AddIcon />} color="success" onClick={ () =>{
            setIsModalOpen(true) 
          } }>
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

  const navigate = useNavigate();

  useEffect(() =>{
    console.log(localStorage.getItem('role'))
    if(localStorage.getItem('role') !== "Administrator"){
      navigate("/tormain")
    }

    return () =>{}

  },[isModalOpen, empNo, cardId])

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
     <form onSubmit={RegisterEmployeeCard}>
     <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add Employee Card
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
            id="empNo"
            name ="empNo"
            label="Employee No"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(event) => setEmpNo(event.target.value)}
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
         
        </DialogContent>
        
        <DialogActions sx={{marginRight: 2, marginLeft: 2}}>
        
          <Button onClick={() => setIsModalOpen(!isModalOpen)}>Cancel</Button>
          <Button type ="submit" variant="contained" color="success">Save</Button>
        </DialogActions>
        </form>
  </Dialog>

    <HeaderCard title ="EMPLOYEE CARD" />
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


