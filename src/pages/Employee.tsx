/* eslint-disable @typescript-eslint/no-explicit-any */


import HeaderCard from "../components/HeaderCard";
import NavBar from "../components/NavBar";
import Paper from "../components/Paper";
import { DataGrid, GridColDef, GridRowsProp, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport, GridToolbarQuickFilter} from '@mui/x-data-grid';
import {useEffect,  useState} from 'react'
import Box from '@mui/material/Box';
import { Button, Chip, Dialog, DialogActions, DialogContent,  DialogTitle, FormControl, IconButton, InputLabel, LinearProgress, MenuItem, Select, TextField} from "@mui/material";
import axios from 'axios';
import NoRowBackGround from "../components/NoRowBackGround";
import {BsFillPersonPlusFill  } from "react-icons/bs";
import CloseIcon from '@mui/icons-material/Close';

import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
interface IEmployeeData  {
  _id : string,
  coopId: string,

  lastName: string,

  firstName: string,

  middleName: string,

  nameSuffix: string,

  empNo: number,

  empStatus: string,

  empType: string,

  idName: string,

  designation: string,

  idPicture: string,

  idSignature: string,

  JTI_RFID: string,

  accessPrivileges: string,

  JTI_RFID_RequestDate: string
}



export interface ICooperative{

  id: string,
  cooperativeName : string,
  cooperativeCodeName: string,
  createdAt: string
 }
 

const columns: GridColDef[] = [

  { 
    field: 'lastName', 
    headerName: 'LAST NAME', 
    width: 180, 
    headerClassName: 'super-app-theme--header',
    editable: false,
    headerAlign: 'center',
    align: 'center',
   
  },
  { 
    field: 'firstName', 
    headerName: 'FIRST NAME', 
    width: 180, 
    headerClassName: 'super-app-theme--header',
    editable: false,
    headerAlign: 'center',
    align: 'center',
  },
  { field: 'middleName', 
    headerName: 'MIDDLE NAME', 
    width: 180, 
    headerClassName: 'super-app-theme--header',
    editable: false,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'nameSuffix', 
    headerName: 'SUFFIX', 
    width: 180, 
    headerClassName: 'super-app-theme--header',
    editable: false,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'empNo', 
    headerName: 'EMPLOYEE NO.',
    // type:'number', 
    width: 180, 
    headerClassName: 'super-app-theme--header',
    editable: false,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'empStatus', 
    headerName: 'STATUS', 
    width: 180, 
    headerClassName: 'super-app-theme--header',
    editable: false,
    headerAlign: 'center',
    align: 'center',
    renderCell: (cellValues) => {
          
      return(
      <>
    {cellValues.value.includes("Active") ? (<Chip  label={cellValues.value} color ="success" size = "small" variant = "outlined"/>) : (<Chip label={cellValues.value} color ="error" size = "small" variant = "outlined"/>)}
          
    
      </>
      );
    }
  },

  {
    field: 'empType', 
    headerName: 'EMPLOYEE TYPE', 
    width: 180, 
    headerClassName: 'super-app-theme--header',
    editable: false,
    headerAlign: 'center',
    align: 'center',
  },

  {
    field: 'idName', 
    headerName: 'ID Name', 
    width: 180, 
    headerClassName: 'super-app-theme--header',
    editable: false,
    headerAlign: 'center',
    align: 'center',
  },

  {
    field: 'designation', 
    headerName: 'DESIGNATION', 
    width: 180, 
    headerClassName: 'super-app-theme--header',
    editable: false,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'JTI_RFID',
    headerName: "JTI RFID",
    width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'accessPrivileges',
    headerName: "ACCESS PRIVILEGES",
    width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
    headerAlign: 'center',
    align: 'center',
  },

  {
    field: 'JTI_RFID_RequestDate',
    headerName: "JTI RFID REQUEST DATE",
    width: 270,
    headerClassName: 'super-app-theme--header',
    editable: false,
    headerAlign: 'center',
    align: 'center',
  },
  
  ];
  
  const rows: GridRowsProp = [
   
  ];

  //Toolbar

export function Employee(){
  
  const navigate = useNavigate();
  useEffect(() =>{

    if(!localStorage.getItem('token')){
      localStorage.clear();
      navigate('/login')
    }
    
    if(!localStorage.getItem('pageCode')?.includes("emp, ")){
        navigate('/dashboard')
    }

   

    return () =>{}

},[])

    const [clientTableRows, setClientTableRows] = useState(rows)
    const [isLoading ,setIsLoading ] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false)


   

    useEffect(() =>{
      
        GetAllEmployees();
        setClientTableRows(rows)
       
        return () =>{}

    },[])

    useEffect(() =>{

      return () => {}
    },[isLoading, isModalOpen])

    async function GetAllEmployees(){

      setIsLoading(true)

        try{
          
          const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/employee/${import.meta.env.VITE_DLTB_COOP_ID}`,{
            headers :{
                Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
            }
        })
            
            const response = await request.data;
            
            if(response.messages[0].code === '0'){
              console.log(response);
              setClientTableRows(
                
          

               
                response.response.map((employee : IEmployeeData ) =>{
                  console.log(employee)
                  
                  if(employee._id){
                    return {id: employee._id, ...employee}
                  }
                  
                })
              )

              setIsLoading(false);
            }
       
        }catch(e){
            console.log("ERROR IN GETTING ALL EMPLOYEE = "+ e)
            setIsLoading(false);
        }
      
    }   

    function NoRowsOverlay() {
      return (
       <NoRowBackGround/>
      );
    }
    
    function NoResultsOverlay() {
      return (
        <NoRowBackGround/>
      );
    }
    


  

    
function CustomToolbar() {

  return (<>
      
      <GridToolbarContainer
        style=
        {{
          marginBottom: '2px',
        }}
        >
        
        <Button variant="contained"  startIcon = {<BsFillPersonPlusFill  />} color="success"  onClick={ () =>{
          setIsModalOpen(true)
        }}>
        Add Employee
      </Button>

        {/* <Button variant="text"  color ="success" startIcon = {<PersonAddIcon />}> Add</Button> */}
        <GridToolbarColumnsButton style ={{color:"#161d6f"}} />
          <GridToolbarFilterButton style ={{color:"#161d6f"}} />
          <GridToolbarDensitySelector style ={{color:"#161d6f"}} />
          <GridToolbarExport style ={{color:"#161d6f"}} />
          <GridToolbarQuickFilter  style ={{color:"#161d6f"}}/>
      </GridToolbarContainer>
      {/* <AddEmployee  open ={formOpenType === 'employee'}/>  */}
    </>
    );

}   


const [coopList, setCoopList] = useState([]);

const [coopId, setCoopId] = useState("");
const [lastName, setLastName] = useState("");
const [firstName , setFirstName] = useState("");
const [middleName, setMiddleName] = useState("");
const [nameSuffix, setNameSuffix] = useState("");
const [empNo ,setEmpNo] = useState("");
const [empType, setEmpType] = useState("");
const [empStatus, setEmpStatus] = useState("");
const [designation , setDesignation] = useState("");
// const [idPicture, setIdPicture] = useState("");
const [JTI_RFID, setJTIRFID] = useState("");
const [accessPrivileges , setAccessPrivileges] = useState("");
const [JTI_RFID_RequestDate, setJTIRFIDRequestDate] = useState<Dayjs | null>(dayjs('2022-04-17'));

async function AddData() {
  try {

    event?.preventDefault()
    // Define the request data as an object
    const requestData = {
     "coopId" : coopId,
     "lastName" : lastName,
     "firstName" : firstName,
     "middleName" : middleName,
     "nameSuffix": nameSuffix,
     "empNo" : empNo,
     "empStatus" : empStatus,
     "empType" : empType,
     "idName" : firstName+" "+middleName+" "+lastName,
     "designation" : designation,
     "JTI_RFID" : JTI_RFID,
     "accessPrivileges": accessPrivileges,
     "JTI_RFID_RequestDate": JTI_RFID_RequestDate,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/employee`,
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
    GetAllEmployees();
    setIsModalOpen(!isModalOpen)
  }
}

async function GetCooperative(){
  setIsLoading(true);
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
      setIsLoading(false);
  }catch(e){
    console.log(`Error in getting coops: ${e}`)
  }
}


useEffect(() =>{
      
  GetAllEmployees();
  GetCooperative();
  setClientTableRows(rows)
  
  return () =>{}

},[])

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
          Add Employee
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
              id="firstName"
              name ="firstName"
              label="First Name"
              type="text"
              fullWidth
              variant="outlined"
              onChange={(event) => setFirstName(event.target.value)}
              required
            />

            <TextField
              autoFocus
              margin="dense"
              id="middleName"
              name ="middleName"
              label="Middle Name"
              type="text"
              fullWidth
              variant="outlined"
              onChange={(event) => setMiddleName(event.target.value)}
            />
             <TextField
              autoFocus
              margin="dense"
              id="lastName"
              name ="lastName"
              label="Last Name"
              type="text"
              fullWidth
              variant="outlined"
              onChange={(event) => setLastName(event.target.value)}
              required
            />

            <TextField
              autoFocus
              margin="dense"
              id="nameSuffix"
              name ="nameSuffix"
              label="Name Suffix"
              type="text"
              fullWidth
              variant="outlined"
              onChange={(event) => setNameSuffix(event.target.value)}
       
            />

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
              required
            />

<FormControl fullWidth margin="dense">
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label-empStatus"
              id="demo-simple-select-empStatus"
              value={empStatus}
              defaultValue= {empStatus}
              label="Status"
              onChange={(event) => setEmpStatus(event?.target.value)}
              required
            >
            <MenuItem value={"Active / Recalled"}>Active / Recalled</MenuItem>
            <MenuItem value={"Active"}>Active</MenuItem>
            <MenuItem value={"Terminated"}>Terminated</MenuItem>
            <MenuItem value={"Awol"}>Awol</MenuItem>
            <MenuItem value={"Contract"}>Contract</MenuItem>
            </Select>
          </FormControl>

            <FormControl fullWidth margin="dense">
              <InputLabel id="demo-simple-select-label">Employee Type</InputLabel>
              <Select
                labelId="demo-simple-select-label-empType"
                id="demo-simple-select-empType"
                value={empType}
                defaultValue= {empType}
                label="Employee Type"
                onChange={(event) => setEmpType(event?.target.value)}
                required
              >
              <MenuItem value={"Regular"}>Regular</MenuItem>
              <MenuItem value={"Irregular"}>Iregular</MenuItem>
              </Select>
            </FormControl>


            <FormControl fullWidth margin="dense">
            <InputLabel id="demo-simple-select-label">Designation</InputLabel>
            <Select
              labelId="demo-simple-select-label-designation"
              id="demo-simple-select-designation"
              value={designation}
              defaultValue= {designation}
              label="Designation"
              onChange={(event) => setDesignation(event?.target.value)}
              required
            >
            <MenuItem value={"Bus Conductor"}>Bus Conductor</MenuItem>
            <MenuItem value={"Cashier"}>Cashier</MenuItem>
            <MenuItem value={"Dispatcher"}>Dispatcher</MenuItem>
            <MenuItem value={"Inspector"}>Inspector</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="dense">
            <InputLabel id="demo-simple-select-label">JTI RFID</InputLabel>
            <Select
              labelId="demo-simple-select-label-JTI_RFID"
              id="demo-simple-select-JTI_RFID"
              value={JTI_RFID}
              defaultValue= {JTI_RFID}
              label="Designation"
              onChange={(event) => setJTIRFID(event?.target.value)}
              required
            >
            <MenuItem value={"YES"}>YES</MenuItem>
            <MenuItem value={"NO"}>NO</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="dense">
            <InputLabel id="demo-simple-select-label">Access Privileges</InputLabel>
            <Select
              labelId="demo-simple-select-label-accessPrivileges"
              id="demo-simple-select-accessPrivileges"
              value={accessPrivileges}
              defaultValue= {accessPrivileges}
              label="Access Privileges"
              onChange={(event) => setAccessPrivileges(event?.target.value)}
              required
            >
            <MenuItem value={"Bus Conductor"}>Bus Conductor</MenuItem>
            <MenuItem value={"Cashier"}>Cashier</MenuItem>
            <MenuItem value={"Dispatcher"}>Dispatcher</MenuItem>
            <MenuItem value={"Inspector"}>Inspector</MenuItem>
            </Select>
          </FormControl>

        
          <LocalizationProvider dateAdapter={AdapterDayjs} >
          <DemoContainer components={['DatePicker']} >
            <DatePicker label="JTI RFID Request Date" 
            value={JTI_RFID_RequestDate}
            onChange ={(newValue) => setJTIRFIDRequestDate(newValue)}
            sx={{ width: '100%' }}
            />
          </DemoContainer>
        </LocalizationProvider>
          

        </DialogContent>
    
        <DialogActions sx={{marginRight: 2, marginLeft: 2}}>
        
          <Button onClick={() => setIsModalOpen(!isModalOpen)}>Cancel</Button>
          <Button type ="submit" variant="contained" color="success">Save</Button>
        </DialogActions>
        </form>
  </Dialog>


    <HeaderCard title ="EMPLOYEE" />
        <Paper style={{width: '100%', marginTop: '10px' }}>
          
            <Box sx = {{
            '& .super-app-theme--header': {
            backgroundColor: '#161d6f',
            color:'white',
            },
            minHeight: 400
            }}>
        
            <DataGrid rows={clientTableRows}
            style={{minHeight: 400}}
            columns={columns}
            slots={{toolbar: CustomToolbar, loadingOverlay: LinearProgress, noResultsOverlay : NoResultsOverlay, noRowsOverlay: NoRowsOverlay}}
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
           loading = {isLoading}
            />
        </Box>
        </Paper>
   </NavBar>
    </div>)
}


