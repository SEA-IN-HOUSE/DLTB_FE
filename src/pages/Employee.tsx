/* eslint-disable @typescript-eslint/no-explicit-any */


import HeaderCard from "../components/HeaderCard";
import NavBar from "../components/NavBar";
import Paper from "../components/Paper";
import { DataGrid, GridColDef, GridRowsProp, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport, GridToolbarQuickFilter} from '@mui/x-data-grid';
import {useEffect,  useState} from 'react'
import Box from '@mui/material/Box';
import { Button, Chip, Dialog, DialogActions, DialogContent,  DialogTitle, FormControl, IconButton, InputLabel, LinearProgress, MenuItem, Select, TextField} from "@mui/material";
import axios from 'axios';
import {  useNavigate } from "react-router-dom";
import NoRowBackGround from "../components/NoRowBackGround";
import { BsDeviceSsd } from "react-icons/bs";
import CloseIcon from '@mui/icons-material/Close';


interface IEmployeeData extends Document {
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


interface ICooperative{

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
    type:'number', 
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

    const [clientTableRows, setClientTableRows] = useState(rows)
    const [isLoading ,setIsLoading ] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const navigate = useNavigate();

   

    

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
        
        <Button variant="contained"  startIcon = {<BsDeviceSsd />} color="success"  onClick={ () =>{
          setIsModalOpen(true)
        }}>
        Add device
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

// "_id": "6555fcd014cae16d89c40194",
// "coopId": "655321a339c1307c069616e9",
// "lastName": "BOLA",
// "firstName": "ANTHONY",
// "middleName": "BRITANICO",
// "nameSuffix": "",
// "empNo": 1427,
// "empStatus": "Active/Recalled",
// "empType": "Regular",
// "idName": "ANTHONY B. BOLA ",
// "designation": "Temporary GPS Section Staff Cashier",
// "idPicture": "https://fms.dltbbus.com.ph/Streaming_SSL/MainDB/49F840081DA767BCF7CBF9CAA098BA426ADCA78817C5AA98F79C7D4E1C5CB088.png?RCType=EmbeddedRCFileProcessor",
// "idSignature": "https://fms.dltbbus.com.ph/Streaming_SSL/MainDB/BF76BDA3BD65F0ED8917A7C8EBF7F1C9DA1623991618DF0DCE78A9D64C831A2F.png?RCType=EmbeddedRCFileProcessor",
// "JTI_RFID": "YES",
// "accessPrivileges": "Cashier",
// "JTI_RFID_RequestDate": "",
// "__v": 0
const [coopList, setCoopList] = useState([]);

const [coopId, setCoopId] = useState("");
const [lastName, setLastName] = useState("");
const [firstName , setFirstName] = useState("");
const [middleName, setMiddleName] = useState("");
const [empNo ,setEmpNo] = useState("");
const [empType, setEmpType] = useState("");
const [idName, setIdName] = useState("");
const [designation , setDesignation] = useState("");
const [idPicture, setIdPicture] = useState("");
const [JTI_RFID, setJTIRFID] = useState("");
const [accessPrivileges , setAccessPrivileges] = useState("");
const [JTI_RFID_RequestDate, setJTIRFIDRequestDate] = useState("");

async function AddData() {
  try {

    event?.preventDefault()
    // Define the request data as an object
    const requestData = {
      // empNo: parseFloat(empNo), // Assuming empNo and cardId are variables in your scope
      // cardId: cardId,
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
      
        // GetAllData();
    
        // toast.success("Success", {
        //   position: "bottom-center",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "colored",
        //   });
       }else{
        // toast.warning(responseData.messages[0].message, {
        //   position: "bottom-center",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "colored",
        //   });
       }
 

  } catch (error) {
    console.error(error);
    // toast.error(`Action failed error: ${error}`, {
    //   position: "bottom-center",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "colored",
    //   });
  }finally{
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
  if(localStorage.getItem('role') !== "Administrator"){
    navigate("/tormain")
  }
  return () =>{}

},[])

    return(
      <div  style={{
        backgroundColor: '#e2e8f0',
        height:'100vh'
      }}>
    <NavBar>

{/*       
    const [coopId, setCoopId] = useState("");
const [lastName, setLastName] = useState("");
const [firstName , setFirstName] = useState("");
const [middleName, setMiddleName] = useState("");
const [empNo ,setEmpNo] = useState("");
const [empType, setEmpType] = useState("");
const [idName, setIdName] = useState("");
const [designation , setDesignation] = useState("");
const [idPicture, setIdPicture] = useState("");
const [JTI_RFID, setJTIRFID] = useState("");
const [accessPrivileges , setAccessPrivileges] = useState("");
const [JTI_RFID_RequestDate, setJTIRFIDRequestDate] = useState(""); 
*/}

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
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={coopId}
    defaultValue= {coopId}
    label="Cooperative"
    onChange={(event) => setCoopId(event?.target.value)}
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


