/* eslint-disable @typescript-eslint/no-explicit-any */


import HeaderCard from "../components/HeaderCard";
import NavBar from "../components/NavBar";
import Paper from "../components/Paper";
import { DataGrid, GridColDef, GridRowsProp, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport, GridToolbarQuickFilter} from '@mui/x-data-grid';
import {useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import { Button, LinearProgress } from "@mui/material";
//import PersonAddIcon from '@mui/icons-material/PersonAdd';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

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
   
  }
 
//   { field: 'status', 
//     headerName: 'STATUS', 
//     width: 180, 
//     headerClassName: 'super-app-theme--header',
//     editable: true,
//     renderCell: (cellValues) => {
          
//         return(
//         <>
//       {cellValues.value === "Active" ? (<Chip icon={<CheckIcon/>} label="active  " color ="success" size = "small" variant = "outlined"/>) : (<Chip icon={<CloseIcon/>} label="inactive" color ="error" size = "small" variant = "outlined"/>)}
//         </>
//         );
//       }
//   },
  // { field: 'action', 
  //   headerName: 'ACTION', 
  //   width: 180, 
  //   headerClassName: 'super-app-theme--header',
  //   editable: true,
  // },
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
        GetAllData();
        setTableRows(rows)

        return () =>{}

    },[])

    // const styles = (theme : any) => ({
    //   activeSortIcon: {
    //     opacity: 1,
    //     color : 'blue',
    //   },
    //   inactiveSortIcon: {
    //     opacity: 0.4,
    //     color : 'green',
    //   },
    // });

  
    async function GetAllData(){

        try{
          
          const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/directions`,{
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

  async function AddData() {
    try {

      event?.preventDefault()
      // Define the request data as an object
      const requestData = {
        bound: bound, // Assuming empNo and cardId are variables in your scope
        origin: origin,
        route_code : route_code,
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
     if(responseData.messages){
      setIsModalOpen(!isModalOpen)
      GetAllData();
     }
   
  
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() =>{

    return() =>{}

  },[isModalOpen, bound, origin, destination,route_code])

  
    function CustomToolbar() {

      return (<>
          
          <GridToolbarContainer>
          <Button variant="text" color="success" onClick={ () =>{
            setIsModalOpen(true)
          }}>
          Add Route
        </Button>
  
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />
            <GridToolbarQuickFilter />
            
          </GridToolbarContainer>
         
        </>
        );
      }

    return(<>

    <NavBar>

    {isModalOpen ? (   <div
        tabIndex={-1}
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto bg-opacity-80 bg-slate-400"
      >
        <div className="relative w-full max-w-md">
          <div className="relative bg-gray-700 rounded-lg shadow ">
            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal" onClick ={
              () => {setIsModalOpen(!isModalOpen)}
            }>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add Route</h3>

                {/* //   {
  //     "bound": "SOUTH",
  //     "origin" : "PITX",
  //     "destination" : ""
  // } */}

                <form className="space-y-6" onSubmit={AddData}>
                    <div>
                        <label htmlFor="bound" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bound</label>
                        <input type="text" name="bound" id="bound" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" 
                         value ={bound}

                         onChange={(event) => {
                          setBound(event.target.value);
                        }}
                        
                        required
                         />
                    </div>
                    <div>
                    <label htmlFor="origin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Origin</label>
                        <input type="text" name="origin" id="origin" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" 
                        value ={origin}
                      
                        onChange={ (event) =>{
                          setOrigin(event.target.value)
                        }} 
                        required />
                    </div>

                    <div>
                    <label htmlFor="destination" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Destination</label>
                        <input type="text" name="destination" id="destination" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" 
                        value ={destination}
                      
                        onChange={ (event) =>{
                          setDestination(event.target.value)
                        }} 
                        required />
                    </div>

                    <div>
                    <label htmlFor="route_code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Route Code</label>
                        <input type="text" name="route_code" id="route_code" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" 
                        value ={route_code}
                      
                        onChange={ (event) =>{
                          setRouteCode(event.target.value)
                        }} 
                        required />
                    </div>
                    
                    
                    <button type="submit" className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Register</button>
                   
                </form>
            </div>
        </div>
    </div>
</div>) : (<></>)}

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
            />
        </Box>
        </Paper>
     

 
       
    </NavBar>
    </>)
}


