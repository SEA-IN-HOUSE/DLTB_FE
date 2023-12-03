// @ts-nocheck

import React from "react";

// Using a class component, everything works without issue
// export class ComponentToPrint extends React.PureComponent {
//     render() {
//       return (
//         <div>My cool content here!</div>
//       );
//     }
//  } 
  
  // Using a functional component, you must wrap it in React.forwardRef, and then forward the ref to
  // the node you want to be the root of the print (usually the outer most node in the ComponentToPrint)
  // https://reactjs.org/docs/refs-and-the-dom.html#refs-and-function-components


  export const ComponentToPrint = React.forwardRef((props, ref) => {

    let grandTotal = 0;

    if(Object(props.rows).length >0 ){

        props.rows.map((rows) =>{
            grandTotal = grandTotal + rows.subtotal
        })

    }
    

    let totalFare = 0;

    if(Object(props.rows).length >0 ){

        props.rows.map((rows) =>{
            totalFare = totalFare + rows.fare
        })

    }

    let totalBaggage = 0;

    if(Object(props.rows).length >0 ){

        props.rows.map((rows) =>{
            totalBaggage = totalBaggage + rows.baggage
        })

    }

    let totalTicket = 0;

    if(Object(props.rows).length >0 ){

        totalTicket = props.rows.length

    }
    return (
        
      <div ref={ref}>

        <h1 className="m-4">Grand Total Sales: ₱ {grandTotal}</h1>
        <h1 className="m-4">Total Fare: ₱ {totalFare}</h1>
        <h1 className="m-4">Total Baggage: {totalBaggage}</h1>
        <h1 className="m-4">Total Ticket: {totalTicket}</h1>
     {/* FIRST ROW    */}
<div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
        {
            Object.keys(props.columns).length > 0 &&
            props.columns.slice(0, 5).map((col) => (
                col.field !== "coopId" ? (
                <th key={col.field} scope="col" className="px-6 py-3">
                    {col.field}
                </th>
                ) : null
            ))
            }

        </tr>
        </thead>
        <tbody>

        {Object(props.rows).length > 0 ?
                
                props.rows.slice(0, 5).map((row) =>
                {
                    return(
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">

                           

                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {row.device_id}
                        </th>
                        <td class="px-6 py-4">
                            {row.control_no}
                        </td>
                        <td class="px-6 py-4">
                           {row.tor_no}
                        </td>
                        <td class="px-6 py-4">
                           {row.fare}
                        </td>
                    </tr>
                    ) 
                }
                )
                : null
        }
        </tbody>
    </table>
</div>


<div className="page-break" />

{/* SECOND ROW */}

<div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
        {Object.keys(props.columns).length > 0 &&
            props.columns.slice(5, 10).map((col) => (
            <th key={col.field} scope="col" className="px-6 py-3">
                {col.field}
            </th>
            ))}
        </tr>
        </thead>
        <tbody>

           
        {Object(props.rows).length > 0 ?
                
                props.rows.slice(6, 10).map((row) =>
                {
                    return(
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">

                          
                       <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {row.subtotal}
                        </th>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {row.baggage}
                        </th>
                        <td class="px-6 py-4">
                            {row.bus_no}
                        </td>
                        <td class="px-6 py-4">
                           {row.route}
                        </td>
                        <td class="px-6 py-4">
                           {row.route_code}
                        </td>
                    </tr>
                    ) 
                }
                )
                : null
        }


        </tbody>
    </table>
</div>


{/* THIRD ROW */}


<div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
        {Object.keys(props.columns).length > 0 &&
            props.columns.slice(10, 15).map((col) => (
            <th key={col.field} scope="col" className="px-6 py-3">
                {col.field}
            </th>
            ))}
        </tr>
        </thead>
        <tbody>

           
        {Object(props.rows).length > 0 ?
                
                props.rows.slice(6, 10).map((row) =>
                {
                    return(
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">

                          
                       <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {row.bound}
                        </th>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {row.trip_no}
                        </th>
                        <td class="px-6 py-4">
                            {row.ticket_no}
                        </td>
                        <td class="px-6 py-4">
                           {row.ticket_type}
                        </td>
                        <td class="px-6 py-4">
                           {row.from_place}
                        </td>
                    </tr>
                    ) 
                }
                )
                : null
        }

        
        </tbody>
    </table>
</div>

{/* FOURTH ROW */}

<div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
        {Object.keys(props.columns).length > 0 &&
            props.columns.slice(15, 20).map((col) => (
            <th key={col.field} scope="col" className="px-6 py-3">
                {col.field}
            </th>
            ))}
        </tr>
        </thead>
        <tbody>

           
        {Object(props.rows).length > 0 ?
                
                props.rows.slice(15, 20).map((row) =>
                {
                    return(
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">

                          
                       <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {row.to_place}
                        </th>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {row.trip_no}
                        </th>
                        <td class="px-6 py-4">
                            {row.from_km}
                        </td>
                        <td class="px-6 py-4">
                           {row.km_run}
                        </td>
                        <td class="px-6 py-4">
                           {row.card_no}
                        </td>
                    </tr>
                    ) 
                }
                )
                : null
        }

        
        </tbody>
    </table>
</div>


{/* FIFTH ROW */}


<div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
        {Object.keys(props.columns).length > 0 &&
            props.columns.slice(20, 25).map((col) => (
            <th key={col.field} scope="col" className="px-6 py-3">
                {col.field}
            </th>
            ))}
        </tr>
        </thead>
        <tbody>

           
        {Object(props.rows).length > 0 ?
                
                props.rows.slice(15, 20).map((row) =>
                {
                    return(
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">

                          
                       <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {row.lat}
                        </th>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {row.long}
                        </th>
                        <td class="px-6 py-4">
                            {row.previous_balance}
                        </td>
                        <td class="px-6 py-4">
                           {row.current_balance}
                        </td>
                        <td class="px-6 py-4">
                           {row.dateCreated}
                        </td>
                    </tr>
                    ) 
                }
                )
                : null
        }

        
        </tbody>
    </table>
</div>


        </div>
    );
  });