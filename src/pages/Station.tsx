

import HeaderCard from "../components/HeaderCard";
import NavBar from "../components/NavBar";
import Paper from "../components/Paper";
import { DataGrid, GridColDef, GridRowsProp, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport, GridToolbarQuickFilter} from '@mui/x-data-grid';
import {useEffect, useId, useState} from 'react'
import Box from '@mui/material/Box';
import { Button, LinearProgress } from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import axios from 'axios';


const columns: GridColDef[] = [
  
  { 
    field: 'stationName', 
    headerName: 'STATION NAME', 
    flex: 1,
        minWidth: 0,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    editable: true,
   
  },
  { 
    field: 'km', 
    headerName: 'KILOMETER', 
    flex: 1,
        minWidth: 0,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    editable: true,
   
  },

  { 
    field: 'viceVersaKM', 
    headerName: 'VICE VERSA KM', 
    flex: 1,
        minWidth: 0,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    editable: true,
   
  },

  { 
    field: 'routeId', 
    headerName: 'ROUTE ID', 
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






export function Station(){
    const [tableRows, setTableRows] = useState(rows)

    useEffect(() =>{
      
        GetAllData();
        setTableRows(rows)

        return () =>{}

    },[])

    const styles = (theme : any) => ({
      activeSortIcon: {
        opacity: 1,
        color : 'blue',
      },
      inactiveSortIcon: {
        opacity: 0.4,
        color : 'green',
      },
    });


  
    async function GetAllData(){

        try{
          
          const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/station`,{
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


    // {"stationName" : "MOLINO" , "km": 2, "viceVersaKM" : 16, "routeId" : "65164826dea2d77f7b0a76dd"}

    
const [stationName , setStationName] = useState("")

const [km, setKm] = useState("")

const [viceVersaKM, setViceVersaKM] = useState("")

const [routeId, setRouteId] = useState("");

const [isModalOpen, setIsModalOpen] = useState(false)


    async function AddStation() {
      try {
      

        event.preventDefault()
        // Define the request data as an object
        const requestData = {
          stationName: stationName, // Assuming empNo and cardId are variables in your scope
          km : km,
          viceVersaKM : viceVersaKM,
          routeId : routeId
        };
    
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/station`,
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


    function CustomToolbar() {

      return (<>
          
          <GridToolbarContainer>
          <Button variant="text" color="success" onClick={ () =>{
            setIsModalOpen(true)
          }}>
          Add station
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


   // {"stationName" : "MOLINO" , "km": 2, "viceVersaKM" : 16, "routeId" : "65164826dea2d77f7b0a76dd"}
  useEffect(() =>{

    return () =>{}

  },[isModalOpen, km, viceVersaKM, routeId ])

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
{/* 
            // {"stationName" : "MOLINO" , "km": 2, "viceVersaKM" : 16, "routeId" : "65164826dea2d77f7b0a76dd"} */}

                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add Station</h3>
                <form className="space-y-6" onSubmit={AddStation}>
                    <div>
                        <label htmlFor="stationName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Station name</label>
                        <input type="text" name="stationName" id="stationName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" 
                         value ={stationName}

                         onChange={(event) => {
                          setStationName(event.target.value);
                        }}
                        
                        required
                         />
                    </div>
                    <div>
                    <label htmlFor="km" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Km</label>
                        <input type="text" name="km" id="km" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" 
                        value ={km}
                      
                        onChange={ (event) =>{
                          setKm(event.target.value)
                        }} 
                        required />
                    </div>

                    <div>
                    <label htmlFor="viceVersaKM" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Vice versa km</label>
                        <input type="text" name="viceVersaKM" id="viceVersaKM" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" 
                        value ={viceVersaKM}
                      
                        onChange={ (event) =>{
                          setViceVersaKM(event.target.value)
                        }} 
                        required />
                    </div>

                    <div>
                    <label htmlFor="routeId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Route Id</label>
                        <input type="text" name="routeId" id="routeId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" 
                        value ={routeId}
                      
                        onChange={ (event) =>{
                          setRouteId(event.target.value)
                        }} 
                        required />
                    </div>
                    
                    
                    <button type="submit" className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Register</button>
                   
                </form>
            </div>
        </div>
    </div>
</div>) : (<></>)}

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
            />
        </Box>
        </Paper>
     

 
       
    </NavBar>
    </>)
}


