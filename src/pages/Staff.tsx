/* eslint-disable @typescript-eslint/no-explicit-any */


import HeaderCard from "../components/HeaderCard";
import NavBar from "../components/NavBar";
import Paper from "../components/Paper";
import { DataGrid, GridColDef, GridRowsProp, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport, GridToolbarQuickFilter} from '@mui/x-data-grid';
import {useEffect,  useState} from 'react'
import Box from '@mui/material/Box';
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl,  FormControlLabel,  IconButton,  InputLabel, LinearProgress, MenuItem, Select, Switch, TextField } from "@mui/material";
//import PersonAddIcon from '@mui/icons-material/PersonAdd';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import styles from '../styles/MuiDataGrid.css'
import moment from 'moment';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddIcon from '@mui/icons-material/PersonAdd';
  //Toolbar

interface IEditState{
  id: string,
  profileImageUrl: string,
  firstName: string,
  middleName: string,
  lastName: string,
  email: string,
  role: string,
  company: string,
  isAllowedToTorFuel: boolean,
  isAllowedToTorInspection: boolean,
  isAllowedToTorMain: boolean,
  isAllowedToTorRemittance: boolean,
  isAllowedToTorTicket: boolean,
  isAllowedToTorTrip: boolean,
  isAllowedToTorTrouble: boolean,
  isAllowedToTorViolation: boolean,
  isEmailVerified: boolean,

}


export function Staff(){

  const editInitialState = {

    id: "",
    profileImageUrl: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    role: "",
    company: "",
    isAllowedToTorFuel: true,
    isAllowedToTorInspection: true,
    isAllowedToTorMain: true,
    isAllowedToTorRemittance: true,
    isAllowedToTorTicket: true,
    isAllowedToTorTrip: true,
    isAllowedToTorTrouble: true,
    isAllowedToTorViolation: true,
    isEmailVerified: false,
  

  }

  const [editData, setEditData] = useState(editInitialState);

  function HandleEditDataClick ( data : IEditState ){

    setEditData(data);
    setIsModalEditOpen(!isModalEditOpen)

  }

  const columns: GridColDef[] = [
    {
      field: 'profileImageUrl',
      headerName: 'AVATAR',
      flex: 1,
      minWidth: 0,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      renderCell: (params) => {
      
        return (
          <>
            <Avatar src={params.value} />
          </>
        );
      }
    },
    {
      field: 'fullName',
      headerName: 'FULL NAME',
      description: 'This column has a value getter and is not sortable.',
      sortable: true,
      flex: 1,
      minWidth: 0,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center',
      editable: false,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.middleName || ''} ${params.row.lastName || ''}`,
    },
  
    { 
      field: 'email', 
      headerName: 'EMAIL', 
      flex: 1,
          minWidth: 0,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center',
      editable: false,
     
    },
  
    { 
      field: 'role', 
      headerName: 'ROLE', 
      flex: 1,
          minWidth: 0,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center',
      editable: false,
     
    },
    { 
      field: 'company', 
      headerName: 'COMPANY', 
      flex: 1,
          minWidth: 0,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center',
      editable: false,
     
    },
<<<<<<< HEAD
=======
    
>>>>>>> 2baac73cb76a93a87dc93f715972741aa7c9e6dc
  
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
    {
      field: 'actions',
      headerName: 'ACTIONS',
      flex: 1,
      minWidth: 0,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center',
      editable: false,
  
      renderCell : (params) => {
      
       
  
        return(
        <>
        <IconButton aria-label="edit" size="large" onClick={() => HandleEditDataClick(params.row)}>
  
          <BorderColorIcon fontSize="inherit" />
        </IconButton>
        </>
        )
      }
    }
    ];
    
    const rows: GridRowsProp = [
     
    ];

    const [tableRows, setTableRows] = useState(rows)

    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [company, setCompany] = useState("");


    const [isModalOpen, setIsModalOpen] = useState(false)

    const [isModalEditOpen, setIsModalEditOpen] = useState(false);

    useEffect(() =>{
      console.log(styles)
        GetAllData();
        setTableRows(rows)
        if(localStorage.getItem('role') !== "Administrator"){
          navigate("/dashboard")
        }
        return () =>{}


    },[])
  
    async function GetAllData(){

        try{
          
          const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/user`,{
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



  
    
    async function RegisterEmployeeCard(event) {
      try {

        event?.preventDefault()
        // Define the request data as an object
        const requestData = {
         firstName : firstName,
          middleName : middleName,
          lastName : lastName,
          email : email,
          role : role,
          password : password,
          company : company
        };
    
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/user`,
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

    async function UpdateDataInformation(event: any){
      event.preventDefault();

      try{

        const request = await axios.put(`${import.meta.env.VITE_BASE_URL}/user/${editData.id}`, editData,  {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
          },
        }
        );

        const response = await request.data;

        if(response.messages[0].code === '0'){
          
          
          toast.success("Successfully updated!", {
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
  
          
          toast.success("Invalid fields!", {
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
        setIsModalEditOpen(!isModalEditOpen)
        GetAllData();
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
          Add User
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

  },[isModalOpen, firstName, middleName, lastName, email, role, password,company])

  
  useEffect(() =>{
    console.log(editData)
  return () =>{}
  },[editData]  )

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
     <form onSubmit={RegisterEmployeeCard}>
<<<<<<< HEAD
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
=======
     <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add User
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
>>>>>>> 2baac73cb76a93a87dc93f715972741aa7c9e6dc
          <DialogContentText>
         </DialogContentText>
          <TextField
           required
            autoFocus
            margin="dense"
            id="firstName"
            label="First Name"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(event) => setFirstName(event.target.value)}
          />
           <TextField
            autoFocus
            margin="dense"
            id="middleName"
            label="Middle Name"
            type="text"
            fullWidth
            variant="outlined"
            onChange = {(event) => setMiddleName(event.target.value)}
          />
            <TextField
            required
              autoFocus
              margin="dense"
              id="lastName"
              label="Last Name"
              type="text"
              fullWidth
              variant="outlined"
              onChange = {(event) => setLastName(event.target.value)}
            />
            <TextField
            required
              autoFocus
              margin="dense"
              id="email"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              onChange = {(event) => setEmail(event.target.value)}
            />
<FormControl fullWidth sx ={{marginTop: 1}}>
        <InputLabel id="demo-simple-select-helper-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={role}
          label="Role"
          required
          onChange={(event) => setRole(event.target.value)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Administrator"}>Administrator</MenuItem>
<<<<<<< HEAD
          <MenuItem value={"UserAdmin"}>User Admin</MenuItem>
=======
          <MenuItem value={"User Admin"}>User Admin</MenuItem>
>>>>>>> 2baac73cb76a93a87dc93f715972741aa7c9e6dc
          <MenuItem value={"User"}>User</MenuItem>
        </Select>
        {/* <FormHelperText>With label + helper text</FormHelperText> */}
      </FormControl>

      <FormControl fullWidth sx ={{marginTop: 1}}>
        <InputLabel id="demo-simple-select-helper-label">Company</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={company}
          label="Company"
          required
          onChange={(event) => setCompany(event.target.value)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Seapps-inc"}>Seapps-inc</MenuItem>
          <MenuItem value={"DLTB"}>DLTB</MenuItem>
        </Select>
        {/* <FormHelperText>With label + helper text</FormHelperText> */}
      </FormControl>
          
          
        <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              required
              onChange={(event) => setPassword(event.target.value)}
        />

        </DialogContent>
        <DialogActions sx={{marginRight: 2, marginLeft: 2}}>
        
          <Button onClick={() => setIsModalOpen(!isModalOpen)}>Cancel</Button>
          <Button type ="submit" variant="contained" color="success">Save</Button>
        </DialogActions>
        </form>
  </Dialog>



  <Dialog open={isModalEditOpen} onClose={() => setIsModalEditOpen(!isModalEditOpen)} fullWidth>
     <form onSubmit={UpdateDataInformation}>
     <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Edit User Information
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setIsModalEditOpen(!isModalEditOpen)}
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
         </DialogContentText>
          <TextField
           required
            autoFocus
            margin="dense"
            id="firstName"
            label="First Name"
            type="text"
            fullWidth
            variant="outlined"
            defaultValue={editData.firstName}
            onChange={(event) => setEditData({...editData, firstName: event.target.value})}
          />
           <TextField
            autoFocus
            margin="dense"
            id="middleName"
            label="Middle Name"
            type="text"
            fullWidth
            variant="outlined"
            defaultValue={editData.middleName}
            onChange = {(event) => setEditData({...editData, middleName: event.target.value})}
          />
            <TextField
            required
              autoFocus
              margin="dense"
              id="lastName"
              label="Last Name"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue={editData.lastName}
              onChange = {(event) => setEditData({...editData, lastName: event.target.value})}
            />
            <TextField
            required
              autoFocus
              margin="dense"
              id="email"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              defaultValue={editData.email}
              onChange = {(event) => setEditData({...editData, email: event.target.value})}
            />
      <FormControl fullWidth sx ={{marginTop: 1}}>
        <InputLabel id="demo-simple-select-helper-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={editData.role}
          label="Role"
          required
          defaultValue={editData.role}
          
          onChange={(event) => setEditData({...editData, role: event.target.value})}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Administrator"}>Administrator</MenuItem>
<<<<<<< HEAD
          <MenuItem value={"UserAdmin"}>UserAdmin</MenuItem>
          <MenuItem value={"User"}>User</MenuItem>
=======
          <MenuItem value={"User Admin"}>User Admin</MenuItem>
          <MenuItem value={"User"}>User</MenuItem>
        </Select>
        {/* <FormHelperText>With label + helper text</FormHelperText> */}
      </FormControl>

      <FormControl fullWidth sx ={{marginTop: 1}}>
        <InputLabel id="demo-simple-select-helper-label">Company</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={editData.company}
          label="Company"
          required
          defaultValue={editData.company}
          
          onChange={(event) => setEditData({...editData, company: event.target.value})}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
            <MenuItem value={"Seapps-inc"}>Seapps-inc</MenuItem>
            <MenuItem value={"DLTB"}>DLTB</MenuItem>
>>>>>>> 2baac73cb76a93a87dc93f715972741aa7c9e6dc
        </Select>
        {/* <FormHelperText>With label + helper text</FormHelperText> */}
      </FormControl>
        
        </DialogContent>
        {editData.role === "User" || editData.role ==="User Admin" ? 
        (
          <DialogContent dividers >
    
          <div className="flex flex-row ml-2 mb-1">
          <FormControlLabel className ="flex-1" control={<Switch defaultChecked ={editData.isAllowedToTorMain} checked = {editData.isAllowedToTorMain}
          onChange={() => {

          setEditData({...editData, isAllowedToTorMain : !editData.isAllowedToTorMain})
          }}
          />} label="TOR Main" />
          <FormControlLabel className ="flex-1" control={<Switch defaultChecked = {editData.isAllowedToTorTicket} checked ={editData.isAllowedToTorTicket}
          onChange={() => {


          setEditData({...editData, isAllowedToTorTicket : !editData.isAllowedToTorTicket})
          }}
          />} label="TOR Ticket" />
         
          
          </div>

          <div className="flex flex-row ml-2 mb-1">

          <FormControlLabel className ="flex-1" control={<Switch defaultChecked ={editData.isAllowedToTorFuel} checked = {editData.isAllowedToTorFuel}
          onChange={() => {

          setEditData({...editData, isAllowedToTorFuel : !editData.isAllowedToTorFuel})
          }}
          />} label="TOR Fuel" />
          <FormControlLabel className ="flex-1" control={<Switch defaultChecked ={editData.isAllowedToTorRemittance} checked = {editData.isAllowedToTorRemittance}
          onChange={() => {
           setEditData({...editData, isAllowedToTorRemittance : !editData.isAllowedToTorRemittance})
          }}
          />}
          label="TOR Remittance" />

          </div>

          <div className="flex flex-row ml-2 mb-1">
          
          <FormControlLabel className ="flex-1" control={<Switch defaultChecked ={editData.isAllowedToTorTrip} checked = {editData.isAllowedToTorTrip}
          onChange={() => {
         setEditData({...editData, isAllowedToTorTrip : !editData.isAllowedToTorTrip})
          }}
          />} label="TOR Trip" />
          <FormControlLabel className ="flex-1" control={<Switch defaultChecked ={editData.isAllowedToTorInspection} 
          checked = {editData.isAllowedToTorInspection} 
          onChange={() => {
        setEditData({...editData, isAllowedToTorInspection : !editData.isAllowedToTorInspection})
          }}
          
          />} label="TOR Inspection" />

          </div>
          
          <div className="flex flex-row ml-2 mb-1">

          <FormControlLabel className ="flex-1" control={<Switch 
          
          defaultChecked ={editData.isAllowedToTorViolation} 
          checked = {editData.isAllowedToTorViolation} 
          onChange={() => {
            
          setEditData({...editData, isAllowedToTorViolation : !editData.isAllowedToTorViolation})
          }}

          />} label="TOR Violation" />
         
          <FormControlLabel className ="flex-1" control={<Switch 
          defaultChecked ={editData.isAllowedToTorTrouble} 
          checked = {editData.isAllowedToTorTrouble} 
          onChange={() => {
            
         setEditData({...editData, isAllowedToTorTrouble : !editData.isAllowedToTorTrouble})
          }}
          />} label="TOR Trouble" />
          
         
          </div>

          </DialogContent>
        ) :(<></>)}
        
        <DialogActions sx={{marginRight: 2, marginLeft: 2}}>
        
          <Button onClick={() => setIsModalEditOpen(!isModalEditOpen)}>Cancel</Button>
          <Button type ="submit" variant="contained" color="success">UPDATE</Button>
        </DialogActions>
        </form>
  </Dialog>

    <HeaderCard title ="USER" />
        <Paper style={{width: '100%', marginTop: '10px' }}>
            <Box sx = {{
            '& .super-app-theme--header': {
            backgroundColor: '#161d6f',
            color:'white',
            },
            height:'400'
            }}>

            <DataGrid
            rows={tableRows} 
            columns={columns}
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


