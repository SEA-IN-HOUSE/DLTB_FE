//@ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
import NavBar from "../components/NavBar";
import Paper from "../components/Paper";
import { GridColDef, GridRowsProp, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter,useGridApiContext   } from '@mui/x-data-grid';
import { DataGridPremium } from '@mui/x-data-grid-premium/DataGridPremium';
import {useEffect,  useState} from 'react'
import Box from '@mui/material/Box';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputLabel, LinearProgress, MenuItem, Select, Tab, Tabs, TextField } from "@mui/material";
//import PersonAddIcon from '@mui/icons-material/PersonAdd';
import axios from 'axios';
import SyncIcon from '@mui/icons-material/Sync';
import { useNavigate } from "react-router-dom";
import { ICooperative } from "./Employee";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import moment from 'moment'
// import { BsCurrencyExchange,BsTicketPerforatedFill,BsBagCheck,BsFillSignpostFill,BsFillBusFrontFill,BsFillClipboardCheckFill,BsExclamationTriangle, BsFillEmojiSmileFill ,BsFillTruckFrontFill,BsFillMapFill    } from "react-icons/bs";
import React, { useRef, useCallback } from 'react';
// import PrintIcon from '@mui/icons-material/Print';
import { ComponentToPrint } from '../components/ComponentToPrint';
import CountUp from 'react-countup';
import '../styles/RemoveProWaterMark.css'

import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { useInterval } from 'usehooks-ts'

import {BsFillTruckFrontFill} from 'react-icons/bs'

import { ToastContainer, toast } from 'react-toastify';

import CloseIcon from '@mui/icons-material/Close';
import { FaCashRegister } from "react-icons/fa";

import { styled} from '@mui/system';

import AddIcon from '@mui/icons-material/AddHomeWork';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
  const rows: GridRowsProp = [
   
  ];

  const bankRows: GridRowsProp = [
   
  ];

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


  

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 0, marginTop: 2 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }


  
const useFakeMutationRoute = () => {
  return useCallback(
    (user) =>
      new Promise((resolve, reject) =>
        setTimeout(() => {
          if (user.name?.trim() === '') {
            reject();
          } else {
            resolve(user);
          }
        }, 200),
      ),
    [],
  );
};

function computeMutationRoute(newRow, oldRow) {
  console.log("TEST")
  if (newRow.bound !== oldRow.bound) {
   
    return `Bound from '${oldRow.bound}' to '${newRow.bound}'`;
  }
  if (newRow.origin !== oldRow.origin) {
   
    return `Origin from '${oldRow.origin}' to '${newRow.origin}'`;
  }
  if (newRow.destination !== oldRow.destination) {
   
    return `Destination from '${oldRow.destination}' to '${newRow.destination}'`;
  }

  if (newRow.code !== oldRow.code) {
   
    return `Route code from '${oldRow.code}' to '${newRow.code}'`;
  }

  if (newRow.minimum_fare !== oldRow.minimum_fare) {
   
    return `Minimum fare from '${oldRow.minimum_fare}' to '${newRow.minimum_fare}'`;
  }

  if (newRow.discount !== oldRow.discount) {
   
    return `Discount fare from '${oldRow.discount}' to '${newRow.discount}'`;
  }
  
  if (newRow.first_km !== oldRow.first_km) {
   
    return `FIRST KM fare from '${oldRow.first_km}' to '${newRow.first_km}'`;
  }
  
  if (newRow.pricePerKM !== oldRow.pricePerKM) {
   
    return `Price Per Km fare from '${oldRow.pricePerKM}' to '${newRow.pricePerKM}'`;
  }
  return null;
}



export  function RoutesPage(){

const mutateRow = useFakeMutationRoute();

const noButtonRef = useRef(null);

const [promiseArguments, setPromiseArguments] = useState(null);
  //tab

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  

  
function EditBound(props) {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();

  const handleChangeRow = async (event) => {
    console.log(event.target.value);
    await apiRef.current.setEditCellValue({ id, field, value: event.target.value });

    if (event.key === 'Enter') {
      console.log("TEST")
      apiRef.current.stopCellEditMode({ id, field });
    }
  };


  return (
    <>
        <Select
        value={value}
        onChange={handleChangeRow}

      fullWidth

        autoFocus
      > 
      <MenuItem value ={'SOUTH'}>SOUTH</MenuItem>
      <MenuItem value ={'NORTH'}>NORTH</MenuItem>
      <MenuItem value ={'EAST'}>EAST</MenuItem>
      <MenuItem value ={'WEST'}>WEST</MenuItem>
      </Select>
      </>
  );
}

EditBound.propTypes = {
  /**
   * The column field of the cell that triggered the event.
   */
  field: PropTypes.string.isRequired,
  /**
   * The grid row id.
   */
  id: PropTypes.oneOfType([PropTypes.string]).isRequired,
  /**
   * The cell value.
   * If the column has `valueGetter`, use `params.row` to directly access the fields.
   */
  value: PropTypes.any,
};

const renderEditBound = (params) => {
  return <EditBound {...params} />;
};

//ORIGIN

function EditOrigin(props) {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();

  const handleChangeRow = async (event) => {
    console.log(event.target.value);
    await apiRef.current.setEditCellValue({ id, field, value: event.target.value });

    if (event.key === 'Enter') {
      console.log("TEST")
      apiRef.current.stopCellEditMode({ id, field });
    }
  };


  return (
    <>
       <TextField
          type="text" // specify the input type as number
          value={value}
          onChange={handleChangeRow}
          autoFocus
          fullWidth
        />
      </>
  );
}

EditOrigin.propTypes = {
  /**
   * The column field of the cell that triggered the event.
   */
  field: PropTypes.string.isRequired,
  /**
   * The grid row id.
   */
  id: PropTypes.oneOfType([PropTypes.string]).isRequired,
  /**
   * The cell value.
   * If the column has `valueGetter`, use `params.row` to directly access the fields.
   */
  value: PropTypes.any,
};

const renderEditOrigin = (params) => {
  return <EditOrigin {...params} />;
};

////DESTINATION


function EditDestination(props) {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();

  const handleChangeRow = async (event) => {
    console.log(event.target.value);
    await apiRef.current.setEditCellValue({ id, field, value: event.target.value });

    if (event.key === 'Enter') {
      console.log("TEST")
      apiRef.current.stopCellEditMode({ id, field });
    }
  };


  return (
    <>
       <TextField
          type="text" // specify the input type as number
          value={value}
          onChange={handleChangeRow}
          autoFocus
          fullWidth
        />
      </>
  );
}

EditDestination.propTypes = {
  /**
   * The column field of the cell that triggered the event.
   */
  field: PropTypes.string.isRequired,
  /**
   * The grid row id.
   */
  id: PropTypes.oneOfType([PropTypes.string]).isRequired,
  /**
   * The cell value.
   * If the column has `valueGetter`, use `params.row` to directly access the fields.
   */
  value: PropTypes.any,
};

const renderEditDestination= (params) => {
  return <EditDestination {...params} />;
};


////CODE


function EditCode(props) {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();

  const handleChangeRow = async (event) => {
    console.log(event.target.value);
    await apiRef.current.setEditCellValue({ id, field, value: event.target.value });

    if (event.key === 'Enter') {
      console.log("TEST")
      apiRef.current.stopCellEditMode({ id, field });
    }
  };


  return (
    <>
       <TextField
          type="text" // specify the input type as number
          value={value}
          onChange={handleChangeRow}
          autoFocus
          fullWidth
        />
      </>
  );
}

EditCode.propTypes = {
  /**
   * The column field of the cell that triggered the event.
   */
  field: PropTypes.string.isRequired,
  /**
   * The grid row id.
   */
  id: PropTypes.oneOfType([PropTypes.string]).isRequired,
  /**
   * The cell value.
   * If the column has `valueGetter`, use `params.row` to directly access the fields.
   */
  value: PropTypes.any,
};

const renderEditCode= (params) => {
  return <EditCode {...params} />;
};

//// MINIMUM FARE


function EditMinimumFare(props) {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();

  const handleChangeRow = async (event) => {
    console.log(event.target.value);
    await apiRef.current.setEditCellValue({ id, field, value: event.target.value });

    if (event.key === 'Enter') {
      console.log("TEST")
      apiRef.current.stopCellEditMode({ id, field });
    }
  };


  return (
    <>
       <TextField
          type="number" // specify the input type as number
          value={value}
          onChange={handleChangeRow}
          autoFocus
          fullWidth
        />
      </>
  );
}

EditMinimumFare.propTypes = {
  /**
   * The column field of the cell that triggered the event.
   */
  field: PropTypes.string.isRequired,
  /**
   * The grid row id.
   */
  id: PropTypes.oneOfType([PropTypes.string]).isRequired,
  /**
   * The cell value.
   * If the column has `valueGetter`, use `params.row` to directly access the fields.
   */
  value: PropTypes.any,
};

const renderEditMinimumFare= (params) => {
  return <EditMinimumFare {...params} />;
};

//DISCOUNT


function EditDiscount(props) {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();

  const handleChangeRow = async (event) => {
    console.log(event.target.value);
    await apiRef.current.setEditCellValue({ id, field, value: event.target.value });

    if (event.key === 'Enter') {
      console.log("TEST")
      apiRef.current.stopCellEditMode({ id, field });
    }
  };


  return (
    <>
       <TextField
          type="number" // specify the input type as number
          value={value}
          onChange={handleChangeRow}
          autoFocus
          fullWidth
        />
      </>
  );
}

EditDiscount.propTypes = {
  /**
   * The column field of the cell that triggered the event.
   */
  field: PropTypes.string.isRequired,
  /**
   * The grid row id.
   */
  id: PropTypes.oneOfType([PropTypes.string]).isRequired,
  /**
   * The cell value.
   * If the column has `valueGetter`, use `params.row` to directly access the fields.
   */
  value: PropTypes.any,
};

const renderEditDiscount= (params) => {
  return <EditDiscount {...params} />;
};




//FIRST KM


function EditFirstKM(props) {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();

  const handleChangeRow = async (event) => {
    console.log(event.target.value);
    await apiRef.current.setEditCellValue({ id, field, value: event.target.value });

    if (event.key === 'Enter') {
      console.log("TEST")
      apiRef.current.stopCellEditMode({ id, field });
    }
  };


  return (
    <>
       <TextField
          type="number" // specify the input type as number
          value={value}
          onChange={handleChangeRow}
          autoFocus
          fullWidth
        />
      </>
  );
}

EditFirstKM.propTypes = {
  /**
   * The column field of the cell that triggered the event.
   */
  field: PropTypes.string.isRequired,
  /**
   * The grid row id.
   */
  id: PropTypes.oneOfType([PropTypes.string]).isRequired,
  /**
   * The cell value.
   * If the column has `valueGetter`, use `params.row` to directly access the fields.
   */
  value: PropTypes.any,
};

const renderEditFirstKM= (params) => {
  return <EditFirstKM {...params} />;
};



//PRICE PER KM


function EditPricePerKM(props) {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();

  const handleChangeRow = async (event) => {
    console.log(event.target.value);
    await apiRef.current.setEditCellValue({ id, field, value: event.target.value });

    if (event.key === 'Enter') {
      console.log("TEST")
      apiRef.current.stopCellEditMode({ id, field });
    }
  };


  return (
    <>
       <TextField
          type="number" // specify the input type as number
          value={value}
          onChange={handleChangeRow}
          autoFocus
          fullWidth
        />
      </>
  );
}

EditPricePerKM.propTypes = {
  /**
   * The column field of the cell that triggered the event.
   */
  field: PropTypes.string.isRequired,
  /**
   * The grid row id.
   */
  id: PropTypes.oneOfType([PropTypes.string]).isRequired,
  /**
   * The cell value.
   * If the column has `valueGetter`, use `params.row` to directly access the fields.
   */
  value: PropTypes.any,
};

const renderEditPricePerKM= (params) => {
  return <EditPricePerKM {...params} />;
};
  //////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  const [isSyncing, setIsSyncing] = useState(false)
  const [total, setTotal] = useState(0);

  const [totalTicket, setTotalTicket] = useState(0);

  const [totalBaggage, setTotalBaggage] = useState(0);

  const [grandTotal, setGrandTotal] = useState(0);

  const [coopList, setCoopList] = useState([]);

  const [filterTableCompanyId, setFilterTableCompanyId] = useState(localStorage.getItem('companyId'));

  const [isNumeric, setIsNumeric] = useState(false);

  const [fromDate , setFromDate] = useState(null);

  const [toDate,  setToDate] = useState(null)

  const [filterType, setFilterType] = useState("");

  const [filterData, setFilterData] = useState("");
  
  const [filterApplied, setFilterApplied] = useState(false)

  const [isLoading, setIsLoading] = useState(false);

  const [totalPassenger, setTotalPassenger] = useState(0);

  const [totalBaggageGet, setTotalBaggageGet] = useState(0);

  const [totalCashCollection, setTotalCashCollection] = useState(0);

  const [dataPerReferenceNo, setDataPerReferenceNo] = useState([]);

  const [numberOfRoutes, setNumberOfRoutes] = useState(0);


async function GetCooperative(){
  setIsSyncing(false)
  try{

    const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/cooperative`,{
      headers :{
          Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
      }
  })
      
      const response = await request.data;
      
      if(response.messages[0].code === '0'){
  
        setCoopList(
          
          // eslint-disable-next-line @typescript-eslint/no-explicit-any  
          response.response.map((coop : any ) =>{
    
            
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

  GetCooperative();
  return () =>{}
},[filterTableCompanyId])


const routeColumns: GridColDef[] = [
  
  { 
    field: 'bound', 
    headerName: 'BOUND', 
    headerClassName: 'super-app-theme--header',
    editable: true,
    width: 180,
    headerAlign: 'center',
    align: 'center',
    
    renderEditCell: renderEditBound
  },
  { 
    field: 'origin', 
    headerName: 'ORIGIN', 
    headerClassName: 'super-app-theme--header',
      editable: true,
      width: 280,
      headerAlign: 'center',
      align: 'center',
      renderEditCell: renderEditOrigin
  },

  { 
    field: 'destination', 
    headerName: 'DESTINATION', 
    headerClassName: 'super-app-theme--header',
    editable: true,
    width: 280,
    headerAlign: 'center',
    align: 'center',
    renderEditCell: renderEditDestination
  },

  { 
    field: 'code', 
    headerName: 'ROUTE CODE', 
    headerClassName: 'super-app-theme--header',
    editable: true,
    width: 180,
    headerAlign: 'center',
    align: 'center',
    renderEditCell: renderEditCode
  },
  // { 
  //   field: 'minimum_fare', 
  //   headerName: 'MINIMUM FARE', 
  //   headerClassName: 'super-app-theme--header',
  //     editable: true,
  //     width: 180,
  //     headerAlign: 'center',
  //     align: 'center',
  //  renderEditCell: renderEditMinimumFare
  // },

  // { 
  //   field: 'discount', 
  //   headerName: 'DISCOUNT', 
  //   headerClassName: 'super-app-theme--header',
  //   editable: true,
  //   width: 180,
  //   headerAlign: 'center',
  //   align: 'center',
  //   renderEditCell:renderEditDiscount
  // },
  // { 
  //   field: 'first_km', 
  //   headerName: 'FIRST KM', 
  //   headerClassName: 'super-app-theme--header',
  //     editable: true,
  //     width: 180,
  //     headerAlign: 'center',
  //     align: 'center',
  //  renderEditCell:renderEditFirstKM
  // },
  // { 
  //   field: 'pricePerKM', 
  //   headerName: 'PRICE PER KM', 
  //   headerClassName: 'super-app-theme--header',
  //     editable: true,
  //     width: 180,
  //     headerAlign: 'center',
  //     align: 'center',
  //  renderEditCell:renderEditPricePerKM
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
    headerClassName: 'super-app-theme--header',
      editable: false,
      width: 180,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        
        const formattedDate = moment(params.value).format('YYYY-MM-DD h:mm:ss a');
        return <div>{formattedDate}</div>;
      },
  },
  { field: 'actions', 
  headerName: 'ACTIONS', 
  width: 100, 
  headerClassName: 'super-app-theme--header',
  editable: false,
 headerAlign: 'center',
  align: 'center',
  renderCell: (params) => {
    return (
      <IconButton aria-label="edit" size="small" onClick={() => {
        setDeleteId(params.row.id);
        setShowDeleteDialog(true)
        }}>
        <DeleteForeverIcon fontSize="small" color={"error"}/>
    </IconButton>
    );
  } },

  ];
  

  

    // CONFIRM DIALOG

    const processRowUpdate = useCallback(
      (newRow, oldRow) =>
        new Promise((resolve, reject) => {
          console.log('TEST')
          const mutation = computeMutationRoute(newRow, oldRow);
          if (mutation) {
            // Save the arguments to resolve or reject the promise later
            setPromiseArguments({ resolve, reject, newRow, oldRow });
          } else {
            resolve(oldRow); // Nothing was changed
          }
        }),
      [],
    );
  
  
    const handleNo = () => {
      const { oldRow, resolve } = promiseArguments;
      resolve(oldRow); // Resolve with the old row to not update the internal state
      setPromiseArguments(null);
    };
  
    const handleYes = async () => {
      const { newRow, oldRow, reject, resolve } = promiseArguments;
      try {

      // bound
  
      // origin
  
      // destination

      // code
   
      // minimum_fare
  
      // discount
  
      // pricePerKM
  
      // first_km
       
        const bodyParameters ={
          id:newRow['id'],
          bound: newRow['bound'],
          origin: newRow['origin'],
          destination: newRow['destination'],
          code: newRow['code'],
          minimum_fare: newRow['minimum_fare'],
          discount: newRow['discount'],
          pricePerKM: newRow['pricePerKM'],
          first_km: newRow['first_km']
        }

        console.log(bodyParameters)
    const request = await axios.put(`${import.meta.env.VITE_BASE_URL}/directions/${newRow['id']}`,
    bodyParameters,
    {
      headers :{
          Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
      }
    })

     
    const responseGet = await request.data;
    console.log(responseGet)
    const response = await mutateRow(newRow);
      if(responseGet.messages[0].code === 0){
        GetFilterData();
        resolve(response);
        toast.success("Updated Succesfully!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
        setPromiseArguments(null);
      }else{
        toast.error("Failed to update!", {
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
        reject(oldRow);
        setPromiseArguments(null);
        toast.error("Please check your internet connection!", {
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
    }


    const handleEntered = () => {
      // The `autoFocus` is not used because, if used, the same Enter that saves
      // the cell triggers "No". Instead, we manually focus the "No" button once
      // the dialog is fully open.
      // noButtonRef.current?.focus();
    };
  
    const renderConfirmDialog = () => {
      console.log("TESTSSS")
      if (!promiseArguments) {
        return null;
      }
      const { newRow, oldRow } = promiseArguments;
      const mutation = computeMutationRoute(newRow, oldRow);
  
      return (
        <Dialog
          maxWidth="xs"
          TransitionProps={{ onEntered: handleEntered }}
          open={!!promiseArguments}
        >
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogContent dividers>
            {`Pressing 'Yes' will change ${mutation}.`}
          </DialogContent>
          <DialogActions>
            <Button ref={noButtonRef} onClick={handleNo}>
              No
            </Button>
            <Button onClick={handleYes}>Yes</Button>
          </DialogActions>
        </Dialog>
      );
    };


  const navigate = useNavigate();
  useEffect(() =>{

    if(!localStorage.getItem('token')){
      localStorage.clear();
      navigate('/login')
    }
    

    if(!localStorage.getItem('pageCode')?.includes("tTicket, ") && localStorage.getItem('role') !== "Administrator" && localStorage.getItem('role') !== "User Admin" && localStorage.getItem('role') !== "Attorney"){
      navigate('/dashboard')
    }

    return () =>{}

},[])

    const [tableRows, setTableRows] = useState(rows)

    const [bankTableRows, setBankTableRows] = useState(bankRows)

    const [bound , setBound] = useState("")
    const [origin, setOrigin] = useState("")
    const [route_code, setRouteCode] = useState("")
    const [destination, setDestination] = useState("")
    
    const [isModalOpen, setIsModalOpen] = useState(false)
  
    const [coopId, setCoopId] = useState("");
  
    const [minimum_fare, setMinimumFare] = useState(0);
  
    const [discount , setDiscount] = useState(0);
  
    const [firstKm, setFirstKm] = useState(0);
  
    const [pricePerKM, setPricePerKM] = useState(0);

   

    useEffect(() =>{

      return () =>{}
    },[fromDate, toDate])
      
   
 
  
      
    

    useEffect(() =>{

    },[tableRows])

   

    async function AddData() {
      try {
  
        // minimum_fare
        // 61
        // discount
        // 20
        // first_km
        // 26
        // pricePerKM
        // 2.35
        event?.preventDefault()
        // Define the request data as an object
        const requestData = {
          coopId: filterTableCompanyId,
          bound: bound, // Assuming empNo and cardId are variables in your scope
          origin: origin,
          code : route_code,
          destination: destination,
          minimum_fare: minimum_fare,
          discount: discount,
          first_km: firstKm,
          pricePerKM: pricePerKM,
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
  
          if(responseData.messages[0].code === "0"){
            
            GetFilterData();
        
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
          setIsModalOpen(!isModalOpen)
        }
    }

      //Toolbar
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
            Add Route
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




const componentRef = useRef();
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  // });



  async function GetFilterData(){

   
      
      try{
        setIsLoading(true)
        const bodyParameters = {
          filterData: filterData,
          filterType: filterType,
          fromDate: fromDate,
          toDate:toDate,
        }

    const request = await axios.post(`${import.meta.env.VITE_BASE_URL}/directions/filter/${filterTableCompanyId}`,bodyParameters,{
      headers :{
          Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
      }
  })
      
      const response = await request.data;
  
      if(response.messages[0].code === 0){
  
  
        if(JSON.stringify(response.response) !== JSON.stringify(tableRows)){
          
      
          
       
          setTableRows(
            response.response.map((data: any) => {
              return { id: data._id, ...data };
            }).sort((a, b) => {
              const dateCreatedA = new Date(a.dateCreated).getTime();
              const dateCreatedB = new Date(b.dateCreated).getTime();
              return dateCreatedB - dateCreatedA; // Sort by dateCreated in descending order
            })
          );
          
            
            setNumberOfRoutes(() => response.response.length)

            let totalTrip = 0;
  
            response.response.map((data : any) =>{
              totalTrip = totalTrip + 1;
             })
            
            setTotal(() => totalTrip)
         
            setTotalTicket(() => 0)
            
             let totalBus = 0;

             let totalTrips = 0;

             let totalNumberOfPassenger = 0;
             
             let totalBaggageNumber = 0;

             let totalRevenueAtm = 0;
  
            response.response.map((data : any) =>{

            totalBus = totalBus + data.bus_unit;

            totalTrips = totalTrips + data.trip;

            totalNumberOfPassenger = totalNumberOfPassenger + data.no_of_passenger;   
            
            totalBaggageNumber = totalBaggageNumber + data.no_of_baggage

            totalRevenueAtm = totalRevenueAtm + data.cash_collection;
            })

            setTotalTicket(() =>totalBus)
  
            setTotalBaggage(() => totalTrips);
  
            setGrandTotal(() => totalNumberOfPassenger)

            setTotalPassenger(() =>totalNumberOfPassenger)

            setTotalBaggageGet(() =>totalBaggageNumber)
  
            setTotalCashCollection(() => totalRevenueAtm)
  
        }     
     
      }
  
      setIsLoading(false)
  
  }catch(e){
 
      console.log("ERROR = "+ e)
  }finally{
    setIsLoading(false)
  }
  

}




async function GetTransactionData(){

   
      
  try{
    setIsLoading(true)
  

const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/transcation-report`,{
  headers :{
      Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
  }
})
  
  const response = await request.data;

  if(response.messages[0].code === 0){


    if(JSON.stringify(response.response) !== JSON.stringify(bankRows)){
      
  
        setBankTableRows(
        
          response.response.map((data : any) =>{

         
            return {id: data._id, ...data}
          })
          .sort((a, b) => {
            const dateCreatedA = new Date(a.dateCreated).getTime();
            const dateCreatedB = new Date(b.dateCreated).getTime();
            return dateCreatedB - dateCreatedA; // Sort by dateCreated in descending order
          })
        )
         
       
    }     
 
  }

  setIsLoading(false)

}catch(e){

  console.log("ERROR = "+ e)
}finally{
setIsLoading(false)
}


}



useInterval(() => {
  if(!isLoading){
    GetFilterData();
    GetTransactionData();
  }else{
    () =>{}
  }
 
}, 15000);


useEffect(()=>{
  
  GetFilterData();
  GetTransactionData();
  return () =>{
   
  }

},[filterData, filterType, toDate, fromDate])

useEffect(() =>{

 
  return () => {
    console.log(`Table refresh`)
  }

}, [tableRows, bankTableRows])

useEffect(() =>{

  return() =>{}
}, [filterData])


useEffect(()=>{
  setValue(0)
  GetFilterData()
return () =>{}
},[filterTableCompanyId])


//delete modal
const [deleteId, setDeleteId] = useState("");
const [showDeleteDialog, setShowDeleteDialog] =useState(false)

async function handleYesDelete(){
  try {
   
    
const request = await axios.delete(`${import.meta.env.VITE_BASE_URL}/directions/${deleteId}`,
{
  headers :{
      Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
  }
})

 
const responseGet = await request.data;

console.log(responseGet)

  if(responseGet.messages[0].code === 0){
    GetFilterData();
 
    toast.success("Deleted Succesfully!", {
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
    toast.error("Failed to delete!", {
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
  setShowDeleteDialog(!showDeleteDialog)
  } catch (error) {
    console.log(`ERROR IN DELETING ${error.message}`)
    setShowDeleteDialog(!showDeleteDialog)
    toast.error("Please check your internet connection!", {
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
}

const handleInputChange = (event) => {
  const selectedValue = event.target.value;

  // Find the corresponding coop object based on the selected value
  const selectedCoop = coopList.find(coop => coop.id === selectedValue);

  if (selectedCoop) {
    // Set the filterTableCompanyId with the selected value
    setFilterTableCompanyId(selectedCoop.id);

    // Set isNumeric based on coop.isNumeric
    setIsNumeric(selectedCoop.isNumeric); // Assuming setIsNumeric is a state setter for isNumeric
  } else {
    // Handle when the selected value does not match any coop
    // For example:
    console.log('Selected value does not match any coop');
  }
};


useEffect(() =>{

return()=>{
  console.log(showDeleteDialog)
}
},[showDeleteDialog])

return(
      <div 
       style={{
        backgroundColor: '#e2e8f0',
        height:'auto'
      }}
      >
    <NavBar>
{renderConfirmDialog()}
<Dialog
          maxWidth="xs"
          open={showDeleteDialog}
        >
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
          <DialogActions>
            <Button onClick={() =>  setShowDeleteDialog(!showDeleteDialog)}>
              No
            </Button>
            <Button onClick={handleYesDelete}>Yes</Button>
          </DialogActions>
        </Dialog>
    {renderConfirmDialog()}
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
        />

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
        />
 

    <div className="invisible absolute">
    <ComponentToPrint  
    ref={componentRef} 
    rows ={tableRows} 
    columns ={routeColumns}
    grandTotal ={grandTotal}
    />
    </div>
    <Dialog open={isModalOpen} onClose={() => setIsModalOpen(!isModalOpen)} fullWidth>
     <form onSubmit={AddData}>
     <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add Route
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
 
      return (
        <MenuItem value={coop.id}>{coop.cooperativeCodeName}</MenuItem>
      )

    })
    }
   
  </Select>
</FormControl> */}
         
          <FormControl fullWidth sx ={{marginTop: 1}}>
        <InputLabel id="demo-simple-select-helper-label">Bound</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={bound}
          label="Bound"
          required
          defaultValue={""}        
          onChange={(event) => setBound(event.target.value)}
        >
          <MenuItem value={"NORTH"}>NORTH</MenuItem>
          <MenuItem value={"EAST"}>EAST</MenuItem>
          <MenuItem value={"WEST"}>WEST</MenuItem>
          <MenuItem value={"SOUTH"}>SOUTH</MenuItem>
            
        </Select>
        {/* <FormHelperText>With label + helper text</FormHelperText> */}
      </FormControl>

          <TextField
            autoFocus
            margin="dense"
            id="origin"
            name ="origin"
            label="Origin"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(event) => setOrigin(event.target.value)}
          />

         
          
          <TextField
            autoFocus
            margin="dense"
            id="destination"
            name ="destination"
            label="Destination"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(event) => setDestination(event.target.value)}
          />
           <TextField
            autoFocus
            margin="dense"
            id="route_code"
            name ="route_code"
            label="Route Code"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(event) => setRouteCode(event.target.value)}
          />

          {/* <TextField
            autoFocus
            margin="dense"
            id="discount"
            name ="discount"
            label="Discount"
            type="number"
            fullWidth
            inputProps={{ step: "any" }}
            variant="outlined"
            onChange={(event) => setDiscount(parseFloat(event.target.value))}
          />
           <TextField
            autoFocus
            margin="dense"
            id="firstKm"
            name ="firstKm"
            label="First KM"
            type="number"
            fullWidth
            variant="outlined"
            onChange={(event) => setFirstKm(parseFloat(event.target.value))}
          />

<TextField
            autoFocus
            margin="dense"
            id="miniumFare"
            name ="miniumFare"
            label="Minimum Fare"
            type="number"
            inputProps={{ step: "any" }}
            fullWidth
            variant="outlined"
            onChange={(event) => setMinimumFare(parseFloat(event.target.value))}
          />

<TextField
            autoFocus
            margin="dense"
            id="pricePerKM"
            name ="pricePerKM"
            label="Price Per KM"
            type="number"
            inputProps={{ step: "any" }}
            fullWidth
            variant="outlined"
            onChange={(event) => setPricePerKM(parseFloat(event.target.value))}
          />
         */}
        
         
        </DialogContent>
        
        <DialogActions sx={{marginRight: 2, marginLeft: 2}}>
        
          <Button onClick={() => setIsModalOpen(!isModalOpen)}>Cancel</Button>
          <Button type ="submit" variant="contained" color="success">Save</Button>
        </DialogActions>
        </form>
  </Dialog>
  
   
    <div className="relative block mt-10  p-12 bg-white border border-gray-200 rounded-lg shadow-lg"
        style ={{
            height: 'auto'
        }}
        >
            <h1 className="mb-2 text-5xl  font-bold tracking-tight text-indigo-900">ROUTES / STATIONS</h1>
        </div>


        <div className="sm:py-6">
  <div className="space-y-0 md:grid md:grid-cols-0 lg:grid-cols-1 xl:grid-cols-1 md:gap-1 md:space-y-0">
  
     
<div className=" bg-white border border-gray-200 rounded-lg shadow-lg p-4">  
  <div className="flex items-center">
    <div className="inline-flex flex-shrink-0 justify-center items-center w-12 h-12 text-white bg-gradient-to-br from-blue-900 to-[#161d6f] rounded-lg" >
      
        {<BsFillTruckFrontFill  />}
    </div>
    <div className="flex-shrink-0 ml-3">
      <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl"> <CountUp end={total} /></span>
      <h3 className="text-base font-normal text-gray-500">{"NO. ROUTES"}</h3>
    </div>
  </div>
</div>


  </div>


  </div>



        <Paper style={{width: '100%', marginTop: '10px' }}>
            <Box sx = {{
            '& .super-app-theme--header': {
            backgroundColor: '#161d6f',
            color:'white',
            },
            height:'400'
            }}>
           
           <div className="flex flex-row space-x-4 items-center mb-2">


            
{localStorage.getItem('role') === "Administrator" ? 
        
        <FormControl  margin ="dense" style={{width:100}}>
          <InputLabel id="filter-company-demo-simple-select-autowidth-label">Company</InputLabel>
          <Select
            labelId="filter-company-demo-demo-simple-select-autowidth-label"
            id="filter-company-demo-demo-simple-select-autowidth"
            value={filterTableCompanyId}
            onChange={handleInputChange}
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
    
        return (
          <MenuItem value={coop.id}>{coop.cooperativeCodeName}</MenuItem>
        )

      })
      }
          
          </Select>
  </FormControl> :
  null
        }

           <LocalizationProvider dateAdapter={AdapterDayjs}  >
              <DemoContainer components={['DateTimePicker']} >
                <DateTimePicker 
                label="Filter From" 
             
                onChange={(newValue) => setFromDate(() => newValue)}
                 />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DateTimePicker']} >
                <DateTimePicker 
                label="Filter To" 
                onChange={(newValue) => setToDate(() => newValue)}
         
                />
              </DemoContainer>
            </LocalizationProvider>
            
         
          </div>

        

              <div className="flex flex-row space-x-4 items-center">
                <FormControl  margin="dense"  style={{ width: '100%', maxWidth: '500px' }}>
                  <InputLabel id="demo-simple-select-label">Filter By</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filterType}
                    label="Filter By"
       
                    onChange={(event) => setFilterType( () => event.target.value)}
                    MenuProps={{ PaperProps: { style: { maxHeight: 264 } } }}
                  >
                    <MenuItem value={"None"}>{"None"}</MenuItem>
                    {routeColumns.map((column) => (
                      <MenuItem value={column.field}>{column.field.replace(/_/g, ' ').toUpperCase()}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                 id="filterData" 
                label="Filter Data" 
                variant="outlined" 
                value={filterData}
                margin="dense"
                fullWidth
                onChange={(event) => setFilterData(() => event.target.value)}
                 />


              </div>

              <div>
         
        
        </div>
        <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
        value={value} 
        onChange={handleChange} 
        aria-label="basic tabs example"
        variant="scrollable"
        scrollButtons="auto"
        >
        <Tab label="Routes" {...a11yProps(0)} />
          {
            Object(tableRows).length > 0  ?
            tableRows.map((data : any , index) =>{
              return <Tab label={data.origin+"-"+data.destination} {...a11yProps(index+1)} />
            }) 
            :
            <></>
          }
          
          
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
      <Box sx = {{
            '& .super-app-theme--header': {
            backgroundColor: '#161d6f',
            color:'white',
            },
            height:700
            }}>
             
            <StyledDataGrid
            
  processRowUpdate={processRowUpdate}
  experimentalFeatures={{ newEditingApi: true }}
           initialState={{ pinnedColumns: { left: ['reference_no'], right:['actions']} }}
            rows={tableRows} columns={routeColumns}
            loading = {isLoading}
             slots={{toolbar: CustomToolbar, loadingOverlay: LinearProgress}}
             sx={{
              '& .MuiDataGrid-cell': {
                fontSize: '1rem',
                padding: '15px',
              },
            }}
            />
         </Box>
      </CustomTabPanel>

      {
            Object(tableRows).length > 0  ?
            tableRows.map((data : any , index) =>{

              return (
                <CustomTabPanel value={value} index={index+1}>
                <Box sx = {{
                      '& .super-app-theme--header': {
                      backgroundColor: '#161d6f',
                      color:'white',
                      },
                      height:700
                      }}>
                       
                      <StationDatatables
                  routeId = {data.id}
                  coopId = {data.coopId}
                  coops = {coopList}
                  isNumeric = {isNumeric}
                      />
                   </Box>
                </CustomTabPanel>
              )
            }) 
            :
            <></>
          }
   

      </Box>
        </Box>
        </Paper>   
    </NavBar>
    </div>)
}

////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////STATIONS
////////////////////////////////////////////////////////////////////////////////////
const useFakeMutation = () => {
  return useCallback(
    (user) =>
      new Promise((resolve, reject) =>
        setTimeout(() => {
          if (user.name?.trim() === '') {
            reject();
          } else {
            resolve(user);
          }
        }, 200),
      ),
    [],
  );
};

function computeMutation(newRow, oldRow) {
  if (newRow.rowNo !== oldRow.rowNo) {
   
    return `Row no from '${oldRow.rowNo}' to '${newRow.rowNo}'`;
  }

  if (newRow.km !== oldRow.km) {
   
    return `KM from '${oldRow.km}' to '${newRow.km}'`;
  }

  if (newRow.stationName !== oldRow.stationName) {
   
    return `Station name from '${oldRow.stationName}' to '${newRow.stationName}'`;
  }
  if (newRow.amount !== oldRow.statamountionName) {
   
    return `Amount from '${oldRow.amount}' to '${newRow.amount}'`;
  }
  return null;
}


//STATIONS

function StationDatatables(props){

  const [isLoading ,setIsLoading] = useState(false)

  const [coopList, setCoopList] = useState(props.coops)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [filterTableCompanyId, setFilterTableCompanyId] = useState(props.coopId);

  
const mutateRow = useFakeMutation();

const noButtonRef = useRef(null);

const [promiseArguments, setPromiseArguments] = useState(null);

function EditStationName(props) {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();

  const handleChangeRow = async (event) => {
    console.log(event.target.value);
    await apiRef.current.setEditCellValue({ id, field, value: event.target.value });
    if (event.key === 'Enter') {
    
      apiRef.current.stopCellEditMode({ id, field });
    }
  };


  return (
    <>
      <TextField
        type="text" // specify the input type as number
        value={value}
        onChange={handleChangeRow}
        autoFocus
        fullWidth
      />
    </>
  );
}

EditStationName.propTypes = {
  /**
   * The column field of the cell that triggered the event.
   */
  field: PropTypes.string.isRequired,
  /**
   * The grid row id.
   */
  id: PropTypes.oneOfType([PropTypes.string]).isRequired,
  /**
   * The cell value.
   * If the column has `valueGetter`, use `params.row` to directly access the fields.
   */
  value: PropTypes.any,
};

const renderEditStationName = (params) => {
  return <EditStationName {...params} />;
};

  
function EditKm(props) {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();

  const handleChangeRow = async (event) => {
    console.log(event.target.value);
    await apiRef.current.setEditCellValue({ id, field, value: event.target.value });
    if (event.key === 'Enter') {
    
      apiRef.current.stopCellEditMode({ id, field });
    }
  };


  return (
    <>
      <TextField
        type="number" // specify the input type as number
        value={value}
        onChange={handleChangeRow}
        autoFocus
        fullWidth
      />
    </>
  );
}

EditKm.propTypes = {
  /**
   * The column field of the cell that triggered the event.
   */
  field: PropTypes.string.isRequired,
  /**
   * The grid row id.
   */
  id: PropTypes.oneOfType([PropTypes.number]).isRequired,
  /**
   * The cell value.
   * If the column has `valueGetter`, use `params.row` to directly access the fields.
   */
  value: PropTypes.any,
};

const renderEditKm = (params) => {
  return <EditKm {...params} />;
};



  function EditStatus(props) {
    const { id, value, field } = props;
    const apiRef = useGridApiContext();
  
    const handleChangeRow = async (event) => {
      console.log(event.target.value);
      await apiRef.current.setEditCellValue({ id, field, value: event.target.value });
      if (event.key === 'Enter') {
      
        apiRef.current.stopCellEditMode({ id, field });
      }
    };
  
  
    return (
      <>
        <TextField
          type="number" // specify the input type as number
          value={value}
          onChange={handleChangeRow}
          autoFocus
          fullWidth
        />
      </>
    );
  }
  
  EditStatus.propTypes = {
    /**
     * The column field of the cell that triggered the event.
     */
    field: PropTypes.string.isRequired,
    /**
     * The grid row id.
     */
    id: PropTypes.oneOfType([PropTypes.number]).isRequired,
    /**
     * The cell value.
     * If the column has `valueGetter`, use `params.row` to directly access the fields.
     */
    value: PropTypes.any,
  };
  
  const renderEditRowNo = (params) => {
    return <EditStatus {...params} />;
  };


  function EditAmount(props) {
    const { id, value, field } = props;
    const apiRef = useGridApiContext();
  
    const handleChangeRow = async (event) => {
      console.log(event.target.value);
      await apiRef.current.setEditCellValue({ id, field, value: event.target.value });
      if (event.key === 'Enter') {
      
        apiRef.current.stopCellEditMode({ id, field });
      }
    };
  
  
    return (
      <>
        <TextField
          type="number" // specify the input type as number
          value={value}
          onChange={handleChangeRow}
          putProps={{ step: "any" }}
          autoFocus
          fullWidth
        />
      </>
    );
  }
  
  EditAmount.propTypes = {
    /**
     * The column field of the cell that triggered the event.
     */
    field: PropTypes.string.isRequired,
    /**
     * The grid row id.
     */
    id: PropTypes.oneOfType([PropTypes.number]).isRequired,
    /**
     * The cell value.
     * If the column has `valueGetter`, use `params.row` to directly access the fields.
     */
    value: PropTypes.any,
  };
  
  const renderEditAmount = (params) => {
    return <EditAmount {...params} />;
  };

  const stationColumns: GridColDef[] = [

    { 
      field: 'stationName', 
      headerName: 'STATION NAME', 
      flex: 1,
          minWidth: 180,
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header',
      align: 'center',
      editable: true,
      renderEditCell: renderEditStationName,
    },
    { 
      field: 'km', 
      headerName: 'KILOMETER', 
      flex: 1,
      minWidth: 180,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center',
      editable: true,
     renderEditCell: renderEditKm,
    },
 
    { 
      field: 'rowNo', 
      headerName: 'ORDER', 
      flex: 1,
      minWidth: 180,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center',
      editable: true,
      renderEditCell: renderEditRowNo,
    },
  /*
    { 
      field: 'routeId', 
      headerName: 'ROUTE ID', 
      flex: 1,
      minWidth: 350,
      headerClassName: 'super-app-theme--header',
      editable: false,
     headerAlign: 'center',
      align: 'center',
     
    },
*/
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
          minWidth: 180,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center',
      editable: false,
      renderCell: (params) => {
        
          const formattedDate = moment(params.value).format('YYYY-MM-DD h:mm:ss a');
          return <div>{formattedDate}</div>;
        },
    },
    { field: 'actions', 
      headerName: 'ACTIONS', 
      width: 100, 
      headerClassName: 'super-app-theme--header',
      editable: false,
     headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <IconButton aria-label="edit" size="small" onClick={() => {
            setDeleteId(params.row.id);
            setShowDeleteDialog(true)
            }}>
            <DeleteForeverIcon fontSize="small" color={"error"}/>
        </IconButton>
        );
      } },
    ];


    const stationNumericColumns: GridColDef[] = [

      { 
        field: 'stationName', 
        headerName: 'STATION NAME', 
        flex: 1,
            minWidth: 180,
        headerAlign: 'center',
        headerClassName: 'super-app-theme--header',
        align: 'center',
        editable: true,
        renderEditCell: renderEditStationName,
      },
      { 
        field: 'amount', 
        headerName: 'AMOUNT', 
        flex: 1,
        minWidth: 180,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center',
        editable: true,
       renderEditCell: renderEditAmount,
      },
   
      { 
        field: 'rowNo', 
        headerName: 'ORDER', 
        flex: 1,
        minWidth: 180,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center',
        editable: true,
        renderEditCell: renderEditRowNo,
      },
    /*
      { 
        field: 'routeId', 
        headerName: 'ROUTE ID', 
        flex: 1,
        minWidth: 350,
        headerClassName: 'super-app-theme--header',
        editable: false,
       headerAlign: 'center',
        align: 'center',
       
      },
  */
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
            minWidth: 180,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center',
        editable: false,
        renderCell: (params) => {
          
            const formattedDate = moment(params.value).format('YYYY-MM-DD h:mm:ss a');
            return <div>{formattedDate}</div>;
          },
      },
      { field: 'actions', 
        headerName: 'ACTIONS', 
        width: 100, 
        headerClassName: 'super-app-theme--header',
        editable: false,
       headerAlign: 'center',
        align: 'center',
        renderCell: (params) => {
          return (
            <IconButton aria-label="edit" size="small" onClick={() => {
              setDeleteId(params.row.id);
              setShowDeleteDialog(true)
              }}>
              <DeleteForeverIcon fontSize="small" color={"error"}/>
          </IconButton>
          );
        } },
      ];

    const stationRows: GridRowsProp = [

    ];

    const [stationTableRows, setStationTableRows] = useState(stationRows)
    
    
    async function GetFilterData(){

   
      
      try{
        setIsLoading(true)
  

    const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/station/${props.routeId}/${props.coopId}`,{
      headers :{
          Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
      }
  })
      
      const response = await request.data;

  
      if(response.messages[0].code === 0){

  
        if(JSON.stringify(response.response) !== JSON.stringify(stationTableRows)){
          
          if (JSON.stringify(response.response) !== JSON.stringify(stationTableRows)) {
            setStationTableRows(
              response.response.map((data) => {
                return { id: data._id, ...data };
              })
              .sort((a, b) => {
                const rowNoA = a.rowNo; // Assuming that the row number is stored in the 'rowNo' property
                const rowNoB = b.rowNo;
            
                // Change the comparison logic to sort by rowNo
                return rowNoA - rowNoB; // Sort by rowNo in ascending order
                // If you want to sort in descending order, you can use: return rowNoB - rowNoA;
              })
            );
          }
            
    
  
        }     
     
      }
  
      setIsLoading(false)
  
  }catch(e){
 
      console.log("ERROR = "+ e)
  }finally{
    setIsLoading(false)
  }
  

}

useInterval(() => {
  if(!isLoading){
    GetFilterData();
    // GetTransactionData();
  }else{
    () =>{}
  }
 
}, 15000);

useEffect(() =>{
  GetFilterData();
  GetCooperative()
 return () =>{} 
},[])

useEffect(() =>{
  return ()=>{}
},[stationTableRows])

async function GetCooperative(){
 
  try{

    const request = await axios.get(`${import.meta.env.VITE_BASE_URL}/cooperative`,{
      headers :{
          Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
      }
  })
      
      const response = await request.data;
      
      if(response.messages[0].code === '0'){
  
        setCoopList(
          
          // eslint-disable-next-line @typescript-eslint/no-explicit-any  
          response.response.map((coop : any ) =>{
    
            
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
        {/* {localStorage.getItem('role') === "Administrator" ? 
      
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
       
          {
    Object(coopList).length === 0? (<></>) :
    coopList.map((coop : ICooperative) =>{

      return (
        <MenuItem value={coop.id}>{coop.cooperativeCodeName}</MenuItem>
      )

    })
    }
        
        </Select>
</FormControl> :
null
      } */}
      </GridToolbarContainer>
     
    </>
    );

}   



const [coopId, setCoopId] = useState("");
    
const [stationName , setStationName] = useState("")

const [km, setKm] = useState("")

const [viceVersaKM, setViceVersaKM] = useState(0)

const [routeId, setRouteId] = useState("");

const [rowNo, setRowNo] = useState(0);

const [amount, setAmount] = useState(0);



    async function AddStation() {
      try {
      

        event?.preventDefault()
        // Define the request data as an object
        const requestData = {
          coopId: props.coopId,
          stationName: stationName, // Assuming empNo and cardId are variables in your scope
          km : km,
          viceVersaKM : viceVersaKM,
          routeId : props.routeId,
          rowNo: rowNo,
          amount: amount
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
       
          if(responseData.messages[0].code === "0"){
          

            GetFilterData();
        
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
    



    // CONFIRM DIALOG

    const processRowUpdate = useCallback(
      (newRow, oldRow) =>
        new Promise((resolve, reject) => {
          const mutation = computeMutation(newRow, oldRow);
          if (mutation) {
            // Save the arguments to resolve or reject the promise later
            setPromiseArguments({ resolve, reject, newRow, oldRow });
          } else {
            resolve(oldRow); // Nothing was changed
          }
        }),
      [],
    );
  
  
    const handleNo = () => {
      const { oldRow, resolve } = promiseArguments;
      resolve(oldRow); // Resolve with the old row to not update the internal state
      setPromiseArguments(null);
    };
  
    const handleYes = async () => {
      const { newRow, oldRow, reject, resolve } = promiseArguments;
      try {

        // coopId: string,
    
        // stationName: string,
    
        // km: number,
    
        // viceVersaKM: number,
    
        // routeId: string
    
       
        const bodyParameters ={
          id:newRow['id'],
          rowNo:newRow['rowNo'],
          coopId: newRow['coopId'],
          stationName: newRow['stationName'],
          km: parseFloat(newRow['km']),
          viceVersaKM: newRow['viceVersaKM'],
          routeId: newRow['routeId']
        }

        console.log(bodyParameters)
    const request = await axios.put(`${import.meta.env.VITE_BASE_URL}/station/${newRow['id']}`,
    bodyParameters,
    {
      headers :{
          Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
      }
    })

     
    const responseGet = await request.data;
    console.log(responseGet)
    const response = await mutateRow(newRow);
      if(responseGet.messages[0].code === 0){
        GetFilterData();
        resolve(response);
        toast.success("Updated Succesfully!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
        setPromiseArguments(null);
      }else{
        toast.error("Failed to update!", {
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
        reject(oldRow);
        setPromiseArguments(null);
        toast.error("Please check your internet connection!", {
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
    }
  
    const handleEntered = () => {
      // The `autoFocus` is not used because, if used, the same Enter that saves
      // the cell triggers "No". Instead, we manually focus the "No" button once
      // the dialog is fully open.
      // noButtonRef.current?.focus();
    };
  
    const renderConfirmDialog = () => {
      if (!promiseArguments) {
        return null;
      }
      const { newRow, oldRow } = promiseArguments;
      const mutation = computeMutation(newRow, oldRow);
  
      return (
        <Dialog
          maxWidth="xs"
          TransitionProps={{ onEntered: handleEntered }}
          open={!!promiseArguments}
        >
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogContent dividers>
            {`Pressing 'Yes' will change ${mutation}.`}
          </DialogContent>
          <DialogActions>
            <Button ref={noButtonRef} onClick={handleNo}>
              No
            </Button>
            <Button onClick={handleYes}>Yes</Button>
          </DialogActions>
        </Dialog>
      );
    };

    const [deleteId, setDeleteId] = useState("");
    const [showDeleteDialog, setShowDeleteDialog] =useState(false)

    async function handleYesDelete(){
      try {
       
        
    const request = await axios.delete(`${import.meta.env.VITE_BASE_URL}/station/${deleteId}`,
    {
      headers :{
          Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
      }
    })

     
    const responseGet = await request.data;

    console.log(responseGet)
    
      if(responseGet.messages[0].code === 0){
        GetFilterData();
     
        toast.success("Deleted Succesfully!", {
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
        toast.error("Failed to delete!", {
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
      setShowDeleteDialog(!showDeleteDialog)
      } catch (error) {
        setShowDeleteDialog(!showDeleteDialog)
        toast.error("Please check your internet connection!", {
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
    }


  useEffect(() =>{
    
    return()=>{
      console.log(showDeleteDialog)
    }
  },[showDeleteDialog])
    return (<>
    <Dialog
          maxWidth="xs"
          open={showDeleteDialog}
        >
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
          <DialogActions>
            <Button onClick={() =>  setShowDeleteDialog(!showDeleteDialog)}>
              No
            </Button>
            <Button onClick={handleYesDelete}>Yes</Button>
          </DialogActions>
        </Dialog>
    {renderConfirmDialog()}
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

          {
          console.log(`this is isNumeric ${props.isNumeric}`)
         
          }
          
          {props.isNumeric === true ?
          <TextField
          autoFocus
          margin="dense"
          id="km"
          name ="amount"
          label="Amount"
          type="number"
          inputProps={{ step: "any" }}
          fullWidth
          variant="outlined"
          onChange={(event) => setAmount(event.target.value)}
        />
        :
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
           }

          

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

          {/* <TextField
            autoFocus
            margin="dense"
            id="routeId"
            name ="routeId"
            label="Route Id"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(event) => setRouteId(event.target.value)}
          /> */}

          <TextField
            autoFocus
            margin="dense"
            id="rowNo"
            name ="rowNo"
            label="Order number"
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
  
  <StyledDataGrid
  processRowUpdate={processRowUpdate}
  experimentalFeatures={{ newEditingApi: true }}
           initialState={{ pinnedColumns: { left: ['rowNo'], right: ['actions']} }}
            rows={stationTableRows} columns={
              props.isNumeric === true ?
              stationNumericColumns :
              stationColumns
            }
            loading = {isLoading}
             slots={{toolbar: CustomToolbar, loadingOverlay: LinearProgress}}
             sx={{
              '& .MuiDataGrid-cell': {
                fontSize: '1rem',
                padding: '15px',
              },
            }}
            />
    </>
      
    )

    
}

