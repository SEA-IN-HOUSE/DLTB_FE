/* eslint-disable @typescript-eslint/no-explicit-any */
//@ts-nocheck
import { useInterval } from 'usehooks-ts'
import HeaderCard from "../components/HeaderCard";
import NavBar from "../components/NavBar";
import Paper from "../components/Paper";
import {  GridColDef, GridRowsProp, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport, GridToolbarQuickFilter, GridSearchIcon} from '@mui/x-data-grid';
import {useEffect,  useLayoutEffect,  useState, useMemo} from 'react'
import Box from '@mui/material/Box';
import {  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,  FormControl,  IconButton,   InputAdornment,   InputLabel,  LinearProgress,   ListSubheader,   MenuItem,  Select,  TextField } from "@mui/material";
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddIcon from '@mui/icons-material/AddCard';


import { ICooperative } from "./Employee";
import { useNavigate } from "react-router-dom";

import { styled} from '@mui/system';
import { DataGridPremium } from '@mui/x-data-grid-premium/DataGridPremium';
import '../styles/RemoveProWaterMark.css'

const StyledDataGrid = styled(DataGridPremium)(() => ({
  "& .MuiDataGrid-sortIcon": {
  opacity: 1,
  color: "white",
  },
  "& .MuiDataGrid-menuIconButton": {
  opacity: 1,
  color: "white"
  },
  }));
  
  const rows: GridRowsProp = [
   
  ];

export function EmployeeCard()
{
  const [coopList, setCoopList] = useState([]);
  const [filterTableCompanyId, setFilterTableCompanyId] = useState(localStorage.getItem('companyId'));

  const columns: GridColDef[] = [
    { 
      field: 'sNo', 
      headerName: 'SNO', 
      flex: 1,
          minWidth: 0,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center',
      editable: false,
     
    },
    { 
      field: 'empNo', 
      headerName: 'EMPLOYEE NUMBER', 
      flex: 1,
          minWidth: 0,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center',
      editable: false,
     
    },
  
    // { 
    //   field: 'cardId', 
    //   headerName: 'CARD ID', 
    //   flex: 1,
    //       minWidth: 0,
    //   headerClassName: 'super-app-theme--header',
    //   headerAlign: 'center',
    //   align: 'center',
    //   editable: false,
     
    // },
    
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
        field: 'createdAt',
        headerName: 'DATE CREATED',
        width: 180,
        headerClassName: 'super-app-theme--header',
        editable: false,
       headerAlign: 'center',
        align: 'center',
        renderCell: (params) => {
        
          const formattedDate = moment(params.value).format('YYYY-MM-DD h:mm:ss a');
          return <div>{formattedDate}</div>;
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
    //   renderCell: (params) => {
        
    //       const formattedDate = moment(params.value).format('YYYY-MM-DD h:mm:ss a');
    //       return <div>{formattedDate}</div>;
    //     },
    // }
  
    ];

  const navigate = useNavigate();
  useEffect(() =>{

    if(!localStorage.getItem('token')){
      localStorage.clear();
      navigate('/login')
    }
    if(!localStorage.getItem('pageCode')?.includes("empCard, ") && localStorage.getItem('role') !== "Administrator" && localStorage.getItem('role') !== "User Admin"){
      navigate('/dashboard')
    }


   

    return () =>{}

},[])

    const [tableRows, setTableRows] = useState(rows)

   
  
    
    useEffect(() =>{
      
        GetAllData();
     
       
        return () =>{}

    },[])

    
 
  
    async function GetAllData(){

        try{
          
          const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/employeecard/${filterTableCompanyId}`,{
            headers :{
                Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
            }
        })
            const response = await request.data;

           

            
            if(response.messages[0].code === 0){

              setTableRows(
                response.response.map((data : any) =>{
                // console.log(data._id)
                  return {id: data._id, ...data}
                }).sort((a, b) => {
                  const dateCreatedA = new Date(a.dateCreated).getTime();
                  const dateCreatedB = new Date(b.dateCreated).getTime();
                  return dateCreatedB - dateCreatedA; // Sort by dateCreated in descending order
                })
              )
            }
       
        }catch(e){
            console.log("ERROR IN GETTING ALL EMPLOYEE = "+ e)
        }
   
    }   

    useEffect(() =>{
      GetAllData();
      return () =>{}
    },[filterTableCompanyId])

    useInterval(() => {
     
        GetAllData();
     
        return() =>{}
     
    }, 15000);

    const [empNo, setEmpNo] = useState("")

    const [cardId, setCardId] = useState("")

    const [isModalOpen, setIsModalOpen] = useState(false)

    const [employee, setEmployee] = useState<any>([]);

const [coopId, setCoopId] = useState("");

  

const containsText = (text: string, searchText: string) =>
text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

const [searchText, setSearchText] = useState("");
const displayedOptions = useMemo(() => {
const uniqueOptions = new Set();
return employee
  .filter((option) => containsText(option, searchText))
  .filter((option) => {
    if (!uniqueOptions.has(option)) {
      uniqueOptions.add(option);
      return true;
    }
    return false;
  });
}, [employee, searchText]);
    
async function GetAllEmployees(){

    try{
      
      const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/employee/${filterTableCompanyId}`,{
        headers :{
            Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
        }
    })
        
        const response = await request.data;
        
        if(response.messages[0].code === '0'){
       
          response.response.map((employee : any ) =>{
          
            if (employee?.empNo !== undefined &&
              employee?.empNo !== null &&
              employee?.empNo !== "" &&
              employee._id !== undefined &&
              employee._id !== null &&
              employee._id !== "") {
             
                const empNumber  = employee?.empNo.toString();
             
                setEmployee((employee: any) => [...employee, empNumber]);
            
              }
          })

        }
   
    }catch(e){
        console.log("ERROR IN GETTING ALL EMPLOYEE = "+ e)
    }
} 

useEffect(() =>{
  
  setEmployee([])
  GetAllEmployees();

  return () => {}
},[filterTableCompanyId])
useEffect(() =>{
  return () =>{}
},[employee])
   


    async function RegisterEmployeeCard() {
      try {

        event?.preventDefault()
        // Define the request data as an object
        const requestData = {
          empNo: parseFloat(empNo), // Assuming empNo and cardId are variables in your scope
          cardId: cardId,
          coopId: filterTableCompanyId
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

        const responseData = response.data;
       console.log(`This is the response: `)
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


    useLayoutEffect(() =>{

     
     GetAllData();
     GetCooperative();
      return () =>{}
  
    },[isModalOpen, empNo, cardId])
    
    useEffect(() =>{
    
      console.log(tableRows)
      return () =>{}
    }, [employee, tableRows])




    
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
{/* 
<FormControl fullWidth margin="dense">
  <InputLabel id="demo-simple-select-label">Employee No</InputLabel>
  <Select
    labelId="demo-simple-select-label-coopId"
    id="demo-simple-select-coopId"
    value={empNo}
    defaultValue= {empNo}
    label="Employee No"
    onChange={(event) => setEmpNo(event?.target.value)}
    required
  >
    {
    Object(employee).length === 0? null :
    employee.map((emp : any) =>{
      console.log("employees")
      console.log(emp)
      return (
        <MenuItem value={emp}>{emp}</MenuItem>
      )

    })
    }
   
  </Select>
</FormControl> */}

  {/* <FormControl fullWidth margin ="dense">
          <InputLabel id="search-select-label">Employee No</InputLabel>
          <Select
            
            MenuProps={{ autoFocus: false }}
            labelId="search-select-label"
            id="search-select"
            value={empNo}
            label="Employee No"
            onChange={(e) => setEmpNo(e.target.value)}
            onClose={() => setSearchText("")}
          
            renderValue={() => empNo}
          >
  
           
            <ListSubheader>
              <TextField
                size="small"
                // Autofocus on textfield
                autoFocus
                placeholder="Type to search..."
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key !== "Escape") {
                  
                    e.stopPropagation();
                  }
                }}
              />
            </ListSubheader>
            {displayedOptions.map((option, i) => (
              <MenuItem key={i} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
  </FormControl> */}
  
            
  <FormControl fullWidth margin ="dense">
          <InputLabel id="search-select-label">Employee No</InputLabel>
          <Select
            // Disables auto focus on MenuItems and allows TextField to be in focus
            MenuProps={{ autoFocus: false }}
            labelId="search-select-label"
            id="search-select"
            value={empNo}
            label="Employee No"
            onChange={(e) => setEmpNo(e.target.value)}
            onClose={() => setSearchText("")}
            renderValue={() => empNo}
          >
  
           
            <ListSubheader>
              <TextField
                size="small"
                // Autofocus on textfield
                autoFocus
                placeholder="Type to search..."
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <GridSearchIcon />
                    </InputAdornment>
                  )
                }}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key !== "Escape") {
                    // Prevents autoselecting item while typing (default Select behaviour)
                    e.stopPropagation();
                  }
                }}
              />
            </ListSubheader>
            {
            displayedOptions.map((option, i) => (
              displayedOptions.indexOf(option) === i && (
                <MenuItem key={i} value={option}>
                  {option}
                </MenuItem>
              )
            )) 
            }
          </Select>
        </FormControl>

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
              height:700
              }}>
  
              <StyledDataGrid rows={tableRows} columns={columns}
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
      </div>
      )
    
}


