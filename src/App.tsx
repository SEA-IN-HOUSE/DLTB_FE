// import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {  Route, Routes, HashRouter} from "react-router-dom";
import LogIn from "./pages/LogIn";
import TestLogin from "./pages/TestLogin";
import { Dashboard } from "./pages/Dashboard";
import { Client } from "./pages/Client";
// import  './styles/LogIn.css'
import { Employee } from "./pages/Employee";
import { Direction } from "./pages/Direction";
import { MasterCard } from "./pages/MasterCard";
import { TORMain } from "./pages/TORMain";
import { TORTicket } from "./pages/TORTicket";
import { TORFuel } from "./pages/TORFuel";
import { TORRemittance } from "./pages/TORRemittance";
import { TORInspection } from "./pages/TORInspection";
import { TORTrip } from "./pages/TORTrip";
import { TORViolation } from "./pages/TORViolation";
import { TORTrouble } from "./pages/TORTrouble";
import TestArea from "./pages/TestArea";
import { Station } from "./pages/Station";
import { EmployeeCard } from "./pages/EmployeeCard";
import { Staff } from "./pages/Staff";
<<<<<<< HEAD
import { Device } from "./pages/Device";
import { Cooperative } from "./pages/Cooperative";

=======
import styles from 'styles/LogIn.css'
import { useEffect } from "react";
>>>>>>> adda894768f68ba1f016f12390eee94e73d44847
function App() {
 
  useEffect(() =>{

  },[])

  return (
    <>   
          <HashRouter basename="/">
            <Routes>
              <Route path ="/" element = { <TestLogin />} />
              <Route path ="/testarea" element ={<TestArea /> }/>
              <Route path ="/dashboard" element ={<Dashboard />} />
              <Route path ="/test" element ={<TestArea />}/> 
              <Route path="/client" element ={<Client />} />
              <Route path ="/login" element = {<TestLogin />} />
              <Route path ="/signout" element = {<TestLogin />} />
              <Route path ="/test" element = {<TestLogin />}/>
              <Route path ="/employee" element = {<Employee />}/>
              <Route path ="/user" element = {<Staff />} />
              <Route path ="/direction" element ={<Direction />} />
              <Route path ="/mastercard" element ={<MasterCard />} />
              <Route path ="/station" element ={<Station />} />
              <Route path = "/employeecard" element ={<EmployeeCard />} />
              <Route path ="/device" element ={<Device />} />
              <Route path ="/cooperative" element ={<Cooperative />} />
              <Route path ="/tormain" element ={ <TORMain /> } />
              <Route path ="/torticket" element= {<TORTicket />} />
              <Route path ="/torfuel" element = {<TORFuel />} />
              <Route path ="/torremittance" element ={<TORRemittance />} />
              <Route path ="/torinspection" element = {<TORInspection /> } />
              <Route path  ="/tortrip" element ={<TORTrip />} />
              <Route path ="/torviolation" element ={<TORViolation />} />
              <Route path ="/tortrouble" element = {<TORTrouble /> } />       
            </Routes>
          </HashRouter>

    
    </>
  ) 
}

export default App
