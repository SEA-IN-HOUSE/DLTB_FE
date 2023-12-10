// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
import NavBar from "../components/NavBar";
import Paper from "../components/Paper";
import {  GridColDef, GridRowsProp, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarDensitySelector, GridToolbarExport, GridActionsCellItem  } from '@mui/x-data-grid';
import { DataGridPremium  } from '@mui/x-data-grid-premium/DataGridPremium';
import {useEffect,  useState} from 'react'
import Box from '@mui/material/Box';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, LinearProgress, MenuItem, Select, TextField } from "@mui/material";
import axios from 'axios';
import SyncIcon from '@mui/icons-material/Sync';
import { useNavigate } from "react-router-dom";
import { ICooperative } from "./Employee";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import moment from 'moment'
import { BsCurrencyExchange,BsTicketPerforatedFill,BsBagCheck ,BsPersonFillLock, BsFillSignpostFill,BsCurrencyDollar } from "react-icons/bs";
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import PrintIcon from '@mui/icons-material/Print';
import { ComponentToPrint } from '../components/ComponentToPrint';
import CountUp from 'react-countup';
import { useInterval } from 'usehooks-ts'
import { GiPayMoney } from "react-icons/gi";
import Chip from '@mui/material/Chip';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { ToastContainer, toast } from 'react-toastify';
import { styled} from '@mui/system';
  const rows: GridRowsProp = [
   
  ];

  const StyledDataGrid = styled(DataGridPremium)((theme) => ({
    "& .MuiDataGrid-sortIcon": {
    opacity: 1,
    color: "white",
    },
    "& .MuiDataGrid-menuIconButton": {
    opacity: 1,
    color: "white"
    },
    }));
export function TORMain(){

  const [openEditModal, setOpenEditModal] = useState(false);

  const [isSyncing, setIsSyncing] = useState(false)
  const [total, setTotal] = useState(0);

  const [totalTicket, setTotalTicket] = useState(0);

  const [totalBaggage, setTotalBaggage] = useState(0);

  const [grandTotal, setGrandTotal] = useState(0);

  const [totalRevenueAtmPassenger, setTotalRevenueAtmPassenger] = useState(0);

  const [coopList, setCoopList] = useState([]);
  const [filterTableCompanyId, setFilterTableCompanyId] = useState(localStorage.getItem('companyId'));

  const [fromDate , setFromDate] = useState(null);

  const [toDate,  setToDate] = useState(null)

  const [filterType, setFilterType] = useState("");

  const [filterData, setFilterData] = useState(null);
  
  const [filterApplied, setFilterApplied] = useState(false)

  const [totalTrip, setTotalTrip] = useState(0)

  const [isLoading ,setIsLoading] = useState(false);

  const [updatingAccountTorNo, setUpdatingAccountTorNo] = useState(null)

  const [editFinalRemittance, setEditFinalRemittance] = useState(0);

  const [editReferenceNumber, setEditReferenceNumber]= useState("");

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

    
const columns: GridColDef[] = [
  {
    field: 'coopId', 
    headerName: 'COMPANY',
    flex: 1,
    minWidth: 180,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    editable: false,
    valueGetter: (params) => {
      
      const { coopId } = params.row;
      
      const matchingItem : any = coopList.find((item : ICooperative) => item.id === coopId);
      return matchingItem ? matchingItem.cooperativeCodeName : ''; 
    },
  },  

  {
    field: 'status', 
    headerName: 'STATUS', 
    width: 180, 
    headerClassName: 'super-app-theme--header',
    editable: false,
    headerAlign: 'center',
    align: 'center',
    renderCell: (cellValues) => {
          console.log(cellValues)
      return(
      <>
    {cellValues.row.final_remittance !== 0 ? (<Chip  label={"Remitted"} color ="success" size = "small" variant = "outlined"/>) : (<Chip label={"Not Yet Remitted"} color ="warning" size = "small" variant = "outlined"/>)}
          
    
      </>
      );
    }
  },
  { 
    field: 'device_id', 
    headerName: 'DEVICE ID', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'control_no', 
    headerName: 'CONTROL NO', 
     width: 230,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'tor_no', 
    headerName: 'TOR NO', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'date_of_trip', 
    headerName: 'DATE OF TRIP', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'bus_no', 
    headerName: 'BUS NO', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'route', 
    headerName: 'ROUTE', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'route_code', 
    headerName: 'ROUTE CODE', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'emp_no_driver_1', 
    headerName: 'EMP DRIVER 1', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'emp_no_driver_2', 
    headerName: 'EMP DRIVER 2', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'emp_no_conductor', 
    headerName: 'EMP NO CONDUCTOR', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'emp_name_driver_1', 
    headerName: 'EMP NAME DRIVER 1', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'emp_name_driver_2', 
    headerName: 'EMP NAME DRIVER 2', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'emp_name_conductor', 
    headerName: 'EMP NAME CONDUCTOR', 
     width: 200,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'eskirol_id_driver', 
    headerName: 'ESKIROL ID DRIVER', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'eskirol_id_conductor', 
    headerName: 'ESKIROL ID CONDUCTOR', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'eskirol_name_driver', 
    headerName: 'ESKIROL NAME DRIVER', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'eskirol_name_conductor', 
    headerName: 'ESKIROL NAME CONDUCTOR', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'no_of_trips', 
    headerName: 'TRIPS', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
    type: 'number'
  },

  { 
    field: 'ticket_revenue_atm', 
    headerName: 'TICKET REVENUE ATM', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
    valueFormatter: (params) => `₱ ${params.value}`
  },

  { 
    field: 'ticket_count_atm', 
    headerName: 'TICKET COUNT ATM', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'ticket_revenue_atm_passenger', 
    headerName: 'TICKET REVENUE ATM PASSENGER', 
     width: 270,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
    valueFormatter: (params) => `₱ ${params.value}`
  },

  { 
    field: 'ticket_revenue_atm_baggage', 
    headerName: 'TICKET REVENUE ATM BAGGAGE', 
     width: 270,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
    valueFormatter: (params) => `₱ ${params.value}`
  },

  { 
    field: 'ticket_count_atm_passenger', 
    headerName: 'TICKET COUNT ATM PASSENGER', 
     width: 250,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'ticket_count_atm_baggage', 
    headerName: 'TICKET COUNT ATM BAGGAGE', 
     width: 230,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'ticket_revenue_punch', 
    headerName: 'TICKET REVENUE PUNCH', 
     width: 200,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
    valueFormatter: (params) => `₱ ${params.value}`
  },

  { 
    field: 'ticket_count_punch', 
    headerName: 'TICKET COUNT PUNCH', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'ticket_revenue_punch_passenger', 
    headerName: 'TICKET REVENUE PUNCH PASSENGER', 
     width: 300,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
    valueFormatter: (params) => `₱ ${params.value}`
  },

  { 
    field: 'ticket_revenue_punch_baggage', 
    headerName: 'TICKET REVENUE PUNCH BAGGAGE', 
     width: 270,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
    valueFormatter: (params) => `₱ ${params.value}`
  },

  { 
    field: 'ticket_count_punch_passenger', 
    headerName: 'TICKET COUNT PUNCH PASSENGER', 
     width: 270,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'ticket_count_punch_baggage', 
    headerName: 'TICKET COUNT PUNCH BAGGAGE', 
     width: 250,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'ticket_revenue_charter', 
    headerName: 'TICKET REVENUE CHARTER', 
     width: 220,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
    valueFormatter: (params) => `₱ ${params.value}`
  },

  { 
    field: 'ticket_count_charter', 
    headerName: 'TICKET COUNT CHARTER', 
     width: 200,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'ticket_revenue_waybill', 
    headerName: 'TICKET REVENUE WAYBILL', 
     width: 220,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
    valueFormatter: (params) => `₱ ${params.value}`
  },

  { 
    field: 'ticket_count_waybill', 
    headerName: 'TICKET COUNT WAYBILL', 
     width: 190,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'ticket_revenue_card', 
    headerName: 'TICKET REVENUE CARD', 
     width: 190,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'ticket_count_card', 
    headerName: 'TICKET COUNT CARD', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'ticket_revenue_reserved', 
    headerName: 'TICKET REVENUE RESERVED', 
     width: 220,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'ticket_count_reserved', 
    headerName: 'TICKET COUNT RESERVED', 
     width: 210,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'ticket_amount_cancelled', 
    headerName: 'TICKET AMOUNT CANCELLED', 
     width: 220,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'ticket_count_cancelled', 
    headerName: 'TICKET COUNT CANCELLED', 
     width: 210,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'ticket_amount_passes', 
    headerName: 'TICKET AMOUNT PASSES', 
     width: 200,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'ticket_count_passes', 
    headerName: 'TICKET COUNT PASSES', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'passenger_revenue', 
    headerName: 'PASSENGER REVENUE', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
    valueFormatter: (params) => `₱ ${params.value}`
  },

  { 
    field: 'baggage_revenue', 
    headerName: 'BAGGAGE REVENUE', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
    valueFormatter: (params) => `₱ ${params.value}`
  },

  { 
    field: 'gross_revenue', 
    headerName: 'GROSS REVENUE', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
    valueFormatter: (params) => `₱ ${params.value}`
  },

  { 
    field: 'passenger_count', 
    headerName: 'PASSENGER COUNT', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'baggage_count', 
    headerName: 'BAGGAGE COUNT', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'commission_driver1_passenger', 
    headerName: 'COMMISSION DRIVER1 PASSENGER', 
     width: 270,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
    
  },

  { 
    field: 'auto_commission_driver1_passenger', 
    headerName: 'AUTO TEST COMMISSION DRIVER1 PASSENGER', 
     width: 350,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'commission_driver1_baggae', 
    headerName: 'COMMISSION DRIVER1 BAGGAGE', 
     width: 250,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'commission_driver1_baggage', 
    headerName: 'COMMISSION DRIVER1 BAGGAGE', 
     width: 250,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'auto_commission_driver1_baggage', 
    headerName: 'AUTO COMMISSION DRIVER1 BAGGAGE', 
     width: 300,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'commission_driver2_passenger', 
    headerName: 'COMMISSION DRIVER2 PASSENGER', 
     width: 290,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'auto_commission_driver2_passenger', 
    headerName: 'AUTO COMMISSION DRIVER2 PASSENGER', 
     width: 310,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'commission_driver2_baggage', 
    headerName: 'COMMISSION DRIVER2 BAGGAGE', 
     width: 250,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'auto_commission_driver2_baggage', 
    headerName: 'AUTO COMMISSION DRIVER2 BAGGAGE', 
     width: 300,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'commission_driver2', 
    headerName: 'COMMISSION DRIVER2', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'auto_commission_driver2', 
    headerName: 'AUTO COMMISSION DRIVER2', 
     width: 220,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'commission_conductor_passenger', 
    headerName: 'COMMISSION CONDUCTOR PASSENGER', 
     width: 300,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'auto_commission_conductor_passenger', 
    headerName: 'AUTO COMMISSION CONDUCTOR PASSENGER', 
     width: 340,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'commission_conductor_baggage', 
    headerName: 'COMMISSION CONDUCTOR BAGGAGE', 
     width: 280,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'commission_conductor', 
    headerName: 'COMMISSION CONDUCTOR', 
     width: 210,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'auto_commission_conductor', 
    headerName: 'AUTO COMMISSION CONDUCTOR', 
     width: 250,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'incentive_driver1', 
    headerName: 'INCENTIVE DRIVER1', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'incentive_driver2', 
    headerName: 'INCENTIVE DRIVER2', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'incentive_conductor', 
    headerName: 'INCENTIVE CONDUCTOR', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'allowance_driver1', 
    headerName: 'ALLOWANCE DRIVER1', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'allowance_driver2', 
    headerName: 'ALLOWANCE DRIVER2', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'allowance_conductor', 
    headerName: 'ALLOWANCE CONDUCTOR', 
     width: 200,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'eskirol_commission_driver', 
    headerName: 'ESKIROL COMMISSION DRIVER', 
     width: 240,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'eskirol_commission_conductor', 
    headerName: 'ESKIROL COMMISSION CONDUCTOR', 
     width: 270,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'eskirol_cash_bond_driver', 
    headerName: 'ESKIROL CASH BOND DRIVER', 
     width: 230,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'eskirol_cash_bond_conductor', 
    headerName: 'ESKIROL CASH BOND CONDUCTOR', 
     width: 260,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'toll_fees', 
    headerName: 'TOLL FEES', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'parking_fee', 
    headerName: 'PARKING FEE', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'diesel', 
    headerName: 'DIESEL', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'diesel_no_of_liters', 
    headerName: 'DIESEL NO OF LITERS', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'others', 
    headerName: 'OTHERS', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'services', 
    headerName: 'SERVICES', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'callers_fee', 
    headerName: 'CALLERS FEE', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'employee_benefits', 
    headerName: 'EMPLOYEE BENEFITS', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'repair_maintenance', 
    headerName: 'REPAIR MAINTENANCE', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'materials', 
    headerName: 'MATERIALS', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'representation', 
    headerName: 'REPRESENTATION', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'total_expenses', 
    headerName: 'TOTAL EXPENSES', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
    type: 'number',
  },

  { 
    field: 'net_collections', 
    headerName: 'NET COLLECTIONS', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'total_cash_remitted', 
    headerName: 'TOTAL CASH REMITTED', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'final_remittance', 
    headerName: 'FINAL REMITTANCE', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'final_cash_remitted', 
    headerName: 'FINAL CASH REMITTED', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'overage_shortage', 
    headerName: 'OVERAGE SHORTAGE', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'tellers_id', 
    headerName: 'TELLERS ID', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'tellers_name', 
    headerName: 'TELLERS NAME', 
     width: 280,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'coding', 
    headerName: 'CODING', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  { 
    field: 'remarks', 
    headerName: 'REMARKS', 
     width: 180,
    headerClassName: 'super-app-theme--header',
    editable: false,
   headerAlign: 'center',
    align: 'center',
  },

  {
    field: 'dateCreated',
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
        setUpdatingAccountTorNo(params.row.tor_no);
        setOpenEditModal(true)
        }}>
        <EditIcon fontSize="small" />
    </IconButton>
    );
  } },


  ];
  
    

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



    // const [isSyncing, setIsSyncing] = useState(false);

   
 
  
      
    

    useEffect(() =>{

    },[tableRows])

    useEffect(() =>{

      return ()=>{}
    },[openEditModal])

    async function SyncData(){


    } 

      //Toolbar
function CustomToolbar() {

  const spinnerStyle = {
    animation: 'spin 1s linear infinite',
  };

  const keyframesStyle = `
    @keyframes spin {
      0% { transform: rotate(360deg); }
      100% { transform: rotate(0deg); }
    }
  `;


  return (
    <>
     
     <GridToolbarContainer
          style=
          {{
            marginBottom: '2px',
          }}
        >
          
          {isSyncing ?  (<style>{keyframesStyle}</style>) : null}
         {localStorage.getItem('role') === "Administrator" ? 
            <Button variant="contained"  onClick ={SyncData} color="success" startIcon={<SyncIcon style={spinnerStyle} />}>{isSyncing ? "SYNCING..." : "SYNC"}</Button>
            :
            null
          }
         
            <GridToolbarColumnsButton style ={{color:"#161d6f"}} />
            {/* <GridToolbarFilterButton style ={{color:"#161d6f"}} /> */}
            <GridToolbarDensitySelector style ={{color:"#161d6f"}} />
            <GridToolbarExport style ={{color:"#161d6f"}} />

{/* 
            <Button onClick={handlePrint} startIcon={<PrintIcon />} style ={{color:"#161d6f"}}>
              Print
            </Button>    */}
            {/* <GridToolbarQuickFilter  style ={{color:"#161d6f"}}/> */}
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


const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });


  const [totalExpenses, setTotalExpenses] = useState(0);


  async function GetFilterData(){

    
   
      
      try{
       setIsLoading(true)
        const bodyParameters = {
          filterData: filterData,
          filterType: filterType,
          fromDate: fromDate,
          toDate:toDate,
        }
        
        console.log("Sample date ", fromDate)


    const request = await axios.post(`${import.meta.env.VITE_BASE_URL}/tor/main/filter/${filterTableCompanyId}`,bodyParameters,{
      headers :{
          Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
      }
  })
      
      const response = await request.data;
  
      
  
  
      if(response.messages[0].code === 0){
  
  
        if(JSON.stringify(response.response) !== JSON.stringify(tableRows)){
          
      
  
            setTableRows(
            
              response.response.map((data : any) =>{
            
                return {id: data._id, ...data}
              })
            )
             
            let totalFare = 0.00;

            let totalTrip = 0;
  
            response.response.map((data : any) =>{
             
              totalTrip = totalTrip + data.no_of_trips;
             })

            setTotalTrip(() => totalTrip)
            
            setTotal(() => response.response.length)
         
            setTotalTicket(() => 0)
            setTotalTicket(() => response.response.length)
  
            let totalBaggage = 0;

            let totalRemittedAmount = 0;
    
            let totalExpensesGet = 0;
            response.response.map((data : any) =>{
              totalBaggage = totalBaggage + data.ticket_revenue_atm_baggage;
              console.log(`Remitted ${data.final_remittance}`)
              totalExpensesGet = totalExpensesGet + data.final_remittance;
            })
            
         

            setTotalBaggage(() => totalBaggage);
  
            let grandTotal = 0;
  
            response.response.map((data : any) =>{
              grandTotal = grandTotal + data.ticket_revenue_atm;
            })
  
            setGrandTotal(() => grandTotal)
            
            setTotalExpenses(() => totalExpensesGet)
          
  
        }     
     
      }
  
     
      
   
  }catch(e){

      console.log("ERROR = "+ e)
  }finally{
    setIsLoading(false)
  }
  

}

useInterval(() => {
  if(!isLoading){
    GetFilterData();
  }else{
    () =>{}
  }
 
}, 15000);


useEffect(()=>{
  
  GetFilterData();

  return () =>{
   
  }

},[filterData, filterType, toDate, fromDate])

useEffect(() =>{

 
  return () => {
    console.log(`Table refresh`)
  }

}, [tableRows])

useEffect(() =>{
return() =>{console.log(`Update cards value`)}
},[totalBaggage, totalExpenses, totalRevenueAtmPassenger, updatingAccountTorNo,editReferenceNumber, editFinalRemittance,])


 async function UpdateRemittance(){

    
   
      if(editFinalRemittance !== 0 || editReferenceNumber !== ""){
        try{
          setIsLoading(true)
           const bodyParameters = {
             final_remittance: editFinalRemittance,
             reference_no:editReferenceNumber
           }
           
           console.log("Sample date ", fromDate)
   
   
       const request = await axios.put(`${import.meta.env.VITE_BASE_URL}/tor/main/final-remittance/${updatingAccountTorNo}`,bodyParameters,{
         headers :{
             Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
         }
     })
         
         const response = await request.data;
     
         
     
     
         if(response.messages[0].code === 0){
   
           GetFilterData();
           toast.success(`Successfully remitted!`, {
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
           toast.error(`Failed to remit: Invalid Field Data`, {
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
     
        
         
      
     }catch(e){
   
       toast.error(`Failed to remit: ${e}`, {
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
       setIsLoading(false)
     }
      }else{
        toast.error(`Invalid Fields`, {
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


async function UpdateRemittance(){

  event.preventDefault()
  try{
    setOpenEditModal(() =>false)
    const bodyParameters = {
      final_remittance: editFinalRemittance,
      reference_no:editReferenceNumber
    }
    
    console.log("Sample date ", fromDate)


const request = await axios.put(`${import.meta.env.VITE_BASE_URL}/tor/main/final-remittance/${updatingAccountTorNo}`,bodyParameters,{
  headers :{
      Authorization : `Bearer ${import.meta.env.VITE_TOKEN}`
  }
})
  
  const response = await request.data;

  


  if(response.messages[0].code === 0){
GetFilterData()
    toast.success(`Successfully remitted!`, {
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
    toast.error(`Failed to remit: Invalid Field Data`, {
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

 
  

}catch(e){

toast.error(`Failed to remit: ${e}`, {
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



return(
      <div 
       style={{
        backgroundColor: '#e2e8f0',
        height:'auto'
      }}
      >
    <NavBar>

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

    <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)} >
    <form onSubmit={UpdateRemittance}>
        <DialogTitle>Update remittance</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please input the total remitted amount for <b>TOR number: {updatingAccountTorNo}</b> and provide the correct <b>reference number</b>. Thank you.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Referrence Number"
            type="text"
            fullWidth
            variant="standard"
            required
            onChange={(event) => setEditReferenceNumber(() =>event.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="amount"
            label="Amount"
            type="number"
            fullWidth
            variant="standard"
            required
            onChange={(event) => setEditFinalRemittance(() => event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)}>Cancel</Button>
          <Button type ="submit" variant="contained" color="success">Submit</Button>
        </DialogActions>
        </form>
      </Dialog>

    <div className="invisible absolute">
    <ComponentToPrint  
    ref={componentRef} 
    rows ={tableRows} 
    columns ={columns}
    grandTotal ={grandTotal}
    />
    </div>
      
  
   
    <div className="relative block mt-10  p-12 bg-white border border-gray-200 rounded-lg shadow-lg"
        style ={{
            height: 'auto'
        }}
        >
            <h1 className="mb-2 text-5xl  font-bold tracking-tight text-indigo-900">TOR MAIN</h1>
        </div>


        <div className="sm:py-6">
  <div className="space-y-0 md:grid md:grid-cols-0 lg:grid-cols-4 xl:grid-cols-4 md:gap-3 md:space-y-0">
  
     
<div className=" bg-white border border-gray-200 rounded-lg shadow-lg p-4">  
  <div className="flex items-center">
    <div className="inline-flex flex-shrink-0 justify-center items-center w-12 h-12 text-white bg-gradient-to-br from-blue-900 to-[#161d6f] rounded-lg" >
      
        {<BsPersonFillLock />}
    </div>
    <div className="flex-shrink-0 ml-3">
      <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl"><CountUp end={total} /></span>
      <h3 className="text-base font-normal text-gray-500">{"TOTAL TOR"}</h3>
    </div>
  </div>
</div>

<div className=" bg-white border border-gray-200 rounded-lg shadow-lg p-4">  
  <div className="flex items-center">
    <div className="inline-flex flex-shrink-0 justify-center items-center w-12 h-12 text-white bg-gradient-to-br from-blue-900 to-[#161d6f] rounded-lg" >
      
        {<BsFillSignpostFill />}
    </div>
    <div className="flex-shrink-0 ml-3">
      <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl"><CountUp end={totalTrip} /></span>
      <h3 className="text-base font-normal text-gray-500">{"TOTAL TRIP "}</h3>
    </div>
  </div>
</div>

<div className=" bg-white border border-gray-200 rounded-lg shadow-lg p-4">  
  <div className="flex items-center">
    <div className="inline-flex flex-shrink-0 justify-center items-center w-12 h-12 text-white bg-gradient-to-br from-blue-900 to-[#161d6f] rounded-lg" >
      
        {<BsCurrencyDollar   />}
    </div>
    <div className="flex-shrink-0 ml-3">
      <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl">₱ <CountUp end={totalBaggage} /></span>
      <h3 className="text-base font-normal text-gray-500">{"TOTAL TICKET REVENUE ATM BAGGAGE"}</h3>
    </div>
  </div>
</div>


<div className=" bg-white border border-gray-200 rounded-lg shadow-lg p-4">  
  <div className="flex items-center">
    <div className="inline-flex flex-shrink-0 justify-center items-center w-12 h-12 text-white bg-gradient-to-br from-blue-900 to-[#161d6f] rounded-lg" >
      
        {<GiPayMoney   />}
    </div>
    <div className="flex-shrink-0 ml-3">
      <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl">₱ <CountUp end={totalExpenses} /></span>
      <h3 className="text-base font-normal text-gray-500">{"TOTAL REMITTED AMOUNT"}</h3>
    </div>
  </div>
</div>

  </div>

  <div className=" bg-white border border-gray-200 rounded-lg shadow-lg p-4 mt-4">  
  <div className="flex items-center">
    <div className="inline-flex flex-shrink-0 justify-center items-center w-12 h-12 text-white bg-gradient-to-br from-blue-900 to-[#161d6f] rounded-lg" >
      
        {<BsBagCheck  />}
    </div>
    <div className="flex-shrink-0 ml-3">
      <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl">₱ <CountUp end={grandTotal} /></span>
      <h3 className="text-base font-normal text-gray-500">{"TOTAL TICKET REVENUE ATM PASSENGER "}</h3>
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
                    value={filterType}
                    onChange={(event) => setFilterType( () => event.target.value)}
                    MenuProps={{ PaperProps: { style: { maxHeight: 264 } } }}
                  >
                    <MenuItem value={"None"}>{"None"}</MenuItem>
                    {columns.map((column) => (
                      <MenuItem value={column.field}>{column.field.replace(/_/g, ' ').toUpperCase()}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                 id="filterData" 
                label="Filter Data" 
                variant="outlined" 
                margin="dense"
                value={filterData}
                style={{ width: '100%'}}
                onChange={(event) => setFilterData(() => event.target.value)}
                 />
             
              </div>

              <div>
         
        
        </div>
        <Box sx = {{
            '& .super-app-theme--header': {
            backgroundColor: '#161d6f',
            color:'white',
            },
            height:700
            }}>
            
            <DataGridPremium
            initialState={{ pinnedColumns: { left: ['tor_no', 'status'], right: ['actions']} }}
            rows={tableRows} columns={columns}
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
        </Box>
        </Paper>   
    </NavBar>
    </div>)
}


