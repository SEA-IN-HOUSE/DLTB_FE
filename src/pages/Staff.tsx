/* eslint-disable @typescript-eslint/no-explicit-any */


import HeaderCard from "../components/HeaderCard";
import NavBar from "../components/NavBar";
import Paper from "../components/Paper";
import { DataGrid, GridColDef, GridRowsProp, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport, GridToolbarQuickFilter} from '@mui/x-data-grid';
import {useEffect,  useState} from 'react'
import Box from '@mui/material/Box';
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl,  FormControlLabel,  IconButton,  InputLabel, LinearProgress,  MenuItem,  Select, Switch, TextField } from "@mui/material";
//import PersonAddIcon from '@mui/icons-material/PersonAdd';
import axios from 'axios';
import moment from 'moment';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from "react-router-dom";
import { ICooperative } from "./Employee";
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
  pageCode: string,
  isEmailVerified: boolean,

}


export function Staff(){
  
  const navigate = useNavigate();
  useEffect(() =>{

    if(!localStorage.getItem('token')){
      localStorage.clear();
      navigate('/login')
    }
    
    if(!localStorage.getItem('pageCode')?.includes("user, ") && localStorage.getItem('role') !== "Administrator" && localStorage.getItem('role') !== "User Admin"){
        navigate('/dashboard')
    }

   

    return () =>{}

  },[])

  const editInitialState = {

    id: "",
    profileImageUrl: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    role: "",
    company: "",
    pageCode : "",
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
    const [companyId, setCompanyId] = useState(localStorage.getItem('companyId'))
    const [company, setCompany] = useState(localStorage.getItem('companyName'));
    const [coopList, setCoopList] = useState([]);
    const [pageCode, setPageCode] = useState("");


    const [isModalOpen, setIsModalOpen] = useState(false)

    const [isModalEditOpen, setIsModalEditOpen] = useState(false);

    //filter

    const [filterTableCompanyId, setFilterTableCompanyId] = useState(localStorage.getItem('companyId'));

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
  

    useEffect(() =>{
      
        GetAllData();
        setTableRows(rows)
        GetCooperative();
        return () =>{}


    },[])

    useEffect(() =>{
      
      if(companyId === "Sburoot@123"){
        setCompany("Seapps-inc");
      }else if(companyId !== null ){
        const selectedCoop : any = coopList.find((coop: ICooperative) => coop.id === companyId);
        if(typeof selectedCoop !== 'undefined'){
          console.log(`This is test ${selectedCoop.cooperativeCodeName}`)
          if (selectedCoop) {
            setCompany(selectedCoop.cooperativeCodeName);
          } else {
            // Handle the case where no matching object is found
            console.error("No coop found with the given companyId");
          }
        } 
       
      }
      return () =>{}

    },[companyId])
  
    function UpdatePageCode (codeToAddOrRemove) {
     
      if (pageCode.includes(codeToAddOrRemove)) {

        setPageCode(prevPageCode => prevPageCode.replace(codeToAddOrRemove, ""));
      } else {
  
        setPageCode(prevPageCode => prevPageCode + codeToAddOrRemove);
      }
    }

    function EditUpdatePageCode (codeToAddOrRemove) {
      setEditData((prevEditData) => {
        const updatedPageCode = prevEditData.pageCode.includes(codeToAddOrRemove)
          ? prevEditData.pageCode.replace(codeToAddOrRemove, "")
          : prevEditData.pageCode + codeToAddOrRemove;
  
        return { ...prevEditData, pageCode: updatedPageCode };
      });
    }

    useEffect(() =>{

      console.log(pageCode)

      return () =>{}
    },[pageCode])

    async function GetAllData(){
        try{
          console.log(`Display filtertable ${filterTableCompanyId}`)
          const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/${filterTableCompanyId}`,{
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
      setTimeout(GetAllData, 5000)
    }   

    useEffect(() =>{

      GetAllData();

      return () =>{}
    },[companyId, filterTableCompanyId])

  
    
    async function RegisterEmployeeCard(event) {
      try {
        if(role === "Administrator"){
          setCompanyId(import.meta.env.VITE_COMPANY_ID); 
        }
        console.log(`Company id ${companyId}`)
        console.log(`Company Name ${company}`)
        if(company !== null && company[0] !== null && company[1] !== null && company[1] !== "" && company[1] !== null){
          event?.preventDefault() 
          // Define the request data as an object
          const requestData = {
           firstName : firstName,
            middleName : middleName,
            lastName : lastName,
            email : email,
            role : role,
            pageCode: pageCode,
            password : password,
            company : company,
            companyId: companyId,
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
             
          <MenuItem key ="seapps" value={"Sburoot@123" }>Seapps-inc</MenuItem>
        
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
  :
  null
  }
          </GridToolbarContainer>
         
        </>
        );
  
  }   

  //const navigate = useNavigate();

  useEffect(() =>{
 

    return () =>{}

  },[isModalOpen])

  
  useEffect(() =>{
    console.log(editData)
  return () =>{}
  },[editData]  )

return(
  <div  style={{
    backgroundColor: '#e2e8f0',
    height:'auto'
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
              defaultValue={""}
              value ={email}
              onChange = {(event) => setEmail(event.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              defaultValue={""}
              value ={password}
              required
              onChange={(event) => setPassword(event.target.value)}
        />
      {localStorage.getItem('role') === "Administrator" ? (
         <FormControl fullWidth sx ={{marginTop: 1}}>
         <InputLabel id="sdsddemo-simple-select-helper-label">Company</InputLabel>
         <Select
           labelId="sdsddemo-simple-select-helper-label"
           id="sdsddemo-simple-select-helper"
           value={companyId}
           defaultValue={companyId}
           label="Company"
           required
         onChange={(event) => setCompanyId(event.target.value)}
         > 
        
       {localStorage.getItem('role') === "Administrator" ? 
       <MenuItem key ="seapps" value={"Sburoot@123" }>Seapps-inc</MenuItem>
       :
       null
      }
           
           {
    Object(coopList).length === 0? (null) :
    coopList.map((coop : ICooperative) =>{
      
      return (
        <MenuItem key ={coop.id}  value={coop.id}>{coop.cooperativeCodeName}</MenuItem>
      )

    })
    }
         </Select>
       
       </FormControl>
      ) : (
        <>
        </>
      )}      
     


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
      
          {company === "Seapps-inc" ? (
            <MenuItem value={"Administrator"}>Administrator</MenuItem>
          ) : (<></>) }
          <MenuItem value={"User Admin"}>User Admin</MenuItem>
          <MenuItem value={"User"}>User</MenuItem>
        </Select>
        {/* <FormHelperText>With label + helper text</FormHelperText> */}
      </FormControl>





      {role === "User" ? 
        (
          <DialogContent dividers >
    
          <div className="flex flex-row ml-2 mb-1">
          <FormControlLabel className ="flex-1" control={<Switch  checked = {pageCode.includes("tMain, ")}
          onChange={() => {
            UpdatePageCode("tMain, ")
          }}
          />} label="TOR Main" />
          <FormControlLabel className ="flex-1" control={<Switch defaultChecked = {pageCode.includes("tTicket, ")} checked ={pageCode.includes("tTicket, ")}
          onChange={() => {
            UpdatePageCode("tTicket, ")
          }}
          />} label="TOR Ticket" />
         
         <FormControlLabel className ="flex-1" control={<Switch defaultChecked ={pageCode.includes("tFuel, ")} checked = {pageCode.includes("tFuel, ")}
          onChange={() => {
            UpdatePageCode("tFuel, ")
          }}
          />} label="TOR Fuel" />
          </div>

          <div className="flex flex-row ml-2 mb-1">

         
          <FormControlLabel className ="flex-1" control={<Switch defaultChecked ={pageCode.includes("tRem, ")} checked = {pageCode.includes("tRem, ")}
          onChange={() => {
            UpdatePageCode("tRem, ")
          }}
          />}
          label="TOR Remittance" />

          <FormControlLabel className ="flex-1" control={<Switch defaultChecked ={pageCode.includes("tTrip, ")} checked = {pageCode.includes("tTrip, ")}
          onChange={() => {
            UpdatePageCode("tTrip, ")
          }}
          />} label="TOR Trip" />

          <FormControlLabel className ="flex-1" control={<Switch defaultChecked ={pageCode.includes("tIns, ")} 
          checked = {pageCode.includes("tIns, ")} 
          onChange={() => {
            UpdatePageCode("tIns, ")
          }}
          
          />} label="TOR Inspection" />
          </div>

          <div className="flex flex-row ml-2 mb-1">
          
         
          

          </div>
          
          <div className="flex flex-row ml-2 mb-1">

          <FormControlLabel className ="flex-1" control={<Switch 
          
          defaultChecked ={pageCode.includes("tVio, ")} 
          checked = {pageCode.includes("tVio, ")} 
          onChange={() => {
            
            UpdatePageCode("tVio, ")
          }}

          />} label="TOR Violation" />
         
          <FormControlLabel className ="flex-1" control={<Switch 
          defaultChecked ={pageCode.includes("tTro, ")} 
          checked = {pageCode.includes("tTro, ")} 
          onChange={() => {
            
            UpdatePageCode("tTro, ")
          }}
          />} label="TOR Trouble" />

          <FormControlLabel className ="flex-1" control={<Switch 
          defaultChecked ={pageCode.includes("user, ")} 
          checked = {pageCode.includes("user, ")} 
          onChange={() => {
            
            UpdatePageCode("user, ")
          }}
          />} label="User" />
          
         </div>

          <div className="flex flex-row ml-2 mb-1">

                <FormControlLabel className ="flex-1" control={<Switch 
                defaultChecked ={pageCode.includes("empCard, ")} 
                checked = {pageCode.includes("empCard, ")} 
                onChange={() => {
                  
                  UpdatePageCode("empCard, ")
                }}
                />} label="Employee Card" />

                <FormControlLabel className ="flex-1" control={<Switch 
                defaultChecked ={pageCode.includes("masCard, ")} 
                checked = {pageCode.includes("masCard, ")} 
                onChange={() => {
                  
                  UpdatePageCode("masCard, ")
                }}
                />} label="Master Card" />

                <FormControlLabel className ="flex-1" control={<Switch 
                defaultChecked ={pageCode.includes("rou, ")} 
                checked = {pageCode.includes("rou, ")} 
                onChange={() => {
                  
                  UpdatePageCode("rou, ")
                }}
                />} label="Route" />

          </div>

          <div className="flex flex-row ml-2 mb-1">

            <FormControlLabel className ="flex-1" control={<Switch 
            defaultChecked ={pageCode.includes("sta, ")} 
            checked = {pageCode.includes("sta, ")} 
            onChange={() => {
              
              UpdatePageCode("sta, ")
            }}
            />} label="Station" />

            <FormControlLabel className ="flex-1" control={<Switch 
            defaultChecked ={pageCode.includes("veh, ")} 
            checked = {pageCode.includes("veh, ")} 
            onChange={() => {
              
              UpdatePageCode("veh, ")
            }}
            />} label="Vehicle" />

            <FormControlLabel className ="flex-1" control={<Switch 
            defaultChecked ={pageCode.includes("emp, ")} 
            checked = {pageCode.includes("emp, ")} 
            onChange={() => {
              
              UpdatePageCode("emp, ")
            }}
            />} label="Employee" />
                  
          </div>

          <div className="flex flex-row ml-2 mb-1">

              
         <FormControlLabel className ="flex-1" control={<Switch 
          defaultChecked ={pageCode.includes("dev, ")} 
          checked = {pageCode.includes("dev, ")} 
          onChange={() => {
            
            UpdatePageCode("dev, ")
          }}
          />} label="Device" />

         

          </div>

          </DialogContent>
        ) :(<></>)}

     

          
          
        

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
            id="editfirstName"
            label="First Name"
            type="text"
            fullWidth
            variant="outlined"
            disabled = {editData.company === "Seapps-inc" && localStorage.getItem('role') !== "Administrator" }
            defaultValue={editData.firstName}
            onChange={(event) => setEditData({...editData, firstName: event.target.value})}
          />
           <TextField
            autoFocus
            margin="dense"
            id="editmiddleName"
            label="Middle Name"
            type="text"
            fullWidth
            variant="outlined"
            disabled = {editData.company === "Seapps-inc" && localStorage.getItem('role') !== "Administrator" }
            defaultValue={editData.middleName}
            onChange = {(event) => setEditData({...editData, middleName: event.target.value})}
          />
            <TextField
            required
              autoFocus
              margin="dense"
              id="editlastName"
              label="Last Name"
              type="text"
              fullWidth
              variant="outlined"
              disabled = {editData.company === "Seapps-inc" && localStorage.getItem('role') !== "Administrator" }
              defaultValue={editData.lastName}
              onChange = {(event) => setEditData({...editData, lastName: event.target.value})}
            />
            <TextField
            required
              autoFocus
              margin="dense"
              id="editEmail"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              disabled = {editData.company === "Seapps-inc" && localStorage.getItem('role') !== "Administrator" }
              defaultValue={editData.email}
              onChange = {(event) => setEditData({...editData, email: event.target.value})}
            />

      <FormControl fullWidth sx ={{marginTop: 1}}>
        <InputLabel id="demo-simple-select-helper-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="editdemo-simple-select-helper"
          value={editData.role}
          label="Role"
          required
          defaultValue={editData.role}
          disabled = {editData.company === "Seapps-inc" && localStorage.getItem('role') !== "Administrator" }
          onChange={(event) => setEditData({...editData, role: event.target.value})}
        >
          {editData.company === "Seapps-inc" ? 
            <MenuItem value={"Administrator"}>Administrator</MenuItem>
            :
            <></>
          }
          
          <MenuItem value={"User Admin"}>User Admin</MenuItem>
          <MenuItem value={"User"}>User</MenuItem>
        </Select>
        {/* <FormHelperText>With label + helper text</FormHelperText> */}
      </FormControl>
      {localStorage.getItem('role') === "Administrator" ? 
      <FormControl fullWidth sx ={{marginTop: 1}}>
      <InputLabel id="demo-simple-select-helper-label">Company</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="editdemo-simple-select-helper"
        value={editData.company}
        label="Company"
        required
        defaultValue={editData.company}
        disabled = {editData.company === "Seapps-inc" && localStorage.getItem('role') !== "Administrator" }
        onChange={(event) => setEditData({...editData, company: event.target.value})}
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
      {/* <FormHelperText>With label + helper text</FormHelperText> */}
    </FormControl>
      :
      <></>
      }
      
        </DialogContent>
        {editData.role === "User" ? 
        (
          <DialogContent dividers >
    
          <div className="flex flex-row ml-2 mb-1">
          <FormControlLabel className ="flex-1" control={<Switch  checked = {editData.pageCode.includes("tMain, ")}
          onChange={() => {
            EditUpdatePageCode("tMain, ")
          }}
          />} label="TOR Main" />
          <FormControlLabel className ="flex-1" control={<Switch defaultChecked = {editData.pageCode.includes("tTicket, ")} checked ={editData.pageCode.includes("tTicket, ")}
          onChange={() => {
            EditUpdatePageCode("tTicket, ")
          }}
          />} label="TOR Ticket" />
         
         <FormControlLabel className ="flex-1" control={<Switch defaultChecked ={editData.pageCode.includes("tFuel, ")} checked = {editData.pageCode.includes("tFuel, ")}
          onChange={() => {
            EditUpdatePageCode("tFuel, ")
          }}
          />} label="TOR Fuel" />
          </div>

          <div className="flex flex-row ml-2 mb-1">

         
          <FormControlLabel className ="flex-1" control={<Switch defaultChecked ={editData.pageCode.includes("tRem, ")} checked = {editData.pageCode.includes("tRem, ")}
          onChange={() => {
            EditUpdatePageCode("tRem, ")
          }}
          />}
          label="TOR Remittance" />

          <FormControlLabel className ="flex-1" control={<Switch defaultChecked ={editData.pageCode.includes("tTrip, ")} checked = {editData.pageCode.includes("tTrip, ")}
          onChange={() => {
            EditUpdatePageCode("tTrip, ")
          }}
          />} label="TOR Trip" />

          <FormControlLabel className ="flex-1" control={<Switch defaultChecked ={editData.pageCode.includes("tIns, ")} 
          checked = {editData.pageCode.includes("tIns, ")} 
          onChange={() => {
            EditUpdatePageCode("tIns, ")
          }}
          
          />} label="TOR Inspection" />
          </div>

          <div className="flex flex-row ml-2 mb-1">
          
         
          

          </div>
          
          <div className="flex flex-row ml-2 mb-1">

          <FormControlLabel className ="flex-1" control={<Switch 
          
          defaultChecked ={editData.pageCode.includes("tVio, ")} 
          checked = {editData.pageCode.includes("tVio, ")} 
          onChange={() => {
            
            EditUpdatePageCode("tVio, ")
          }}

          />} label="TOR Violation" />
         
          <FormControlLabel className ="flex-1" control={<Switch 
          defaultChecked ={editData.pageCode.includes("tTro, ")} 
          checked = {editData.pageCode.includes("tTro, ")} 
          onChange={() => {
            
            EditUpdatePageCode("tTro, ")
          }}
          />} label="TOR Trouble" />

          <FormControlLabel className ="flex-1" control={<Switch 
          defaultChecked ={editData.pageCode.includes("user, ")} 
          checked = {editData.pageCode.includes("user, ")} 
          onChange={() => {
            
            EditUpdatePageCode("user, ")
          }}
          />} label="User" />

          </div>

          <div className="flex flex-row ml-2 mb-1">

                <FormControlLabel className ="flex-1" control={<Switch 
                defaultChecked ={editData.pageCode.includes("empCard, ")} 
                checked = {editData.pageCode.includes("empCard, ")} 
                onChange={() => {
                  
                  EditUpdatePageCode("empCard, ")
                }}
                />} label="Employee Card" />

                <FormControlLabel className ="flex-1" control={<Switch 
                defaultChecked ={editData.pageCode.includes("masCard, ")} 
                checked = {editData.pageCode.includes("masCard, ")} 
                onChange={() => {
                  
                  EditUpdatePageCode("masCard, ")
                }}
                />} label="Master Card" />

                <FormControlLabel className ="flex-1" control={<Switch 
                defaultChecked ={editData.pageCode.includes("rou, ")} 
                checked = {editData.pageCode.includes("rou, ")} 
                onChange={() => {
                  
                  EditUpdatePageCode("rou, ")
                }}
                />} label="Route" />

          </div>

          <div className="flex flex-row ml-2 mb-1">

            <FormControlLabel className ="flex-1" control={<Switch 
            defaultChecked ={editData.pageCode.includes("sta, ")} 
            checked = {editData.pageCode.includes("sta, ")} 
            onChange={() => {
              
              EditUpdatePageCode("sta, ")
            }}
            />} label="Station" />

            <FormControlLabel className ="flex-1" control={<Switch 
            defaultChecked ={editData.pageCode.includes("veh, ")} 
            checked = {editData.pageCode.includes("veh, ")} 
            onChange={() => {
              
              EditUpdatePageCode("veh, ")
            }}
            />} label="Vehicle" />

            <FormControlLabel className ="flex-1" control={<Switch 
            defaultChecked ={editData.pageCode.includes("emp, ")} 
            checked = {editData.pageCode.includes("emp, ")} 
            onChange={() => {
              
              EditUpdatePageCode("emp, ")
            }}
            />} label="Employee" />
                  
          </div>

          <div className="flex flex-row ml-2 mb-1">

              
         <FormControlLabel className ="flex-1" control={<Switch 
          defaultChecked ={editData.pageCode.includes("dev, ")} 
          checked = {editData.pageCode.includes("dev, ")} 
          onChange={() => {
            
            EditUpdatePageCode("dev, ")
          }}
          />} label="Device" />

         

          </div>

          </DialogContent>
        ) :(<></>)}
        
        <DialogActions sx={{marginRight: 2, marginLeft: 2}}>
        
          <Button onClick={() => setIsModalEditOpen(!isModalEditOpen)}>Cancel</Button>
          <Button type ="submit" variant="contained" color="success" disabled = {editData.company === "Seapps-inc" && localStorage.getItem('role') !== "Administrator" }>UPDATE</Button>
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


